import type { DragerProps } from './types'
import { RotateCw } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

export const Drager: React.FC<DragerProps> = ({
  children,
  className,
  limit,
  rotation = 0,
  rotatable = false,
  scalable = false,
  minScale = 0.5,
  maxScale = 2,
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
  const currentPos = useRef({ x: 0, y: 0 })
  const currentRotation = useRef(rotation)
  const isDragging = useRef(false)
  const isRotating = useRef(false)
  const currentScale = useRef(1)

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
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    /**
     * Limit the position of the content
     * @param pos - The position to limit
     * @returns The limited position
     */
    const limitPosition = (pos: { x: number, y: number }) => {
      if (!limit)
        return pos
      return {
        x: Math.min(Math.max(pos.x, limit.minX ?? -Infinity), limit.maxX ?? Infinity),
        y: Math.min(Math.max(pos.y, limit.minY ?? -Infinity), limit.maxY ?? Infinity),
      }
    }

    /**
     * Draw the content on the canvas
     */
    const updateTransform = () => {
      content.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) rotate(${currentRotation.current}deg) scale(${currentScale.current})`
    }

    const draw = () => {
      if (isDragging.current || isRotating.current) {
        updateTransform()
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

    /**
     * Handle the start of rotation
     * @param e - The mouse event
     */
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

    /**
     * Handle the movement of the content
     * @param e - The mouse event
     */
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const newPos = {
          x: e.clientX - startPos.current.x,
          y: e.clientY - startPos.current.y,
        }
        currentPos.current = limitPosition(newPos)
        onDrag?.(currentPos.current)
        content.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) rotate(${currentRotation.current}deg) scale(${currentScale.current})`
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

        content.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) rotate(${currentRotation.current}deg) scale(${currentScale.current})`
        onRotate?.(currentRotation.current)
      }
    }

    /**
     * Handle the end of dragging or rotation
     */
    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false
        onDragEnd?.()
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
  }, [limit, onDrag, onDragEnd, onDragStart, onRotate, onScale, rotatable, rotation, scalable, minScale, maxScale])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        ref={contentRef}
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
