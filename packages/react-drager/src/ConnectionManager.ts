import type { Connection } from './types'

export class ConnectionManager {
  private static instance: ConnectionManager
  private connections: Connection[] = []
  private canvas!: HTMLCanvasElement

  private constructor() {
    this.initCanvas()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ConnectionManager()
    }
    return this.instance
  }

  addConnection(connection: Connection) {
    this.connections.push(connection)
  }

  removeConnection(sourceId: string, targetId: string) {
    this.connections = this.connections.filter(
      conn => !(conn.sourceId === sourceId && conn.targetId === targetId),
    )
  }

  getConnections() {
    return this.connections
  }

  drawConnections() {
    const ctx = this.canvas.getContext('2d')
    if (!ctx)
      return

    // 清除之前的绘制内容
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.connections.forEach((conn) => {
      const sourceEl = document.querySelector(`[data-drager-id="${conn.sourceId}"]`)
      const targetEl = document.querySelector(`[data-drager-id="${conn.targetId}"]`)

      if (!sourceEl || !targetEl)
        return

      const sourceRect = sourceEl.getBoundingClientRect()
      const targetRect = targetEl.getBoundingClientRect()

      const sourcePos = this.getAnchorPosition(sourceRect, conn.sourceAnchor)
      const targetPos = this.getAnchorPosition(targetRect, conn.targetAnchor)

      this.drawBezierConnection(ctx, sourcePos, targetPos)
    })
  }

  private getAnchorPosition(rect: DOMRect, anchor: string) {
    const dpr = window.devicePixelRatio || 1
    switch (anchor) {
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
      default:
        return { x: 0, y: 0 }
    }
  }

  private drawBezierConnection(
    ctx: CanvasRenderingContext2D,
    start: { x: number, y: number },
    end: { x: number, y: number },
  ) {
    const offsetX = Math.abs(end.x - start.x) * 0.5

    ctx.beginPath()
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])

    ctx.moveTo(start.x, start.y)
    ctx.bezierCurveTo(
      start.x + offsetX,
      start.y,
      end.x - offsetX,
      end.y,
      end.x,
      end.y,
    )

    ctx.stroke()
    ctx.setLineDash([])
  }

  private initCanvas() {
    this.canvas = document.createElement('canvas')
    this.canvas.style.position = 'fixed'
    this.canvas.style.top = '0'
    this.canvas.style.left = '0'
    this.canvas.style.pointerEvents = 'none'
    this.canvas.style.zIndex = '1000'

    const dpr = window.devicePixelRatio || 1
    const updateCanvasSize = () => {
      this.canvas.style.width = `${window.innerWidth}px`
      this.canvas.style.height = `${window.innerHeight}px`
      this.canvas.width = window.innerWidth * dpr
      this.canvas.height = window.innerHeight * dpr

      const ctx = this.canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    document.body.appendChild(this.canvas)
  }
}
