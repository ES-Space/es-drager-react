import type { AnchorPosition } from '../types'

/**
 * draw the temp connection
 * @param ctx - the canvas context
 * @param start - the start position
 * @param end - the end position
 */
export function drawTempConnection(
  ctx: CanvasRenderingContext2D,
  start: { x: number, y: number },
  end: { x: number, y: number },
) {
  const dpr = window.devicePixelRatio || 1
  const startPos = {
    x: Math.round(start.x * dpr) / dpr,
    y: Math.round(start.y * dpr) / dpr,
  }
  const endPos = {
    x: Math.round(end.x * dpr) / dpr,
    y: Math.round(end.y * dpr) / dpr,
  }

  const offsetX = Math.abs(endPos.x - startPos.x) * 0.5

  ctx.beginPath()
  ctx.strokeStyle = '#3b82f6'
  ctx.lineWidth = 2
  ctx.setLineDash([5, 5])

  ctx.moveTo(startPos.x, startPos.y)
  ctx.bezierCurveTo(
    startPos.x + offsetX,
    startPos.y,
    endPos.x - offsetX,
    endPos.y,
    endPos.x,
    endPos.y,
  )

  ctx.stroke()
  ctx.setLineDash([])
}

/**
 * get the anchor position
 * @param rect - the rect
 * @param position - the anchor position
 * @returns the anchor position
 */
export function getAnchorPosition(rect: DOMRect, position: AnchorPosition) {
  const dpr = window.devicePixelRatio || 1
  switch (position) {
    case 'top':
      return {
        x: Math.round((rect.left + rect.width / 2) * dpr) / dpr,
        y: Math.round(rect.top * dpr) / dpr,
      }
    case 'right':
      return {
        x: Math.round(rect.right * dpr) / dpr,
        y: Math.round((rect.top + rect.height / 2) * dpr) / dpr,
      }
    case 'bottom':
      return {
        x: Math.round((rect.left + rect.width / 2) * dpr) / dpr,
        y: Math.round(rect.bottom * dpr) / dpr,
      }
    case 'left':
      return {
        x: Math.round(rect.left * dpr) / dpr,
        y: Math.round((rect.top + rect.height / 2) * dpr) / dpr,
      }
  }
}
