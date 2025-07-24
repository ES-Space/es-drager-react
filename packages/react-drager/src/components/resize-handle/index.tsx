'use client'
import type { ResizeHandleProps } from '../../types'
import React from 'react'

const styles = {
  'resizeHandle': {
    position: 'absolute' as const,
    width: '8px',
    height: '8px',
    background: 'white',
    border: '1px solid #3b82f6',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    zIndex: 10,
  },
  'right': { right: '-4px', top: '50%', transform: 'translateY(-50%)' },
  'left': { left: '-4px', top: '50%', transform: 'translateY(-50%)' },
  'top': { top: '-4px', left: '50%', transform: 'translateX(-50%)' },
  'bottom': { bottom: '-4px', left: '50%', transform: 'translateX(-50%)' },
  'top-right': { top: '-4px', right: '-4px' },
  'top-left': { top: '-4px', left: '-4px' },
  'bottom-right': { bottom: '-4px', right: '-4px' },
  'bottom-left': { bottom: '-4px', left: '-4px' },
} as const

function getRotationAwareCursor(position: string, rotation: number = 0): string {
  const normalizedRotation = ((rotation % 360) + 360) % 360

  const isEdge = ['top', 'bottom', 'left', 'right'].includes(position)
  const isCorner = ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(position)

  const baseAngles: Record<string, number> = {
    'top': 270,
    'right': 0,
    'bottom': 90,
    'left': 180,

    'top-left': 225,
    'top-right': 315,
    'bottom-left': 135,
    'bottom-right': 45,
  }

  const finalAngle = (baseAngles[position] + normalizedRotation) % 360

  if (isEdge) {
    const distances = [
      { cursor: 'n-resize', angle: 270, distance: Math.min(Math.abs(finalAngle - 270), Math.abs(finalAngle - (270 + 360)), Math.abs(finalAngle - (270 - 360))) },
      { cursor: 'e-resize', angle: 0, distance: Math.min(Math.abs(finalAngle - 0), Math.abs(finalAngle - 360)) },
      { cursor: 's-resize', angle: 90, distance: Math.abs(finalAngle - 90) },
      { cursor: 'w-resize', angle: 180, distance: Math.abs(finalAngle - 180) },
    ]

    return distances.reduce((min, curr) => curr.distance < min.distance ? curr : min).cursor
  }
  else if (isCorner) {
    const distances = [
      { cursor: 'ne-resize', angle: 315, distance: Math.min(Math.abs(finalAngle - 315), Math.abs(finalAngle - (315 + 360)), Math.abs(finalAngle - (315 - 360))) },
      { cursor: 'se-resize', angle: 45, distance: Math.abs(finalAngle - 45) },
      { cursor: 'sw-resize', angle: 135, distance: Math.abs(finalAngle - 135) },
      { cursor: 'nw-resize', angle: 225, distance: Math.abs(finalAngle - 225) },
    ]

    return distances.reduce((min, curr) => curr.distance < min.distance ? curr : min).cursor
  }

  return 'default'
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({
  position,
  rotation = 0,
  onMouseDown,
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const rotationAwareCursor = getRotationAwareCursor(position, rotation)
  const positionStyle = styles[position as keyof typeof styles] || {}

  return (
    <div
      data-resize-handle={position}
      style={{
        ...styles.resizeHandle,
        ...positionStyle,
        cursor: rotationAwareCursor,
        background: isHovered ? '#3b82f6' : 'white',
        pointerEvents: 'auto',
      }}
      onMouseDown={(e) => {
        e.stopPropagation()
        e.preventDefault()
        onMouseDown?.(e)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={`${position} - ${rotationAwareCursor} (${rotation}°)`}
    />
  )
}
