import type { AnchorPosition, DragerProps } from './types'
import { RotateCw } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { Anchor } from './components/Anchor'
import { ConnectionManager } from './ConnectionManager'
import { drawTempConnection, getAnchorPosition, getDragerElements, getSnapPosition } from './utils'

export const Drager: React.FC<DragerProps> = ({
  id,
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
  connectable = false,
  onConnect,
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
  const connectingAnchor = useRef<AnchorPosition | null>(null)
  const currentMousePos = useRef({ x: 0, y: 0 })
  const startRotation = useRef({ angle: 0, rotation: 0 })

  const handleAnchorDrag = (e: MouseEvent) => {
    if (!canvasRef.current)
      return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx || !contentRef.current)
      return

    const dpr = window.devicePixelRatio || 1
    // 设置 canvas 尺寸
    canvasRef.current.style.width = `${window.innerWidth}px`
    canvasRef.current.style.height = `${window.innerHeight}px`
    canvasRef.current.width = window.innerWidth * dpr
    canvasRef.current.height = window.innerHeight * dpr

    // 应用 DPR 缩放
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    const elements = document.elementsFromPoint(e.clientX, e.clientY)
    const targetAnchor = elements.find(el => el.hasAttribute('data-position'))
    const targetDrager = elements.find(el => el.hasAttribute('data-drager-id'))

    const sourceRect = contentRef.current.getBoundingClientRect()
    const sourcePos = getAnchorPosition(sourceRect, connectingAnchor.current!)

    let endPos = { x: e.clientX, y: e.clientY }
    let isSnapped = false

    // 检查是否靠近目标锚点
    if (targetAnchor && targetDrager) {
      const targetId = targetDrager.getAttribute('data-drager-id')
      if (targetId !== id) {
        const targetRect = targetDrager.getBoundingClientRect()
        const targetPosition = targetAnchor.getAttribute('data-position') as AnchorPosition
        const anchorPos = getAnchorPosition(targetRect, targetPosition)

        // 计算鼠标与锚点的距离
        const distance = Math.hypot(e.clientX - anchorPos.x, e.clientY - anchorPos.y)

        // 如果距离小于20px，就吸附到锚点
        if (distance < 20) {
          endPos = anchorPos
          isSnapped = true
          targetAnchor.classList.add('anchor-hover') // 可选：添加视觉反馈
        }
        else {
          targetAnchor.classList.remove('anchor-hover')
        }
      }
    }

    // 如果没有吸附，移除所有锚点的hover效果
    if (!isSnapped) {
      document.querySelectorAll('.anchor').forEach((anchor) => {
        anchor.classList.remove('anchor-hover')
      })
    }

    drawTempConnection(ctx, sourcePos, endPos)
  }

  const handleAnchorDragEnd = (e: MouseEvent) => {
    if (!connectingAnchor.current || !id)
      return

    const elements = document.elementsFromPoint(e.clientX, e.clientY)
    const targetAnchor = elements.find(el => el.hasAttribute('data-position'))
    const targetDrager = elements.find(el => el.hasAttribute('data-drager-id'))

    if (targetAnchor && targetDrager) {
      const targetId = targetDrager.getAttribute('data-drager-id')
      const targetPosition = targetAnchor.getAttribute('data-position') as AnchorPosition

      if (targetId && targetId !== id) {
        const targetRect = targetDrager.getBoundingClientRect()
        const anchorPos = getAnchorPosition(targetRect, targetPosition)
        const distance = Math.hypot(e.clientX - anchorPos.x, e.clientY - anchorPos.y)

        // 如果在吸附范围内，创建连接
        if (distance < 20) {
          const connectionManager = ConnectionManager.getInstance()
          connectionManager.addConnection({
            sourceId: id,
            sourceAnchor: connectingAnchor.current,
            targetId,
            targetAnchor: targetPosition,
          })
          onConnect?.(id, connectingAnchor.current, targetId, targetPosition)
        }
      }
    }

    // 清理状态
    connectingAnchor.current = null
    document.querySelectorAll('.anchor').forEach((anchor) => {
      anchor.classList.remove('anchor-hover')
    })
    document.removeEventListener('mousemove', handleAnchorDrag)
    document.removeEventListener('mouseup', handleAnchorDragEnd)
  }

  const handleAnchorDragStart = (position: AnchorPosition) => {
    connectingAnchor.current = position
    document.addEventListener('mousemove', handleAnchorDrag)
    document.addEventListener('mouseup', handleAnchorDragEnd)
  }

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

    const connectionManager = ConnectionManager.getInstance()

    const draw = () => {
      if (!ctx)
        return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isDragging.current && showGuides) {
        drawGuides()
      }

      // 绘制所有连接
      connectionManager.drawConnections()

      if (connectingAnchor.current) {
        // 绘制正在创建的连接
        const sourceRect = content.getBoundingClientRect()
        const sourcePos = getAnchorPosition(sourceRect, connectingAnchor.current)
        drawTempConnection(ctx, sourcePos, { x: currentMousePos.current.x, y: currentMousePos.current.y })
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

      // 存储初始角度和当前旋转值
      startRotation.current = {
        angle: Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI,
        rotation: currentRotation.current,
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      currentMousePos.current = { x: e.clientX, y: e.clientY }

      if (isRotating.current && content) {
        const rect = content.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const currentAngle = Math.atan2(
          e.clientY - centerY,
          e.clientX - centerX,
        ) * 180 / Math.PI

        // 计算角度差并更新旋转值
        const angleDiff = currentAngle - startRotation.current.angle
        currentRotation.current = startRotation.current.rotation + angleDiff

        requestAnimationFrame(() => {
          updateTransform()
          onRotate?.(currentRotation.current)
        })
        return
      }

      if (isDragging.current) {
        const newPos = {
          x: e.clientX - startPos.current.x,
          y: e.clientY - startPos.current.y,
        }

        if (snapToElements && content) {
          const otherElements = getDragerElements().filter(el => el !== content) as HTMLDivElement[]

          const currentRect = content.getBoundingClientRect()

          const offsetX = newPos.x - currentPos.current.x
          const offsetY = newPos.y - currentPos.current.y

          const simulatedRect = new DOMRect(
            currentRect.x + offsetX,
            currentRect.y + offsetY,
            currentRect.width,
            currentRect.height,
          )

          const snappedPos = getSnapPosition(newPos, simulatedRect, otherElements, snapThreshold)

          currentPos.current = limitPosition(snappedPos)
        }
        else {
          currentPos.current = limitPosition(newPos)
        }

        if (!content.style.willChange) {
          content.style.willChange = 'transform'
        }

        requestAnimationFrame(() => {
          updateTransform()
          onDrag?.(currentPos.current)
        })
      }

      if (isRotating.current) {
        const rect = content.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const currentAngle = Math.atan2(
          e.clientY - centerY,
          e.clientX - centerX,
        ) * 180 / Math.PI

        const angleDiff = currentAngle - startRotation.current.angle
        currentRotation.current = startRotation.current.rotation + angleDiff
        onRotate?.(currentRotation.current)
      }
    }

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false
        onDragEnd?.()
        if (content) {
          content.style.willChange = ''
        }
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

    const handleAnchorDragEnd = (e: MouseEvent) => {
      if (!connectingAnchor.current || !id)
        return

      const elements = document.elementsFromPoint(e.clientX, e.clientY)
      const targetAnchor = elements.find(el => el.hasAttribute('data-position'))
      const targetDrager = elements.find(el => el.hasAttribute('data-drager-id'))

      if (targetAnchor && targetDrager) {
        const targetId = targetDrager.getAttribute('data-drager-id')
        const targetPosition = targetAnchor.getAttribute('data-position') as AnchorPosition

        if (targetId && targetId !== id) {
          const targetRect = targetDrager.getBoundingClientRect()
          const anchorPos = getAnchorPosition(targetRect, targetPosition)
          const distance = Math.hypot(e.clientX - anchorPos.x, e.clientY - anchorPos.y)

          // 如果在吸附范围内，创建连接
          if (distance < 20) {
            const connectionManager = ConnectionManager.getInstance()
            connectionManager.addConnection({
              sourceId: id,
              sourceAnchor: connectingAnchor.current,
              targetId,
              targetAnchor: targetPosition,
            })
            onConnect?.(id, connectingAnchor.current, targetId, targetPosition)
          }
        }
      }

      // 清理状态
      connectingAnchor.current = null
      document.querySelectorAll('.anchor').forEach((anchor) => {
        anchor.classList.remove('anchor-hover')
      })
      document.removeEventListener('mousemove', handleAnchorDrag)
      document.removeEventListener('mouseup', handleAnchorDragEnd)
    }

    // 添加连接点事件监听
    const anchors = content.querySelectorAll('.anchor')
    anchors.forEach((anchor) => {
      anchor.addEventListener('mousedown', (e) => {
        e.stopPropagation()
        const position = anchor.getAttribute('data-position') as AnchorPosition
        handleAnchorDragStart(position)
      })
    })

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
      document.removeEventListener('mousemove', handleAnchorDrag)
      document.removeEventListener('mouseup', handleAnchorDragEnd)
    }
  }, [limit, onDrag, onDragEnd, onDragStart, onRotate, onScale, rotatable, rotation, scalable, minScale, maxScale, showGuides, snapThreshold, snapToElements, id, onConnect])

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
        data-drager-id={id}
        className={className}
        style={{
          position: 'absolute',
          userSelect: 'none',
          cursor: 'move',
          transform: `translate(${currentPos.current.x}px, ${currentPos.current.y}px) rotate(${currentRotation.current}deg) scale(${currentScale.current})`,
        }}
      >
        {connectable && (
          <>
            <Anchor position="top" onDragStart={handleAnchorDragStart} />
            <Anchor position="right" onDragStart={handleAnchorDragStart} />
            <Anchor position="bottom" onDragStart={handleAnchorDragStart} />
            <Anchor position="left" onDragStart={handleAnchorDragStart} />
          </>
        )}
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
