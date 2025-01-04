'use client'

import { Drager } from '@es-space/es-drager-react'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export function PropsContent() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1>Props Reference</h1>

      <h2>Basic Props</h2>

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>id</code></td>
            <td><code>string</code></td>
            <td>auto-generated</td>
            <td>
              Unique identifier for the drager element. Required when using connections.
              <div className="not-prose my-4 h-[200px] rounded-lg border overflow-hidden">
                <InfiniteCanvas>
                  <Drager
                    id="example-1"
                    className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
                    connectable
                  >
                    ID: example-1
                  </Drager>
                  <Drager
                    id="example-2"
                    className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
                    style={{ left: '200px' }}
                    connectable
                  >
                    ID: example-2
                  </Drager>
                </InfiniteCanvas>
              </div>
            </td>
          </tr>
          <tr>
            <td><code>className</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>
              CSS class names for styling the drager element.
              <div className="not-prose my-4 h-[200px] rounded-lg border overflow-hidden">
                <InfiniteCanvas>
                  <Drager className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium">
                    Custom styles
                  </Drager>
                </InfiniteCanvas>
              </div>
            </td>
          </tr>
          <tr>
            <td><code>style</code></td>
            <td><code>CSSProperties</code></td>
            <td>-</td>
            <td>
              Inline styles for the drager element.
              <div className="not-prose my-4 h-[200px] rounded-lg border overflow-hidden">
                <InfiniteCanvas>
                  <Drager
                    style={{
                      width: '128px',
                      height: '128px',
                      background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 500,
                    }}
                  >
                    Inline styles
                  </Drager>
                </InfiniteCanvas>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Feature Props</h2>

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>rotatable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>
              Enable rotation functionality.
              <div className="not-prose my-4 h-[200px] rounded-lg border overflow-hidden">
                <InfiniteCanvas>
                  <Drager
                    className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
                    rotatable
                  >
                    Try rotating
                  </Drager>
                </InfiniteCanvas>
              </div>
            </td>
          </tr>
          <tr>
            <td><code>scalable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>
              Enable scaling functionality.
              <div className="not-prose my-4 h-[200px] rounded-lg border overflow-hidden">
                <InfiniteCanvas>
                  <Drager
                    className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
                    scalable
                  >
                    Try scaling
                  </Drager>
                </InfiniteCanvas>
              </div>
            </td>
          </tr>
          <tr>
            <td><code>connectable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>
              Enable connection points.
              <div className="not-prose my-4 h-[200px] rounded-lg border overflow-hidden">
                <InfiniteCanvas>
                  <Drager
                    id="connect-1"
                    className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
                    connectable
                  >
                    Connect from
                  </Drager>
                  <Drager
                    id="connect-2"
                    className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
                    style={{ left: '200px' }}
                    connectable
                  >
                    Connect to
                  </Drager>
                </InfiniteCanvas>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Constraint Props</h2>

      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>limit</code></td>
            <td>
              <code>
                {`{
  minX?: number
  maxX?: number
  minY?: number
  maxY?: number
}`}
              </code>
            </td>
            <td>-</td>
            <td>
              Movement constraints for the drager element.
              <div className="not-prose my-4 h-[200px] rounded-lg border overflow-hidden">
                <InfiniteCanvas>
                  <div className="relative w-[400px] h-[300px] border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-gray-500">
                      Constrained Area
                    </div>
                    <Drager
                      className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
                      limit={{
                        minX: 0,
                        maxX: 400 - 128,
                        minY: 0,
                        maxY: 300 - 128,
                      }}
                    >
                      Limited move
                    </Drager>
                  </div>
                </InfiniteCanvas>
              </div>
            </td>
          </tr>
          <tr>
            <td><code>minScale</code></td>
            <td><code>number</code></td>
            <td>0.5</td>
            <td>
              Minimum scale value.
              <div className="not-prose my-4 h-[200px] rounded-lg border overflow-hidden">
                <InfiniteCanvas>
                  <Drager
                    className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
                    scalable
                    minScale={0.5}
                  >
                    Min: 0.5x
                  </Drager>
                </InfiniteCanvas>
              </div>
            </td>
          </tr>
          <tr>
            <td><code>maxScale</code></td>
            <td><code>number</code></td>
            <td>2</td>
            <td>
              Maximum scale value.
              <div className="not-prose my-4 h-[200px] rounded-lg border overflow-hidden">
                <InfiniteCanvas>
                  <Drager
                    className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
                    scalable
                    maxScale={2}
                  >
                    Max: 2x
                  </Drager>
                </InfiniteCanvas>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
