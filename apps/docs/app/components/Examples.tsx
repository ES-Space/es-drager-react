'use client'

import { Drager } from '@es-space/es-drager-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function Examples() {
  const { t } = useTranslation()
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

      // update the draggable boundary
      setBounds({
        maxX: width - 96, // Drager width (96px)
        maxY: height - 96, // Drager height
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
    <div className="flex-1 p-8 relative">
      <div className="absolute inset-0 bg-white">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#d1d5db_1px,transparent_1px),linear-gradient(to_bottom,#d1d5db_1px,transparent_1px)] bg-[size:32px_32px] opacity-50"
        />
        <div className="absolute inset-0 bg-white/60" />
      </div>
      <div className="relative max-w-screen-xl mx-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">{t('examples.basicUsage')}</h3>
            <div className="h-[200px] relative border rounded-lg overflow-hidden">
              <Drager
                style={{
                  left: '4px',
                  top: '4px',
                }}
                className="w-32 h-32 border-2 border-dashed border-blue-500 relative bg-white"
              >
                <div className="flex items-center justify-center h-full text-blue-500">
                  {t('examples.dragMe')}
                </div>
              </Drager>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">{t('examples.withConstraints')}</h3>
            <div className="h-[200px] relative border rounded-lg overflow-hidden">
              <div
                ref={containerRef}
                className="absolute inset-4 border-2 border-dashed border-gray-200"
              >
                <div className="absolute text-xs text-gray-400 -top-6 left-1/2 -translate-x-1/2 mt-10">
                  {t('examples.draggableArea')}
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
                    <div className="text-xs font-medium">{t('examples.boundedBox')}</div>
                    <div className="text-[10px] text-gray-400">{t('examples.tryDraggingMe')}</div>
                  </div>
                </Drager>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">{t('examples.withRotation')}</h3>
            <div className="h-[200px] relative border rounded-lg overflow-hidden">
              <Drager
                style={{
                  left: '4px',
                  top: '4px',
                }}
                className="w-32 h-32 border-2 border-dashed border-blue-500 cursor-move flex items-center justify-center text-blue-500"
                rotatable
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="text-xs font-medium">{t('examples.rotatableBox')}</div>
                  <div className="text-[10px] text-gray-400">{t('examples.tryRotatingMe')}</div>
                </div>
              </Drager>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-8">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">{t('examples.withScale')}</h3>
            <div className="h-[200px] relative border rounded-lg overflow-hidden">
              <Drager
                style={{
                  left: '4px',
                  top: '4px',
                }}
                className="w-32 h-32 border-2 border-dashed border-blue-500 cursor-move flex items-center justify-center text-blue-500"
                scalable
                minScale={0.5}
                maxScale={2}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="text-xs font-medium">{t('examples.scalableBox')}</div>
                  <div className="text-[10px] text-gray-400">{t('examples.useMouseWheel')}</div>
                </div>
              </Drager>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">{t('examples.withGuidelines')}</h3>
            <div className="h-[200px] relative border rounded-lg overflow-hidden">
              <Drager
                style={{
                  left: '4px',
                  top: '4px',
                }}
                className="w-32 h-32 border-2 border-dashed border-blue-500 cursor-move flex items-center justify-center text-blue-500"
                showGuides
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="text-xs font-medium">{t('examples.withGuidelines')}</div>
                  <div className="text-[10px] text-gray-400">{t('examples.dragToSeeGuides')}</div>
                </div>
              </Drager>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">{t('examples.withSnapping')}</h3>
            <div className="h-[200px] relative border rounded-lg overflow-hidden">
              <Drager
                style={{
                  left: '4px',
                  top: '4px',
                }}
                className="w-32 h-32 border-2 border-dashed border-blue-500"
                snapToElements
                snapThreshold={5}
              >
                <div className="flex flex-col items-center justify-center h-full gap-1">
                  <div className="text-xs font-medium text-blue-500">{t('examples.snapBox1')}</div>
                  <div className="text-[10px] text-gray-400">{t('examples.tryDraggingMe')}</div>
                </div>
              </Drager>
              <Drager
                style={{
                  right: '4px',
                  top: '4px',
                }}
                className="w-32 h-32 border-2 border-dashed border-green-500"
                snapToElements
                snapThreshold={5}
              >
                <div className="flex flex-col items-center justify-center h-full gap-1">
                  <div className="text-xs font-medium text-green-500">{t('examples.snapBox2')}</div>
                  <div className="text-[10px] text-gray-400">{t('examples.tryDraggingMe')}</div>
                </div>
              </Drager>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-sm font-medium mb-4">{t('examples.withResize')}</h3>
            <div className="h-[200px] relative border rounded-lg overflow-hidden">
              <Drager
                style={{
                  left: '4px',
                  top: '4px',
                }}
                className="w-32 h-32 border-2 border-dashed border-blue-500 cursor-move flex items-center justify-center text-blue-500 text-center"
                resizable
              >
                <div className="flex flex-col items-center justify-center w-full gap-1">
                  <div className="text-xs font-medium">{t('examples.resizableBox')}</div>
                  <div className="text-[10px] text-gray-400">{t('examples.dragToResize')}</div>
                </div>
              </Drager>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm mt-8">
          <h3 className="text-sm font-medium mb-4">{t('examples.withConnections')}</h3>
          <div className="text-xs text-gray-500 mb-4">
            {t('examples.hoverToConnect')}
          </div>
          <div className="h-[200px] relative border rounded-lg overflow-hidden">
            {dragers.map((drager, idx) => (
              <Drager
                key={idx}
                id={drager.id}
                className="w-32 h-32 border-2 border-dashed border-blue-500"
                connectable
                onConnect={handleConnect}
                style={{
                  position: 'absolute',
                  left: drager.x - 80,
                  top: drager.y - 10,
                }}
              >
                <div className="flex flex-col items-center justify-center h-full gap-1">
                  <div className="text-xs font-medium text-blue-500">{drager.label}</div>
                  <div className="text-[10px] text-gray-400">{t('examples.connectMe')}</div>
                </div>
              </Drager>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
