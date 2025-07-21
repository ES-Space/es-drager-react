'use client'

export default function PropsPage() {
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
            <td>-</td>
            <td>
              Unique identifier for the element. Required when
              <code>connectable</code>
              {' '}
              is true.
            </td>
          </tr>
          <tr>
            <td><code>className</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Additional CSS classes.</td>
          </tr>
          <tr>
            <td><code>style</code></td>
            <td><code>CSSProperties</code></td>
            <td>-</td>
            <td>Additional inline styles.</td>
          </tr>
          <tr>
            <td><code>selected</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Whether the element is selected.</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Whether the element is disabled.</td>
          </tr>
          <tr>
            <td><code>draggable</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Whether the element can be dragged.</td>
          </tr>
        </tbody>
      </table>

      <h2>Dimension Props</h2>
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
            <td><code>width</code></td>
            <td><code>number</code></td>
            <td>-</td>
            <td>Width of the element in pixels.</td>
          </tr>
          <tr>
            <td><code>height</code></td>
            <td><code>number</code></td>
            <td>-</td>
            <td>Height of the element in pixels.</td>
          </tr>
          <tr>
            <td><code>top</code></td>
            <td><code>number</code></td>
            <td>0</td>
            <td>Top position of the element.</td>
          </tr>
          <tr>
            <td><code>left</code></td>
            <td><code>number</code></td>
            <td>0</td>
            <td>Left position of the element.</td>
          </tr>
          <tr>
            <td><code>minWidth</code></td>
            <td><code>number</code></td>
            <td>20</td>
            <td>Minimum width of the element.</td>
          </tr>
          <tr>
            <td><code>minHeight</code></td>
            <td><code>number</code></td>
            <td>20</td>
            <td>Minimum height of the element.</td>
          </tr>
          <tr>
            <td><code>maxWidth</code></td>
            <td><code>number</code></td>
            <td>-</td>
            <td>Maximum width of the element.</td>
          </tr>
          <tr>
            <td><code>maxHeight</code></td>
            <td><code>number</code></td>
            <td>-</td>
            <td>Maximum height of the element.</td>
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
            <td>Whether the element can be rotated.</td>
          </tr>
          <tr>
            <td><code>rotation</code></td>
            <td><code>number</code></td>
            <td>0</td>
            <td>Initial rotation angle in degrees.</td>
          </tr>
          <tr>
            <td><code>scalable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Whether the element can be scaled.</td>
          </tr>
          <tr>
            <td><code>resizable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Whether the element can be resized.</td>
          </tr>
          <tr>
            <td><code>connectable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Whether the element can be connected to other elements.</td>
          </tr>
          <tr>
            <td><code>showGuides</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Whether to show alignment guides while dragging.</td>
          </tr>
          <tr>
            <td><code>snapToElements</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Whether to snap to other elements while dragging.</td>
          </tr>
          <tr>
            <td><code>snapThreshold</code></td>
            <td><code>number</code></td>
            <td>5</td>
            <td>Distance threshold for snapping in pixels.</td>
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
  minX?: number,
  maxX?: number,
  minY?: number,
  maxY?: number
}`}
              </code>
            </td>
            <td>-</td>
            <td>Movement boundaries for the element.</td>
          </tr>
          <tr>
            <td><code>minScale</code></td>
            <td><code>number</code></td>
            <td>0.5</td>
            <td>Minimum scale factor.</td>
          </tr>
          <tr>
            <td><code>maxScale</code></td>
            <td><code>number</code></td>
            <td>2</td>
            <td>Maximum scale factor.</td>
          </tr>
        </tbody>
      </table>

      <h2>Event Props</h2>
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>onBlur</code></td>
            <td><code>() =&gt; void</code></td>
            <td>Called when the element loses focus.</td>
          </tr>
          <tr>
            <td><code>onClick</code></td>
            <td><code>() =&gt; void</code></td>
            <td>Called when the element is clicked.</td>
          </tr>
          <tr>
            <td><code>onDragStart</code></td>
            <td><code>() =&gt; void</code></td>
            <td>Called when dragging starts.</td>
          </tr>
          <tr>
            <td><code>onDrag</code></td>
            <td>
              <code>
                (position:
                {`{ x: number, y: number }`}
                ) =&gt; void
              </code>
            </td>
            <td>Called while dragging with current position.</td>
          </tr>
          <tr>
            <td><code>onDragEnd</code></td>
            <td>
              <code>
                (position:
                {`{ x: number, y: number }`}
                ) =&gt; void
              </code>
            </td>
            <td>Called when dragging ends with final position.</td>
          </tr>
          <tr>
            <td><code>onRotate</code></td>
            <td><code>(rotation: number) =&gt; void</code></td>
            <td>Called when rotation changes with current angle.</td>
          </tr>
          <tr>
            <td><code>onScale</code></td>
            <td><code>(scale: number) =&gt; void</code></td>
            <td>Called when scale changes with current scale factor.</td>
          </tr>
          <tr>
            <td><code>onResize</code></td>
            <td>
              <code>
                (size:
                {`{ width: number, height: number }`}
                ) =&gt; void
              </code>
            </td>
            <td>Called when size changes with new dimensions.</td>
          </tr>
          <tr>
            <td><code>onConnect</code></td>
            <td><code>(connection: Connection) =&gt; void</code></td>
            <td>Called when a connection is established.</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
