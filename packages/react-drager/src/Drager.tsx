import type { DragerProps } from './types'
import { RotateCw } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { getDragerElements, getSnapPosition } from './utils'

export const Drager: React.FC<DragerProps> = ({
  children,
  className,
  style,
  limit,
  rotation = 0,
  rotatable = false,
  scalable = false,
  minScale = 0.5,
  maxScale = 2,
  showGuides = false,
  snapThreshold = 5,
  snapToElements = true,

  onDragStart,
  onDragEnd,
  onDrag,
  onRotate,
  onScale,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const rotateHandleRef = useRef<HTMLDivElement>(null)
  const startPos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({
    x: style?.left ? Number.parseInt(style.left as string) : 0,
    y: style?.top ? Number.parseInt(style.top as string) : 0,
  })
  const currentRotation = useRef(rotation)
  const isDragging = useRef(false)
  const isRotating = useRef(false)
  const currentScale = useRef(1)
  const lastSnapPos = useRef<{ x: number, y: number } | null>(null)
  const snapTimeout = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    const content = contentRef.current
    const rotateHandle = rotateHandleRef.current
    if (!canvas || !content)
      return

    const ctx = canvas.getContext('2d')
    if (!ctx)
      return

    const updateCanvasSize = () => {
      if (!canvas)
        return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    const limitPosition = (pos: { x: number, y: number }) => {
      if (!limit)
        return pos
      return {
        x: Math.min(Math.max(pos.x, limit.minX ?? -Infinity), limit.maxX ?? Infinity),
        y: Math.min(Math.max(pos.y, limit.minY ?? -Infinity), limit.maxY ?? Infinity),
      }
    }

    const updateTransform = () => {
      content.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) rotate(${currentRotation.current}deg) scale(${currentScale.current})`
    }

    const drawGuides = () => {
      if (!canvas || !ctx || !content || !isDragging.current || !showGuides)
        return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#ccc'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])

      const rect = content.getBoundingClientRect()

      // 绘制四条边的辅助线
      // 左边
      ctx.beginPath()
      ctx.moveTo(rect.left, 0)
      ctx.lineTo(rect.left, canvas.height)
      ctx.stroke()

      // 右边
      ctx.beginPath()
      ctx.moveTo(rect.right, 0)
      ctx.lineTo(rect.right, canvas.height)
      ctx.stroke()

      // 顶边
      ctx.beginPath()
      ctx.moveTo(0, rect.top)
      ctx.lineTo(canvas.width, rect.top)
      ctx.stroke()

      // 底边
      ctx.beginPath()
      ctx.moveTo(0, rect.bottom)
      ctx.lineTo(canvas.width, rect.bottom)
      ctx.stroke()
    }

    const draw = () => {
      if (isDragging.current || isRotating.current) {
        updateTransform()
        if (isDragging.current && showGuides) {
          drawGuides()
        }
      }
      requestAnimationFrame(draw)
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (rotateHandle && rotateHandle.contains(e.target as Node))
        return
      e.preventDefault()
      isDragging.current = true
      onDragStart?.()
      startPos.current = {
        x: e.clientX - currentPos.current.x,
        y: e.clientY - currentPos.current.y,
      }
    }

    const handleRotateStart = (e: MouseEvent) => {
      if (!rotatable)
        return
      e.preventDefault()
      e.stopPropagation()
      isRotating.current = true
      const rect = content.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const startAngle = Math.atan2(
        e.clientY - centerY,
        e.clientX - centerX,
      ) * 180 / Math.PI
      startPos.current = {
        x: startAngle,
        y: currentRotation.current,
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const newPos = {
          x: e.clientX - startPos.current.x,
          y: e.clientY - startPos.current.y,
        }

        if (snapToElements && content) {
          const otherElements = getDragerElements().filter(el => el !== content) as HTMLDivElement[]
          const rect = content.getBoundingClientRect()

          if (lastSnapPos.current) {
            const snapDistance = Math.hypot(
              newPos.x - lastSnapPos.current.x,
              newPos.y - lastSnapPos.current.y,
            )
            if (snapDistance < snapThreshold * 1.5) {
              currentPos.current = lastSnapPos.current
              return
            }
            lastSnapPos.current = null
          }

          if (snapTimeout.current)
            window.clearTimeout(snapTimeout.current)

          const snappedPos = getSnapPosition(newPos, rect, otherElements, snapThreshold)

          if (snappedPos.x !== newPos.x || snappedPos.y !== newPos.y) {
            lastSnapPos.current = snappedPos
            snapTimeout.current = window.setTimeout(() => {
              lastSnapPos.current = null
            }, 100)
          }

          currentPos.current = limitPosition(snappedPos)
        }
        else {
          currentPos.current = limitPosition(newPos)
        }

        onDrag?.(currentPos.current)
        updateTransform()
      }

      if (isRotating.current) {
        const rect = content.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const currentAngle = Math.atan2(
          e.clientY - centerY,
          e.clientX - centerX,
        ) * 180 / Math.PI

        const angleDiff = currentAngle - startPos.current.x
        currentRotation.current = startPos.current.y + angleDiff
        onRotate?.(currentRotation.current)
      }
    }

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false
        onDragEnd?.()
        // 清除辅助线
        if (canvas && ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
      if (isRotating.current) {
        isRotating.current = false
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (!scalable)
        return
      e.preventDefault()
      const delta = e.deltaY * -0.01
      const newScale = Math.min(
        Math.max(currentScale.current + delta, minScale),
        maxScale,
      )
      currentScale.current = newScale
      updateTransform()
      onScale?.(newScale)
    }

    content.addEventListener('mousedown', handleMouseDown)
    if (rotatable && rotateHandle) {
      rotateHandle.addEventListener('mousedown', handleRotateStart)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    if (scalable) {
      content.addEventListener('wheel', handleWheel, { passive: false })
    }
    requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      content.removeEventListener('mousedown', handleMouseDown)
      if (rotatable && rotateHandle) {
        rotateHandle.removeEventListener('mousedown', handleRotateStart)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      if (scalable) {
        content.removeEventListener('wheel', handleWheel)
      }
    }
  }, [limit, onDrag, onDragEnd, onDragStart, onRotate, onScale, rotatable, rotation, scalable, minScale, maxScale, showGuides, snapThreshold, snapToElements])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 1000,
        }}
      />
      <div
        ref={contentRef}
        data-drager
        className={className}
        style={{
          position: 'absolute',
          userSelect: 'none',
          cursor: 'move',
          transform: `translate(${currentPos.current.x}px, ${currentPos.current.y}px) rotate(${currentRotation.current}deg) scale(${currentScale.current})`,
        }}
      >
        {children}
        {rotatable && (
          <div
            ref={rotateHandleRef}
            style={{
              position: 'absolute',
              left: '50%',
              top: '-32px',
              transform: `translateX(-50%) rotate(${-currentRotation.current}deg)`,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="hover:scale-110"
          >
            <RotateCw className="w-4 h-4 text-blue-500" />
          </div>
        )}
      </div>
    </>
  )
}
