import type { Connection } from '../types'

/**
 * ConnectionManager is a singleton class that manages the drawing of connections.
 */
export class ConnectionManager {
  private static instance: ConnectionManager
  private connections: Connection[] = []
  private svg: SVGSVGElement
  private selectedConnection: Connection | null = null

  /**
   * private constructor
   */
  private constructor() {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.initSVG()
    this.initEventListeners()

    // add window resize and scroll listeners
    window.addEventListener('resize', () => {
      this.updateConnections()
    })

    // listen to scroll events
    window.addEventListener('scroll', () => {
      this.updateConnections()
    }, true) // use capture phase to ensure capturing all scroll events
  }

  /**
   * get the instance of ConnectionManager
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new ConnectionManager()
    }
    return this.instance
  }

  /**
   * init the svg
   */
  private initSVG() {
    this.svg.style.position = 'fixed'
    this.svg.style.top = '0'
    this.svg.style.left = '0'
    this.svg.style.width = '100%'
    this.svg.style.height = '100%'
    this.svg.style.pointerEvents = 'none'
    this.svg.style.zIndex = '9999'
    document.body.appendChild(this.svg)
  }

  /**
   * init the event listeners
   */
  private initEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.selectedConnection) {
        this.selectedConnection = null
        this.drawConnections()
      }
      else if ((e.key === 'Delete' || e.key === 'Backspace') && this.selectedConnection) {
        this.removeConnection()
      }
    })

    this.svg.addEventListener('click', (e) => {
      if (e.target === this.svg) {
        this.selectedConnection = null
        this.drawConnections()
      }
    })
  }

  /**
   * add a connection
   * @param connection - the connection to add
   */
  addConnection(connection: Connection) {
    this.connections.push(connection)
    this.drawConnections()
  }

  /**
   * remove a connection
   */
  removeConnection() {
    this.connections = this.connections.filter((conn) => {
      if (!this.selectedConnection)
        return true
      return !(
        conn.sourceId === this.selectedConnection.sourceId
        && conn.targetId === this.selectedConnection.targetId
        && conn.sourceAnchor === this.selectedConnection.sourceAnchor
        && conn.targetAnchor === this.selectedConnection.targetAnchor
      )
    })
    this.drawConnections()
  }

  /**
   * get the connections
   * @returns the connections
   */
  getConnections() {
    return this.connections
  }

  /**
   * draw the connections
   */
  drawConnections() {
    while (this.svg.firstChild) {
      this.svg.removeChild(this.svg.firstChild)
    }

    this.connections.forEach((conn) => {
      const pathElement = this.getPathElement(conn)
      if (pathElement) {
        this.svg.appendChild(pathElement)
      }
    })
  }

  /**
   * draw the temporary connection
   * @param start - the start position
   * @param end - the end position
   */
  drawTempConnection(start: { x: number, y: number }, end: { x: number, y: number }) {
    const tempLine = document.getElementById('temp-connection')
    if (tempLine) {
      this.svg.removeChild(tempLine)
    }

    const path = this.createConnectionPath(start, end)
    path.id = 'temp-connection'
    path.style.strokeDasharray = '5,5'
    this.svg.appendChild(path)
  }

  /**
   * get the anchor position
   * @param rect - the rect
   * @param anchor - the anchor
   * @returns the anchor position
   */
  private getAnchorPosition(rect: DOMRect, anchor: string) {
    switch (anchor) {
      case 'top':
        return {
          x: rect.left + rect.width / 2,
          y: rect.top,
        }
      case 'right':
        return {
          x: rect.right,
          y: rect.top + rect.height / 2,
        }
      case 'bottom':
        return {
          x: rect.left + rect.width / 2,
          y: rect.bottom,
        }
      case 'left':
        return {
          x: rect.left,
          y: rect.top + rect.height / 2,
        }
      default:
        return { x: 0, y: 0 }
    }
  }

  /**
   * get the path element
   * @param connection - the connection
   * @returns the path element
   */
  private getPathElement(connection: Connection): SVGPathElement | null {
    const sourceEl = document.querySelector(`[data-drager-id="${connection.sourceId}"]`)
    const targetEl = document.querySelector(`[data-drager-id="${connection.targetId}"]`)

    if (!sourceEl || !targetEl)
      return null

    const sourceRect = sourceEl.getBoundingClientRect()
    const targetRect = targetEl.getBoundingClientRect()

    const sourcePos = this.getAnchorPosition(sourceRect, connection.sourceAnchor)
    const targetPos = this.getAnchorPosition(targetRect, connection.targetAnchor)

    const path = this.createConnectionPath(
      sourcePos,
      targetPos,
      this.selectedConnection === connection,
    )

    path.addEventListener('click', (e) => {
      e.stopPropagation()
      this.selectedConnection = connection
      this.drawConnections()
    })

    return path
  }

  /**
   * create the connection path
   * @param start - the start position
   * @param end - the end position
   * @param isSelected - whether the connection is selected
   * @returns the path element
   */
  private createConnectionPath(start: { x: number, y: number }, end: { x: number, y: number }, isSelected = false) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    const offsetX = Math.abs(end.x - start.x) * 0.5

    const d = `M ${start.x} ${start.y} 
               C ${start.x + offsetX} ${start.y},
                 ${end.x - offsetX} ${end.y},
                 ${end.x} ${end.y}`

    path.setAttribute('d', d)
    path.setAttribute('stroke', isSelected ? '#f59e0b' : '#3b82f6')
    path.setAttribute('stroke-width', isSelected ? '3' : '2')
    path.setAttribute('fill', 'none')
    path.style.pointerEvents = 'stroke'
    path.style.cursor = 'pointer'

    return path
  }

  /**
   * remove the temporary connection
   */
  removeTempConnection() {
    const tempLine = document.getElementById('temp-connection')
    if (tempLine) {
      this.svg.removeChild(tempLine)
    }
  }

  /**
   * update the connections
   */
  updateConnections() {
    this.drawConnections()
  }

  /**
   * destroy the connection manager
   */
  destroy() {
    window.removeEventListener('resize', this.updateConnections)
    window.removeEventListener('scroll', this.updateConnections, true)
    if (this.svg.parentNode) {
      this.svg.parentNode.removeChild(this.svg)
    }
  }
}
