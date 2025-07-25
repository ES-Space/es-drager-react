import React from 'react'
import SkewIcon from '../../icons/skew.svg'

export interface SkewHandleProps {
  onMouseDown: (e: React.MouseEvent) => void
  rotation?: number
}

export const SkewHandle: React.FC<SkewHandleProps> = ({
  onMouseDown,
  rotation = 0,
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onMouseDown(e)
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement
    target.style.color = '#3b82f6'
    target.style.transform = `rotate(${-rotation}deg) scale(1.2)`
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement
    target.style.color = '#6b7280'
    target.style.transform = `rotate(${-rotation}deg) scale(1)`
  }

  return (
    <div
      data-skew-handle="skew"
      style={{
        position: 'absolute',
        top: '-40px',
        left: '-5px',
        width: '20px',
        height: '20px',
        cursor: 'move',
        pointerEvents: 'auto',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6b7280',
        transform: `rotate(${-rotation}deg)`,
        transition: 'all 0.2s ease',
      }}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={SkewIcon} alt="skew" />
    </div>
  )
}
