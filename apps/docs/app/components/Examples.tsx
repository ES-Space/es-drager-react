'use client'

import { Drager } from '@es-space/es-drager-react'
import { useEffect, useRef, useState } from 'react'

export function Examples() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [bounds, setBounds] = useState({
    maxX: 0,
    maxY: 0,
  })
  const [dragers] = useState([
    { id: 'drager-1', label: 'Drager 1', x: 100, y: 20 },
    { id: 'drager-2', label: 'Drager 2', x: 300, y: 20 },
    { id: 'drager-3', label: 'Drager 3', x: 500, y: 20 },
  ])

  useEffect(() => {
    setBounds({
      maxX: window.innerWidth,
      maxY: window.innerHeight,
    })
  }, [])

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

  const handleConnect = () => {
    // eslint-disable-next-line no-console
    console.log('connect')
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-screen-xl mx-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">Basic Usage</h3>
            <div className="h-[200px] relative border rounded-lg">
              <Drager
                className="w-32 h-32 border-2 border-dashed border-blue-500 z-50"
              >
                <div className="flex items-center justify-center h-full text-blue-500">
                  Drag me
                </div>
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
                className="w-32 h-32 border-2 border-dashed border-blue-500"
                snapToElements
                snapThreshold={5}

              >
                <div className="flex flex-col items-center justify-center h-full gap-1">
                  <div className="text-xs font-medium text-blue-500">Snap Box 1</div>
                  <div className="text-[10px] text-gray-400">Try dragging me</div>
                </div>
              </Drager>

              <Drager
                className="w-32 h-32 border-2 border-dashed border-green-500"
                snapToElements
                snapThreshold={5}
                style={{
                  position: 'absolute',
                  right: 0,
                }}
              >
                <div className="flex flex-col items-center justify-center h-full gap-1">
                  <div className="text-xs font-medium text-green-500">Snap Box 2</div>
                  <div className="text-[10px] text-gray-400">Try dragging me</div>
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
            {dragers.map((drager, idx) => (
              <Drager
                key={idx}
                id={drager.id}
                className="w-32 h-32 border-2 border-dashed border-blue-500"
                connectable
                onConnect={handleConnect}
                style={{
                  position: 'absolute',
                  left: drager.x - 100,
                  top: drager.y - 10,
                }}
              >
                <div className="flex flex-col items-center justify-center h-full gap-1">
                  <div className="text-xs font-medium text-blue-500">{drager.label}</div>
                  <div className="text-[10px] text-gray-400">Connect me!</div>
                </div>
              </Drager>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
