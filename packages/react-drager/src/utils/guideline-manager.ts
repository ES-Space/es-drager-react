/**
 * GuidelineManager is a singleton class that manages the drawing of guide lines.
 */
export class GuidelineManager {
  private static instance: GuidelineManager
  private canvas: HTMLCanvasElement

  /**
   * private constructor
   */
  private constructor() {
    this.canvas = document.createElement('canvas')
    this.initCanvas()
  }

  /**
   * get the instance of GuidelineManager
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new GuidelineManager()
    }
    return this.instance
  }

  /**
   * init the canvas
   */
  private initCanvas() {
    this.canvas.style.position = 'fixed'
    this.canvas.style.top = '0'
    this.canvas.style.left = '0'
    this.canvas.style.pointerEvents = 'none'
    this.canvas.style.zIndex = '9998'

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
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

  /**
   * clear the canvas
   */
  clear() {
    const ctx = this.canvas.getContext('2d')
    if (!ctx)
      return
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * draw the guidelines
   */
  drawGuidelines(rect: {
    left: number
    right: number
    top: number
    bottom: number
    width: number
    height: number
  }) {
    const ctx = this.canvas.getContext('2d')
    if (!ctx)
      return

    ctx.beginPath()
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 1
    ctx.setLineDash([4, 4])

    // draw vertical guidelines
    ctx.moveTo(rect.left, 0)
    ctx.lineTo(rect.left, window.innerHeight)

    ctx.moveTo(rect.right, 0)
    ctx.lineTo(rect.right, window.innerHeight)

    ctx.moveTo(rect.left + rect.width / 2, 0)
    ctx.lineTo(rect.left + rect.width / 2, window.innerHeight)

    // draw horizontal guidelines
    ctx.moveTo(0, rect.top)
    ctx.lineTo(window.innerWidth, rect.top)

    ctx.moveTo(0, rect.bottom)
    ctx.lineTo(window.innerWidth, rect.bottom)

    ctx.moveTo(0, rect.top + rect.height / 2)
    ctx.lineTo(window.innerWidth, rect.top + rect.height / 2)

    ctx.stroke()
    ctx.setLineDash([])
  }
}
