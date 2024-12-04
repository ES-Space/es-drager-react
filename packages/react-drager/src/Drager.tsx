import type { FC } from 'react'
import React, { useState } from 'react'
import './styles.css'

interface DragerProps {
  width?: number
  height?: number
  color?: string
}

export const Drager: FC<DragerProps> = ({
  width = 100,
  height = 100,
  color = '#3a7afe',
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleDrag = (e: React.MouseEvent) => {
    setPosition({
      x: e.clientX - width / 2,
      y: e.clientY - height / 2,
    })
  }

  return (
    <div
      className="absolute cursor-move"
      onMouseMove={handleDrag}
      style={{
        width,
        height,
        backgroundColor: color,
        left: position.x,
        top: position.y,
      }}
    />
  )
}
