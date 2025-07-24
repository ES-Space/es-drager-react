'use client'
import type { ResizeHandleProps } from '../../types'
import React from 'react'
import styles from './index.module.css'

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ position, onMouseDown }) => {
  return (
    <div
      className={`${styles.resizeHandle} ${styles[position]}`}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    />
  )
}
