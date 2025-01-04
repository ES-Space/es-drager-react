'use client'

import { Drager } from '@es-space/es-drager-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Connection {
  sourceId: string
  sourceAnchor: string
  targetId: string
  targetAnchor: string
}

export function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [bounds, setBounds] = useState({
    maxX: window.innerWidth, // 默认宽度
    maxY: window.innerHeight, // 默认高度
  })
  const [connections, setConnections] = useState<Connection[]>([])

  useEffect(() => {
    if (!containerRef.current)
      return

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]
      if (!container)
        return

      const { width, height } = container.contentRect

      // 更新拖拽边界
      setBounds({
        maxX: width - 96, // Drager 宽度 (96px)
        maxY: height - 96, // Drager 高度
      })
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const handleConnect = useCallback((sourceId: string, sourceAnchor: string, targetId: string, targetAnchor: string) => {
    setConnections(prev => [...prev, {
      sourceId,
      sourceAnchor,
      targetId,
      targetAnchor,
    }])
  }, [])

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-screen-xl mx-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">Basic Usage</h3>
            <div className="h-[200px] relative border rounded-lg">
              <Drager className="w-32 h-32 border-2 border-dashed border-blue-500 cursor-move flex items-center justify-center text-blue-500">
                Drag me
              </Drager>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">With Constraints</h3>
            <div className="h-[200px] relative border rounded-lg">
              <div
                ref={containerRef}
                className="absolute inset-4 border-2 border-dashed border-gray-200"
              >
                <div className="absolute text-xs text-gray-400 -top-6 left-1/2 -translate-x-1/2 mt-10">
                  Draggable Area
                </div>
                <Drager
                  className="w-24 h-24 border-2 border-dashed border-blue-500 cursor-move flex items-center justify-center text-blue-500"
                  limit={{
                    minX: 0,
                    maxX: bounds.maxX,
                    minY: 0,
                    maxY: bounds.maxY,
                  }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xs font-medium">Bounded Box</div>
                    <div className="text-[10px] text-gray-400">Try dragging me</div>
                  </div>
                </Drager>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">With Rotation</h3>
            <div className="h-[200px] relative border rounded-lg">
              <Drager
                className="w-32 h-32 border-2 border-dashed border-blue-500 cursor-move flex items-center justify-center text-blue-500"
                rotatable
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="text-xs font-medium">Rotatable Box</div>
                  <div className="text-[10px] text-gray-400">Try rotating me</div>
                </div>
              </Drager>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-8">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">With Scale</h3>
            <div className="h-[200px] relative border rounded-lg">
              <Drager
                className="w-32 h-32 border-2 border-dashed border-blue-500 cursor-move flex items-center justify-center text-blue-500"
                scalable
                minScale={0.5}
                maxScale={2}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="text-xs font-medium">Scalable Box</div>
                  <div className="text-[10px] text-gray-400">Use mouse wheel</div>
                </div>
              </Drager>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">With Guidelines</h3>
            <div className="h-[200px] relative border rounded-lg">
              <Drager
                className="w-32 h-32 border-2 border-dashed border-blue-500 cursor-move flex items-center justify-center text-blue-500"
                showGuides
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="text-xs font-medium">With Guidelines</div>
                  <div className="text-[10px] text-gray-400">Drag to see guides</div>
                </div>
              </Drager>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">With Snapping</h3>
            <div className="h-[200px] relative border rounded-lg">
              <Drager
                id="snap1"
                className="w-32 h-32 border-2 border-dashed border-blue-500 cursor-move flex items-center justify-center text-blue-500"
                snapToElements
                snapThreshold={5}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="text-xs font-medium">Snap Box 1</div>
                  <div className="text-[10px] text-gray-400">Try snapping</div>
                </div>
              </Drager>
              <Drager
                id="snap2"
                className="w-32 h-32 border-2 border-dashed border-green-500 cursor-move flex items-center justify-center text-green-500"
                style={{ left: '180px' }}
                snapToElements
                snapThreshold={5}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="text-xs font-medium">Snap Box 2</div>
                  <div className="text-[10px] text-gray-400">Try snapping</div>
                </div>
              </Drager>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm mt-8">
          <h3 className="text-sm font-medium mb-4">With Connections</h3>
          <div className="text-xs text-gray-500 mb-4">
            Hover over the blue dots and drag to another dot to create a connection
          </div>
          <div className="h-[200px] relative border rounded-lg">
            <Drager
              id="drager1"
              className="w-32 h-32 border-2 border-dashed border-blue-500 cursor-move"
              connectable
              onConnect={handleConnect}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="text-xs font-medium">Drager 1</div>
                <div className="text-[10px] text-gray-400">Connect me!</div>
              </div>
            </Drager>

            <Drager
              id="drager2"
              className="w-32 h-32 border-2 border-dashed border-blue-500 cursor-move"
              style={{ left: '200px' }}
              connectable
              onConnect={handleConnect}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="text-xs font-medium">Drager 2</div>
                <div className="text-[10px] text-gray-400">Connect me!</div>
              </div>
            </Drager>

            {/* Render connections */}
            {connections.map((conn, index) => (
              <svg
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                }}
              >
                <path
                  d={`M ${getAnchorPosition(conn.sourceId, conn.sourceAnchor).x} ${getAnchorPosition(conn.sourceId, conn.sourceAnchor).y} 
                     C ${getAnchorPosition(conn.sourceId, conn.sourceAnchor).x + 50} ${getAnchorPosition(conn.sourceId, conn.sourceAnchor).y},
                       ${getAnchorPosition(conn.targetId, conn.targetAnchor).x - 50} ${getAnchorPosition(conn.targetId, conn.targetAnchor).y},
                       ${getAnchorPosition(conn.targetId, conn.targetAnchor).x} ${getAnchorPosition(conn.targetId, conn.targetAnchor).y}`}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get anchor positions
function getAnchorPosition(dragerId: string, anchor: string) {
  const el = document.querySelector(`[data-drager-id="${dragerId}"]`)
  if (!el)
    return { x: 0, y: 0 }

  const rect = el.getBoundingClientRect()
  const positions = {
    top: { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top) },
    right: { x: Math.round(rect.right), y: Math.round(rect.top + rect.height / 2) },
    bottom: { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.bottom) },
    left: { x: Math.round(rect.left), y: Math.round(rect.top + rect.height / 2) },
  }

  return positions[anchor as keyof typeof positions]
}
