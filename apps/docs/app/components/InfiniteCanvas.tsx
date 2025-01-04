'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface InfiniteCanvasProps {
  children: React.ReactNode
}

export function InfiniteCanvas({ children }: InfiniteCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  // Handle canvas dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 1)
      return // Only middle mouse button
    setIsDragging(true)
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }, [position])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging)
      return
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    })
  }, [isDragging, startPos])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Handle zooming
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!e.ctrlKey)
      return
    e.preventDefault()

    const delta = e.deltaY * -0.01
    const newScale = Math.min(Math.max(scale + delta, 0.1), 5)
    setScale(newScale)
  }, [scale])

  useEffect(() => {
    const container = containerRef.current
    if (!container)
      return

    container.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      container.removeEventListener('wheel', handleWheel)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleWheel, handleMouseMove, handleMouseUp])

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gray-50 overflow-hidden cursor-grab"
      onMouseDown={handleMouseDown}
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #ddd 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }}
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: '0 0',
        }}
      >
        {children}
      </div>
    </div>
  )
}
