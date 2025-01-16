'use client'
import type { ResizeHandleProps } from '../../types'
import React from 'react'
import './index.css'

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ position, onMouseDown }) => {
  return (
    <div
      className={`resize-handle ${position}`}
      onMouseDown={onMouseDown}
    />
  )
}
