'use client'

import { Drager } from '@es-space/es-drager-react'
import { useEffect, useRef, useState } from 'react'

export function Canvas() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)
  const [bounds, setBounds] = useState({ maxX: 0, maxY: 0 })

  useEffect(() => {
    if (!containerRef.current)
      return

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]
      if (!container)
        return

      const { width, height } = container.contentRect
      setBounds({
        maxX: width - 96, // 减去 Drager 的宽度 (w-24 = 96px)
        maxY: height - 96, // 减去 Drager 的高度
      })
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  if (!isClient)
    return null

  return (
    <div className="flex-1 bg-gray-50">
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
        </div>
      </div>
    </div>
  )
}
