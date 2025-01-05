'use client'

import { Drager } from '@es-space/es-drager-react'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export default function RotationPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1>Rotation</h1>

      <p>
        ES Drager provides built-in rotation functionality that can be enabled with a single prop.
      </p>

      <h2>Basic Rotation</h2>

      <p>
        Enable rotation by setting the
        {' '}
        <code>rotatable</code>
        {' '}
        prop. A rotation handle will appear above the element:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            rotatable
          >
            Rotate me!
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          Drag the rotation handle above the element to rotate it.
        </p>
      </div>

      <h2>Initial Rotation</h2>

      <p>
        You can set an initial rotation angle using the
        {' '}
        <code>rotation</code>
        {' '}
        prop (in degrees):
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            rotatable
            rotation={45}
          >
            45° Rotation
          </Drager>
        </InfiniteCanvas>
      </div>

      <h2>Rotation Events</h2>

      <p>
        Track rotation changes using the
        {' '}
        <code>onRotate</code>
        {' '}
        event handler:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            rotatable
            // eslint-disable-next-line no-console
            onRotate={angle => console.log('Current angle:', angle)}
          >
            Check console
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          Open your browser's console to see the rotation angle being logged.
        </p>
      </div>

      <h2>Combined with Dragging</h2>

      <p>
        Rotation works seamlessly with dragging and other features:
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <div className="relative w-[400px] h-[300px] border-2 border-dashed border-gray-300 rounded-lg">
            <Drager
              className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
              rotatable
              limit={{
                minX: 0,
                maxX: 400 - 128,
                minY: 0,
                maxY: 300 - 128,
              }}
            >
              Drag & Rotate
            </Drager>
          </div>
        </InfiniteCanvas>
      </div>
    </div>
  )
}
