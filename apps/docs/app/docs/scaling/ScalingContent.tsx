'use client'

import { Drager } from '@es-space/es-drager-react'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export function ScalingContent() {
  // 事件处理函数
  const handleScale = (scale: number) => {
    // eslint-disable-next-line no-console
    console.log('Current scale:', scale)
  }

  return (
    <div className="prose prose-blue max-w-none">
      <h1>Scaling</h1>

      <p>
        ES Drager supports scaling functionality through mouse wheel interaction.
      </p>

      <h2>Basic Scaling</h2>

      <p>
        Enable scaling by setting the
        {' '}
        <code>scalable</code>
        {' '}
        prop:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            scalable
          >
            Scroll to scale
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          Use your mouse wheel while hovering over the element to scale it.
        </p>
      </div>

      <h2>Scale Limits</h2>

      <p>
        You can control the minimum and maximum scale values using the
        {' '}
        <code>minScale</code>
        {' '}
        and
        {' '}
        <code>maxScale</code>
        {' '}
        props:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            scalable
            minScale={0.5}
            maxScale={2}
          >
            Limited scaling
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          This element can only be scaled between 50% and 200% of its original size.
        </p>
      </div>

      <h2>Scale Events</h2>

      <p>
        Track scale changes using the
        {' '}
        <code>onScale</code>
        {' '}
        event handler:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            scalable
            onScale={handleScale}
          >
            Check console
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          Open your browser's console to see the scale value being logged.
        </p>
      </div>

      <h2>Combined Features</h2>

      <p>
        Scaling works seamlessly with dragging and rotation:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            scalable
            rotatable
            minScale={0.5}
            maxScale={2}
          >
            Try all features
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          This element can be dragged, rotated, and scaled.
        </p>
      </div>
    </div>
  )
}
