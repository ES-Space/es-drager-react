import type { Connection } from './types'

export class ConnectionManager {
  private static instance: ConnectionManager
  private connections: Connection[] = []

  private constructor() {}

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

  drawConnections(ctx: CanvasRenderingContext2D) {
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
    switch (anchor) {
      case 'top':
        return { x: rect.left + rect.width / 2, y: rect.top }
      case 'right':
        return { x: rect.right, y: rect.top + rect.height / 2 }
      case 'bottom':
        return { x: rect.left + rect.width / 2, y: rect.bottom }
      case 'left':
        return { x: rect.left, y: rect.top + rect.height / 2 }
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

    // 移动到起点
    ctx.moveTo(start.x, start.y)

    // 绘制贝塞尔曲线
    ctx.bezierCurveTo(
      start.x + offsetX,
      start.y, // 控制点1
      end.x - offsetX,
      end.y, // 控制点2
      end.x,
      end.y, // 终点
    )

    ctx.stroke()
  }
}
