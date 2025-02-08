'use client'
import type { ResizeHandleProps } from '../../types'
import React from 'react'

const styles = {
  'resizeHandle': {
    'position': 'absolute',
    'width': '8px',
    'height': '8px',
    'background': 'white',
    'border': '1px solid #3b82f6',
    'borderRadius': '4px',
    'transition': 'background-color 0.2s',
    ':hover': {
      background: '#3b82f6',
    },
  },
  'right': {
    right: '-4px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'e-resize',
  },
  'left': {
    left: '-4px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'w-resize',
  },
  'top': {
    top: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
    cursor: 'n-resize',
  },
  'bottom': {
    bottom: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
    cursor: 's-resize',
  },
  'top-right': {
    top: '-4px',
    right: '-4px',
    cursor: 'ne-resize',
  },
  'top-left': {
    top: '-4px',
    left: '-4px',
    cursor: 'nw-resize',
  },
  'bottom-right': {
    bottom: '-4px',
    right: '-4px',
    cursor: 'se-resize',
  },
  'bottom-left': {
    bottom: '-4px',
    left: '-4px',
    cursor: 'sw-resize',
  },
} as const

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ position, onMouseDown }) => {
  return (
    <div
      style={{ ...styles.resizeHandle, ...styles[position] }}
      onMouseDown={onMouseDown}
    />
  )
}
