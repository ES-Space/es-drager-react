'use client'

import { Drager } from '@es-space/es-drager-react'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export default function ResizePage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1>Resize</h1>

      <p>
        ES Drager provides resize functionality through draggable handles on the edges and corners of the element.
        This allows for intuitive resizing of elements while maintaining aspect ratio or freely adjusting dimensions.
      </p>

      <h2>Basic Usage</h2>

      <p>
        To enable resizing, simply add the
        {' '}
        <code>resizable</code>
        {' '}
        prop to your Drager component:
      </p>

      <pre>
        <code className="language-tsx">
          {`<Drager
  className="w-32 h-32 bg-blue-500"
  resizable
>
  Resizable content
</Drager>`}
        </code>
      </pre>

      <div className="not-prose my-8 h-[300px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '50px', top: '20px' }}
            resizable
          >
            Try resizing!
          </Drager>
        </InfiniteCanvas>
      </div>

      <h2>Resize Handles</h2>

      <p>
        When
        {' '}
        <code>resizable</code>
        {' '}
        is enabled, eight resize handles appear:
      </p>

      <ul>
        <li>Four corner handles (top-left, top-right, bottom-left, bottom-right)</li>
        <li>Four edge handles (top, right, bottom, left)</li>
      </ul>

      <h2>Combining with Other Features</h2>

      <p>
        Resize functionality can be combined with other features like rotation, scaling, and connections:
      </p>

      <pre>
        <code className="language-tsx">
          {`<Drager
  className="w-32 h-32 bg-blue-500"
  resizable
  rotatable
  scalable
>
  Multi-feature element
</Drager>`}
        </code>
      </pre>

      <div className="not-prose my-8 h-[300px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '50px', top: '20px' }}
            resizable
            rotatable
            scalable
          >
            Try all features!
          </Drager>
        </InfiniteCanvas>
      </div>

    </div>
  )
}
