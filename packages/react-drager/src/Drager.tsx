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
  top = 0,
  left = 0,
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
  onResize,
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
  const isGesture = useRef(false)
  const startDist = useRef(0)
  const startAngle = useRef(0)
  const startScale = useRef(1)
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
      currentPos.current = { x: left, y: top }
      updateTransform()
    }
  }, [left, top])

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

    const getCoords = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
      if ('clientX' in e) {
        return { x: e.clientX, y: e.clientY }
      }
      return { x: 0, y: 0 }
    }

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

    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      if (disabled || !draggable)
        return
      if (rotateHandle && rotateHandle.contains(e.target as Node))
        return

      if ('touches' in e && e.touches.length === 2) {
        isDragging.current = false
        isGesture.current = true
        const [touch1, touch2] = e.touches
        startDist.current = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY)
        startAngle.current = Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX) * 180 / Math.PI
        startScale.current = currentScale.current
        startRotation.current.rotation = currentRotation.current
        return
      }

      if (e.type === 'touchstart') {
        // e.preventDefault()
      }
      else {
        (e as MouseEvent).preventDefault()
      }

      isDragging.current = true
      onDragStart?.()
      const coords = getCoords(e)
      startPos.current = {
        x: coords.x - currentPos.current.x,
        y: coords.y - currentPos.current.y,
      }
    }

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e) {
        e.preventDefault()
      }

      if ('touches' in e && e.touches.length === 2 && isGesture.current) {
        const [touch1, touch2] = e.touches
        // --- Scale ---
        const newDist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY)
        const scale = newDist / startDist.current
        const newScale = Math.min(Math.max(startScale.current * scale, minScale), maxScale)
        currentScale.current = newScale
        onScale?.(newScale)

        // --- Rotate ---
        const newAngle = Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX) * 180 / Math.PI
        const angleDiff = newAngle - startAngle.current
        currentRotation.current = startRotation.current.rotation + angleDiff
        onRotate?.(currentRotation.current)

        updateTransform()
        ConnectionManager.getInstance()?.updateConnections()
        return
      }

      const coords = getCoords(e)
      currentMousePos.current = { x: coords.x, y: coords.y }

      if (isDragging.current) {
        const newPos = {
          x: coords.x - startPos.current.x,
          y: coords.y - startPos.current.y,
        }

        if (snapToElements && content) {
          const otherElements = getDragerElements().filter(el => el !== content) as HTMLDivElement[]
          const currentRect = content.getBoundingClientRect()
          const offsetX = newPos.x - currentPos.current.x
          const offsetY = newPos.y - currentPos.current.y
          const simulatedRect = new DOMRect(currentRect.x + offsetX, currentRect.y + offsetY, currentRect.width, currentRect.height)
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
        ConnectionManager.getInstance()?.updateConnections()
      }

      if (isRotating.current && content) {
        const rect = content.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const currentAngle = Math.atan2(coords.y - centerY, coords.x - centerX) * 180 / Math.PI
        const angleDiff = currentAngle - startRotation.current.angle
        currentRotation.current = startRotation.current.rotation + angleDiff
        onRotate?.(currentRotation.current)
        requestAnimationFrame(() => {
          updateTransform()
          onRotate?.(currentRotation.current)
          ConnectionManager.getInstance()?.updateConnections()
        })
      }

      if (isResizing.current && contentRef.current && resizeDirection.current) {
        const offsetX = coords.x - startPos.current.x
        const offsetY = coords.y - startPos.current.y
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

        newDimensions.width = Math.max(newDimensions.width, 20)
        newDimensions.height = Math.max(newDimensions.height, 20)

        const computedStyle = window.getComputedStyle(contentRef.current)
        const minWidth = Number.parseInt(computedStyle.minWidth) || 20
        const minHeight = Number.parseInt(computedStyle.minHeight) || 20
        const maxWidth = Number.parseInt(computedStyle.maxWidth) || Infinity
        const maxHeight = Number.parseInt(computedStyle.maxHeight) || Infinity

        newDimensions.width = Math.min(Math.max(newDimensions.width, minWidth), maxWidth)
        newDimensions.height = Math.min(Math.max(newDimensions.height, minHeight), maxHeight)

        contentRef.current.style.width = `${newDimensions.width}px`
        contentRef.current.style.height = `${newDimensions.height}px`
        currentPos.current = { x: newDimensions.left, y: newDimensions.top }
        updateTransform()
        onResize?.({ width: newDimensions.width, height: newDimensions.height })
      }
    }

    const handleDragEnd = (e: MouseEvent | TouchEvent) => {
      if (isGesture.current && 'touches' in e && e.touches.length < 2) {
        isGesture.current = false
      }

      if (isDragging.current) {
        isDragging.current = false
        onDragEnd?.(currentPos.current)
        if (content) {
          content.style.willChange = ''
        }
        if (showGuides) {
          GuidelineManager.getInstance().clear()
        }
      }
      if (isRotating.current)
        isRotating.current = false
      if (isResizing.current) {
        isResizing.current = false
        resizeDirection.current = null
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
      const newScale = Math.min(Math.max(currentScale.current + delta, minScale), maxScale)
      currentScale.current = newScale
      updateTransform()
      onScale?.(newScale)
      ConnectionManager.getInstance()?.updateConnections()
    }

    content.addEventListener('mousedown', handleDragStart)
    content.addEventListener('touchstart', handleDragStart, { passive: true })
    if (rotatable && rotateHandle) {
      rotateHandle.addEventListener('mousedown', handleRotateStart)
    }
    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('touchmove', handleDragMove, { passive: false })
    document.addEventListener('mouseup', handleDragEnd)
    document.addEventListener('touchend', handleDragEnd)
    if (scalable) {
      content.addEventListener('wheel', handleWheel, { passive: false })
    }

    const anchors = content.querySelectorAll('.anchor')
    anchors.forEach((anchor) => {
      const position = anchor.getAttribute('data-position') as AnchorPosition
      const listener = (e: Event) => handleAnchorMouseDown(position)(e as MouseEvent)
      anchorListeners.set(anchor, listener)
      anchor.addEventListener('mousedown', listener)
    })

    return () => {
      if (frameId !== null)
        cancelAnimationFrame(frameId)
      content.removeEventListener('mousedown', handleDragStart)
      content.removeEventListener('touchstart', handleDragStart)
      if (rotatable && rotateHandle) {
        rotateHandle.removeEventListener('mousedown', handleRotateStart)
      }
      document.removeEventListener('mousemove', handleDragMove)
      document.removeEventListener('touchmove', handleDragMove)
      document.removeEventListener('mouseup', handleDragEnd)
      document.removeEventListener('touchend', handleDragEnd)
      if (scalable) {
        content.removeEventListener('wheel', handleWheel)
      }
      document.removeEventListener('mousemove', handleAnchorDrag)
      document.removeEventListener('mouseup', handleAnchorDragEnd)
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current)
      anchorListeners.forEach((listener, anchor) => {
        anchor.removeEventListener('mousedown', listener)
      })
    }
  }, [onDrag, onDragEnd, onDragStart, onRotate, onScale, onConnect, limit, rotatable, rotation, scalable, minScale, maxScale, showGuides, snapThreshold, snapToElements, id, mousePos, disabled, top, left])

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
        touchAction: 'none', // Prevent default touch actions like scrolling
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
