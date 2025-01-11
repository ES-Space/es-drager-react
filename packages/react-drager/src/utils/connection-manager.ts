import type { Connection } from '../types'
import _ from 'lodash'

/**
 * ConnectionManager is a singleton class that manages the drawing of connections.
 */
export class ConnectionManager {
  private static instance: ConnectionManager
  private connections: Connection[] = []
  private svg: SVGSVGElement
  private selectedConnection: Connection | null = null
  private threshold: number = 10 // Default distance threshold
  private activeAnchors: Set<string> = new Set()
  private isSimulating = false
  private isSimulatingMouseMove = false

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
    // 确保只添加一次事件监听器
    document.removeEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keydown', this.handleKeyDown.bind(this))

    this.svg.removeEventListener('click', this.handleSvgClick)
    this.svg.addEventListener('click', this.handleSvgClick.bind(this))

    document.removeEventListener('mousemove', this.handleMouseMove.bind(this))
    document.addEventListener('mousemove', this.handleMouseMove.bind(this))
  }

  setThreshold(value: number) {
    this.threshold = value
  }

  private handleMouseMove = _.throttle((e: MouseEvent) => {
    if (this.isSimulating || this.isSimulatingMouseMove) // Check if mouse movements are being simulated
      return

    const mousePosition = { x: e.clientX, y: e.clientY }
    const nearestAnchor = this.getNearestAnchor(mousePosition)
    if (nearestAnchor && nearestAnchor.distance <= this.threshold) {
      this.isSimulatingMouseMove = true
      this.simulateMouseMove(nearestAnchor.rect)
      this.isSimulatingMouseMove = false
    }
    else {
      this.activeAnchors.clear()
    }
    this.updateActiveAnchors(mousePosition)
  }, 100)

  private getNearestAnchor(mousePos: { x: number, y: number }): { rect: DOMRect, distance: number } | null {
    const anchors = Array.from(document.querySelectorAll('.anchor')) as HTMLElement[]
    let nearestAnchor: { rect: DOMRect, distance: number } | null = null

    anchors.forEach((anchor) => {
      const rect = anchor.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distance = Math.sqrt(
        (mousePos.x - centerX) ** 2 + (mousePos.y - centerY) ** 2,
      )

      if (!nearestAnchor || distance < nearestAnchor.distance) {
        nearestAnchor = { rect, distance }
      }
    })

    return nearestAnchor
  }

  private simulateMouseMove(rect: DOMRect) {
    if (this.isSimulating)
      return
    this.isSimulating = true
    try {
      const event = new MouseEvent('mousemove', {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
      })

      document.dispatchEvent(event) // Trigger a simulation event
    }
    finally {
      this.isSimulating = false // Make sure the status resets
    }
  }

  private updateActiveAnchors(mousePosition: { x: number, y: number }) {
    const newActiveAnchors = new Set<string>()

    this.connections.forEach((conn) => {
      const sourceAnchor = this.getAnchorDom(conn.sourceId, conn.sourceAnchor)
      const targetAnchor = this.getAnchorDom(conn.targetId, conn.targetAnchor)

      if (sourceAnchor && this.isWithinThreshold(mousePosition, sourceAnchor)) {
        newActiveAnchors.add(`${conn.sourceId}-${conn.sourceAnchor}`)
      }

      if (targetAnchor && this.isWithinThreshold(mousePosition, targetAnchor)) {
        newActiveAnchors.add(`${conn.targetId}-${conn.targetAnchor}`)
      }
    })

    if (this.areSetsDifferent(this.activeAnchors, newActiveAnchors)) {
      this.activeAnchors = newActiveAnchors
      this.updateAnchorStyles()
    }
  }

  private isWithinThreshold(mousePos: { x: number, y: number }, anchor: DOMRect) {
    const anchorCenter = { x: anchor.left + anchor.width / 2, y: anchor.top + anchor.height / 2 }
    const distance = Math.sqrt(
      (anchorCenter.x - mousePos.x) ** 2 + (anchorCenter.y - mousePos.y) ** 2,
    )
    return distance <= this.threshold
  }

  private updateAnchorStyles() {
    document.querySelectorAll('[data-drager-id]').forEach((element) => {
      const id = element.getAttribute('data-drager-id')
      const anchorType = element.getAttribute('data-anchor-type')
      const key = `${id}-${anchorType}`

      if (this.activeAnchors.has(key)) {
        element.classList.add('active-anchor')
      }
      else {
        element.classList.remove('active-anchor')
      }
    })
  }

  private getAnchorDom(id: string, anchorType: string): DOMRect | null {
    const element = document.querySelector(`[data-drager-id="${id}"][data-anchor-type="${anchorType}"]`)
    return element ? element.getBoundingClientRect() : null
  }

  private areSetsDifferent(setA: Set<string>, setB: Set<string>) {
    if (setA.size !== setB.size)
      return true
    for (const value of setA) {
      if (!setB.has(value))
        return true
    }
    return false
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
    // Use request animation frames to refine drawing
    requestAnimationFrame(() => {
      while (this.svg.firstChild) {
        this.svg.removeChild(this.svg.firstChild)
      }

      this.connections.forEach((conn) => {
        const pathElement = this.getPathElement(conn)
        if (pathElement) {
          this.svg.appendChild(pathElement)
        }
      })
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

    // Add a click event
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

  // A new method for handling keyboard events has been added
  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.selectedConnection) {
      this.selectedConnection = null
      this.drawConnections()
    }
    else if ((e.key === 'Delete' || e.key === 'Backspace') && this.selectedConnection) {
      this.removeConnection()
    }
  }

  // Added a method for handling SVG click events
  private handleSvgClick(e: MouseEvent) {
    if (e.target === this.svg) {
      this.selectedConnection = null
      this.drawConnections()
    }
  }
}
