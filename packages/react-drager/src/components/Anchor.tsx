import type { AnchorPosition, AnchorProps } from '../types'
import React, { useRef, useState } from 'react'
import './Anchor.css'

export const Anchor: React.FC<AnchorProps> = ({ position, onDragStart, threshold = 10 }) => {
  const [isFlashing, setIsFlashing] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    if (!anchorRef.current)
      return

    // 获取连接点位置
    const anchorRect = anchorRef.current.getBoundingClientRect()
    const anchorX = anchorRect.left + anchorRect.width / 2
    const anchorY = anchorRect.top + anchorRect.height / 2

    // 计算鼠标到连接点的距离
    const distance = Math.sqrt(
      (e.clientX - anchorX) ** 2 + (e.clientY - anchorY) ** 2,
    )

    // 如果距离小于某个阈值，触发闪烁效果
    if (distance < threshold) {
      setIsFlashing(true)
    }
    else {
      setIsFlashing(false)
    }
  }

  document.addEventListener('mousemove', handleMouseMove)

  return (
    <div
      ref={anchorRef}
      className={`anchor ${isFlashing ? 'flashing' : ''}`}
      data-position={position}
      style={{
        position: 'absolute',
        width: '8px',
        height: '8px',
        backgroundColor: '#3b82f6',
        borderRadius: '50%',
        cursor: 'crosshair',
        ...getAnchorStyle(position),
      }}
      onMouseDown={() => onDragStart(position)}
    />
  )
}

function getAnchorStyle(position: AnchorPosition) {
  const styles = {
    top: { top: '-4px', left: '50%', transform: 'translateX(-50%)' },
    right: { right: '-4px', top: '50%', transform: 'translateY(-50%)' },
    bottom: { bottom: '-4px', left: '50%', transform: 'translateX(-50%)' },
    left: { left: '-4px', top: '50%', transform: 'translateY(-50%)' },
  }
  return styles[position]
}
