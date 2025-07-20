import type { AnchorPosition, Connection, DragerProps, ResizePosition } from './types'
import React, { useEffect, useRef, useState } from 'react'
import { Anchor } from './components/anchor'
import { ResizeHandle } from './components/resize-handle'
import RotateIcon from './icons/rotate.svg'
import { ConnectionManager, getAnchorPosition, getDragerElements, getSnapPosition, GuidelineManager } from './utils'

export const Drager: React.FC<DragerProps> = ({
  id,
  children,
  className,
  style,
  selected = false,
  disabled = false,
  draggable = true,
  width,
  height,
  top = 0,
  left = 0,
  minWidth = 20,
  minHeight = 20,
  maxWidth,
  maxHeight,
  limit,
  rotation = 0,
  rotatable = false,
  scalable = false,
  resizable = false,
  minScale = 0.5,
  maxScale = 2,
  showGuides = false,
  snapThreshold = 5,
  snapToElements = false,
  connectable = false,
  onBlur,
  onClick,
  onDragStart,
  onDragEnd,
  onDrag,
  onRotate,
  onScale,
  onConnect,
}) => {
  /** id is required when connectable is true */
  if (connectable && !id) {
    throw new Error('id prop is required when connectable is true')
  }

  const contentRef = useRef<HTMLDivElement>(null)
  const rotateHandleRef = useRef<HTMLDivElement>(null)
  const startPos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({
    x: left ?? (style?.left ? Number.parseInt(style.left as string) : 0),
    y: top ?? (style?.top ? Number.parseInt(style.top as string) : 0),
  })
  const currentRotation = useRef(rotation)
  const isDragging = useRef(false)
  const isRotating = useRef(false)
  const isResizing = useRef(false)
  const currentScale = useRef(1)
  const connectingAnchor = useRef<AnchorPosition | null>(null)
  const currentMousePos = useRef({ x: 0, y: 0 })
  const startRotation = useRef({ angle: 0, rotation: 0 })
  const [mousePos, setMousePos] = useState<{ x: number, y: number } | null>(null)
  const animationFrameId = useRef<number | null>(null)
  const resizeDirection = useRef<ResizePosition | null>(null)
  const startDimensions = useRef({ width: 0, height: 0, left: 0, top: 0 })

  /**
   * update the transform of the element
   */
  const updateTransform = () => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) rotate(${currentRotation.current}deg) scale(${currentScale.current})`
    }
  }

  useEffect(() => {
    // initialize the position and size
    if (contentRef.current) {
      if (width)
        contentRef.current.style.width = `${width}px`
      if (height)
        contentRef.current.style.height = `${height}px`
      currentPos.current = { x: left, y: top }
      updateTransform()
    }
  }, [width, height, left, top])

  /**
   * handle the anchor drag event
   * @param e - the mouse event
   */
  const handleAnchorDrag = (e: MouseEvent) => {
    const elements = document.elementsFromPoint(e.clientX, e.clientY)
    const targetAnchor = elements.find(el => el.hasAttribute('data-position'))
    const targetDrager = elements.find(el => el.hasAttribute('data-drager-id'))

    // add temp connection line
    if (contentRef.current && connectingAnchor.current) {
      const rect = contentRef.current.getBoundingClientRect()
      const startPos = getAnchorPosition(rect, connectingAnchor.current)
      const endPos = { x: e.clientX, y: e.clientY }
      ConnectionManager.getInstance()?.drawTempConnection(startPos, endPos)
    }

    document.querySelectorAll('.anchor').forEach((anchor) => {
      anchor.classList.remove('anchor-hover')
    })

    if (targetAnchor && targetDrager) {
      const targetId = targetDrager.getAttribute('data-drager-id')
      if (targetId !== id) {
        const distance = Math.hypot(
          e.clientX - targetAnchor.getBoundingClientRect().left,
          e.clientY - targetAnchor.getBoundingClientRect().top,
        )
        if (distance < 20) {
          targetAnchor.classList.add('anchor-hover')
        }
      }
    }
  }

  /**
   * handle the anchor drag end event
   * @param e - the mouse event
   */
  const handleAnchorDragEnd = (e: MouseEvent) => {
    if (!connectingAnchor.current || !id)
      return

    const elements = document.elementsFromPoint(e.clientX, e.clientY)
    const targetAnchor = elements.find(el => el.hasAttribute('data-position'))
    const targetDrager = elements.find(el => el.hasAttribute('data-drager-id'))

    let connectionCreated = false

    if (targetAnchor && targetDrager) {
      const targetId = targetDrager.getAttribute('data-drager-id')
      const targetPosition = targetAnchor.getAttribute('data-position') as AnchorPosition

      if (targetId && targetId !== id) {
        const targetRect = targetDrager.getBoundingClientRect()
        const anchorPos = getAnchorPosition(targetRect, targetPosition)
        const distance = Math.hypot(e.clientX - anchorPos.x, e.clientY - anchorPos.y)

        if (distance < 20) {
          const connectionManager = ConnectionManager.getInstance()
          connectionManager?.addConnection({
            sourceId: id,
            sourceAnchor: connectingAnchor.current,
            targetId,
            targetAnchor: targetPosition,
          })
          onConnect?.({
            sourceId: id,
            sourceAnchor: connectingAnchor.current,
            targetId,
            targetAnchor: targetPosition,
          } as Connection)
          connectionCreated = true
        }
      }
    }

    // If no connection is created, remove the temporary connection cable
    if (!connectionCreated) {
      ConnectionManager.getInstance()?.removeTempConnection()
    }

    // clean up state
    connectingAnchor.current = null
    document.querySelectorAll('.anchor').forEach((anchor) => {
      anchor.classList.remove('anchor-hover')
    })
    document.removeEventListener('mousemove', handleAnchorDrag)
    document.removeEventListener('mouseup', handleAnchorDragEnd)
  }

  /**
   * handle the anchor drag start event
   * @param position - the anchor position
   */
  const handleAnchorDragStart = (position: AnchorPosition) => {
    connectingAnchor.current = position
    document.addEventListener('mousemove', handleAnchorDrag)
    document.addEventListener('mouseup', handleAnchorDragEnd)
  }

  /**
   * handle the anchor mouse down event
   * @param position - the anchor position
   * @returns the mouse event
   */
  const handleAnchorMouseDown = (position: AnchorPosition) => (e: MouseEvent) => {
    e.stopPropagation()
    if (!contentRef.current)
      return

    connectingAnchor.current = position
    const rect = contentRef.current.getBoundingClientRect()
    const startPos = getAnchorPosition(rect, position)
    setMousePos(startPos)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseUp = (e: MouseEvent) => {
      handleAnchorDragEnd(e)
      setMousePos(null)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  /**
   * handle the resize start event
   * @param position - the resize position
   * @returns the mouse event
   */
  const handleResizeStart = (position: ResizePosition) => (e: React.MouseEvent) => {
    if (disabled)
      return
    e.stopPropagation()
    if (!contentRef.current)
      return

    isResizing.current = true
    resizeDirection.current = position

    const rect = contentRef.current.getBoundingClientRect()
    startPos.current = { x: e.clientX, y: e.clientY }
    startDimensions.current = {
      width: rect.width,
      height: rect.height,
      left: currentPos.current.x,
      top: currentPos.current.y,
    }
  }

  useEffect(() => {
    const content = contentRef.current
    const rotateHandle = rotateHandleRef.current
    let frameId: number | null = null
    const anchorListeners = new Map()

    if (!content)
      return

    /**
     * limit the position of the element
     * @param pos - the position to limit
     * @returns the limited position
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
     * draw the guides
     */
    const drawGuides = () => {
      // if the element is not dragging or the guides are not shown, return
      if (!content || !isDragging.current || !showGuides)
        return

      const rect = content.getBoundingClientRect()
      const guidelineManager = GuidelineManager.getInstance()

      guidelineManager.clear()
      guidelineManager.drawGuidelines({
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      })
    }

    const draw = () => {
      if (isDragging.current && showGuides) {
        drawGuides()
      }

      if (mousePos && connectingAnchor.current && content) {
        const rect = content.getBoundingClientRect()
        const startPos = getAnchorPosition(rect, connectingAnchor.current)
        const connectionManager = ConnectionManager.getInstance()
        if (connectionManager) {
          connectionManager.drawTempConnection(startPos, mousePos)
        }
      }

      frameId = requestAnimationFrame(draw)
    }

    if (mousePos && connectingAnchor.current) {
      frameId = requestAnimationFrame(draw)
    }

    /**
     * handle the mouse down event(start dragging)
     * @param e - the mouse event
     */
    const handleMouseDown = (e: MouseEvent) => {
      if (disabled || !draggable)
        return
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
     * handle the mouse move event(dragging)
     * @param e - the mouse event
     */
    const handleMouseMove = (e: MouseEvent) => {
      currentMousePos.current = { x: e.clientX, y: e.clientY }

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

        if (showGuides) {
          const rect = content.getBoundingClientRect()
          const guidelineManager = GuidelineManager.getInstance()
          guidelineManager.clear()
          guidelineManager.drawGuidelines({
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height,
          })
        }

        updateTransform()
        onDrag?.(currentPos.current)
        const connectionManager = ConnectionManager.getInstance()
        connectionManager?.updateConnections()
      }

      if (isRotating.current && content) {
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
        requestAnimationFrame(() => {
          updateTransform()
          onRotate?.(currentRotation.current)
          const connectionManager = ConnectionManager.getInstance()
          connectionManager?.updateConnections()
        })
      }

      if (isResizing.current && contentRef.current && resizeDirection.current) {
        const offsetX = e.clientX - startPos.current.x
        const offsetY = e.clientY - startPos.current.y
        const newDimensions = { ...startDimensions.current }

        switch (resizeDirection.current) {
          case 'right':
            newDimensions.width += offsetX
            break
          case 'left':
            newDimensions.width -= offsetX
            newDimensions.left += offsetX
            break
          case 'bottom':
            newDimensions.height += offsetY
            break
          case 'top':
            newDimensions.height -= offsetY
            newDimensions.top += offsetY
            break
          case 'top-right':
            newDimensions.width += offsetX
            newDimensions.height -= offsetY
            newDimensions.top += offsetY
            break
          case 'top-left':
            newDimensions.width -= offsetX
            newDimensions.height -= offsetY
            newDimensions.left += offsetX
            newDimensions.top += offsetY
            break
          case 'bottom-right':
            newDimensions.width += offsetX
            newDimensions.height += offsetY
            break
          case 'bottom-left':
            newDimensions.width -= offsetX
            newDimensions.height += offsetY
            newDimensions.left += offsetX
            break
        }

        // Apply minimum dimensions
        newDimensions.width = Math.max(newDimensions.width, 20)
        newDimensions.height = Math.max(newDimensions.height, 20)

        // Apply size constraints
        newDimensions.width = Math.min(
          Math.max(newDimensions.width, minWidth),
          maxWidth ?? Infinity,
        )
        newDimensions.height = Math.min(
          Math.max(newDimensions.height, minHeight),
          maxHeight ?? Infinity,
        )

        contentRef.current.style.width = `${newDimensions.width}px`
        contentRef.current.style.height = `${newDimensions.height}px`
        currentPos.current = {
          x: newDimensions.left,
          y: newDimensions.top,
        }
        updateTransform()
      }
    }

    /**
     * handle the mouse up event(stop dragging)
     */
    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false
        onDragEnd?.(currentPos.current)
        if (content) {
          content.style.willChange = ''
        }
        if (showGuides) {
          const guidelineManager = GuidelineManager.getInstance()
          guidelineManager.clear()
        }
      }
      if (isRotating.current) {
        isRotating.current = false
      }
      if (isResizing.current) {
        isResizing.current = false
        resizeDirection.current = null
      }
    }

    /**
     * handle the rotate start event
     * @param e - the mouse event
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

      // store initial angle and current rotation
      startRotation.current = {
        angle: Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI,
        rotation: currentRotation.current,
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
      const connectionManager = ConnectionManager.getInstance()
      connectionManager?.updateConnections()
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

    // add connection point event listener
    const anchors = content.querySelectorAll('.anchor')
    anchors.forEach((anchor) => {
      const position = anchor.getAttribute('data-position') as AnchorPosition
      const listener = (e: Event) => handleAnchorMouseDown(position)(e as MouseEvent)
      anchorListeners.set(anchor, listener)
      anchor.addEventListener('mousedown', listener)
    })

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
        frameId = null
      }
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
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      anchorListeners.forEach((listener, anchor) => {
        anchor.removeEventListener('mousedown', listener)
      })
    }
  }, [onDrag, onDragEnd, onDragStart, onRotate, onScale, onConnect, limit, rotatable, rotation, scalable, minScale, maxScale, showGuides, snapThreshold, snapToElements, id, mousePos, disabled, width, height, left, top, minWidth, minHeight, maxWidth, maxHeight])

  const handleClick = (_: React.MouseEvent) => {
    if (disabled)
      return
    onClick?.()
  }

  return (
    <div
      ref={contentRef}
      data-drager
      data-drager-id={id}
      className={`${className ?? ''} ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      style={{
        position: 'absolute',
        userSelect: 'none',
        cursor: disabled ? 'not-allowed' : (draggable ? 'move' : 'default'),
        transform: `translate(${currentPos.current.x}px, ${currentPos.current.y}px) rotate(${currentRotation.current}deg) scale(${currentScale.current})`,
        opacity: disabled ? 0.6 : 1,
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        ...style,
      }}
      onClick={handleClick}
      onBlur={onBlur}
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
        >
          <img src={RotateIcon} style={{ width: '16px', height: '16px' }} />
        </div>
      )}
      {resizable && (
        <>
          <ResizeHandle position="top" onMouseDown={e => handleResizeStart('top')(e)} />
          <ResizeHandle position="bottom" onMouseDown={e => handleResizeStart('bottom')(e)} />
          <ResizeHandle position="left" onMouseDown={e => handleResizeStart('left')(e)} />
          <ResizeHandle position="right" onMouseDown={e => handleResizeStart('right')(e)} />
          <ResizeHandle position="top-right" onMouseDown={e => handleResizeStart('top-right')(e)} />
          <ResizeHandle position="top-left" onMouseDown={e => handleResizeStart('top-left')(e)} />
          <ResizeHandle position="bottom-right" onMouseDown={e => handleResizeStart('bottom-right')(e)} />
          <ResizeHandle position="bottom-left" onMouseDown={e => handleResizeStart('bottom-left')(e)} />
        </>
      )}
    </div>
  )
}
