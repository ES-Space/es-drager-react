'use client'

import { Drager } from '@es-space/es-drager-react'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export function DraggingContent() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1>Dragging</h1>

      <p>
        Learn how to use ES Drager's dragging functionality.
      </p>

      <h2>Basic Dragging</h2>

      <p>
        By default, any Drager component can be dragged by clicking and holding:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium">
            Drag me!
          </Drager>
          <Drager
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '200px' }}
          >
            Drag me too!
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          Tips:
          {' '}
          <span className="font-medium">Middle mouse button</span>
          {' '}
          to pan canvas,
          {' '}
          <span className="font-medium">Ctrl + Scroll</span>
          {' '}
          to zoom
        </p>
      </div>

      <h2>Movement Constraints</h2>

      <p>
        You can limit the movement area using the
        {' '}
        <code>limit</code>
        {' '}
        prop:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <div className="relative w-[400px] h-[300px] border-2 border-dashed border-gray-300 rounded-lg">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-gray-500">
              Constrained Area
            </div>
            <Drager
              className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
              limit={{
                minX: 0,
                maxX: 400 - 128, // width - element width
                minY: 0,
                maxY: 300 - 128, // height - element height
              }}
            >
              Limited move
            </Drager>
          </div>
        </InfiniteCanvas>
      </div>

      <h2>Drag Events</h2>

      <p>
        ES Drager provides three events for drag interactions:
      </p>

      <ul>
        <li>
          <code>onDragStart</code>
          {' '}
          - Called when dragging begins
        </li>
        <li>
          <code>onDrag</code>
          {' '}
          - Called continuously while dragging
        </li>
        <li>
          <code>onDragEnd</code>
          {' '}
          - Called when dragging ends
        </li>
      </ul>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            onDragStart={() => {
              // eslint-disable-next-line no-console
              console.log('Started dragging')
            }}
            onDrag={(pos) => {
              // eslint-disable-next-line no-console
              console.log('Current position:', pos)
            }}
            onDragEnd={() => {
              // eslint-disable-next-line no-console
              console.log('Finished dragging')
            }}
          >
            Check console
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          Open your browser's console to see the events being fired.
        </p>
      </div>
    </div>
  )
}
