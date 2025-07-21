'use client'

export default function EventsPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1>Event Handlers</h1>

      <p>
        ES Drager provides a rich set of event handlers to help you build interactive interfaces.
      </p>

      <h2>Basic Events</h2>

      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>onClick</code></td>
            <td><code>{'() => void'}</code></td>
            <td>Called when the element is clicked</td>
          </tr>
          <tr>
            <td><code>onBlur</code></td>
            <td><code>{'() => void'}</code></td>
            <td>Called when the element loses focus</td>
          </tr>
        </tbody>
      </table>

      <h2>Drag Events</h2>

      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>onDragStart</code></td>
            <td><code>{'() => void'}</code></td>
            <td>Called when dragging begins</td>
          </tr>
          <tr>
            <td><code>onDrag</code></td>
            <td><code>{'(position: { x: number; y: number }) => void'}</code></td>
            <td>Called continuously while dragging with current position</td>
          </tr>
          <tr>
            <td><code>onDragEnd</code></td>
            <td><code>{'(position: { x: number; y: number }) => void'}</code></td>
            <td>Called when dragging ends with final position</td>
          </tr>
        </tbody>
      </table>

      <h2>Transform Events</h2>

      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>onRotate</code></td>
            <td><code>{'(rotation: number) => void'}</code></td>
            <td>Called when rotation changes with current angle in degrees</td>
          </tr>
          <tr>
            <td><code>onScale</code></td>
            <td><code>{'(scale: number) => void'}</code></td>
            <td>Called when scale changes with current scale factor</td>
          </tr>
          <tr>
            <td><code>onResize</code></td>
            <td><code>{'(size: { width: number; height: number }) => void'}</code></td>
            <td>Called when size changes with new dimensions</td>
          </tr>
        </tbody>
      </table>

      <h2>Connection Events</h2>

      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>onConnect</code></td>
            <td>
              <code>
                {'(connection: { sourceId: string; sourceAnchor: string; targetId: string; targetAnchor: string }) => void'}
              </code>
            </td>
            <td>Called when a connection is established between two elements</td>
          </tr>
        </tbody>
      </table>

      <h2>Usage Example</h2>

      <pre>
        <code>
          {`<Drager
  onClick={() => console.log('clicked')}
  onDragStart={() => console.log('drag started')}
  onDrag={(pos) => console.log('dragging at:', pos)}
  onDragEnd={(pos) => console.log('dropped at:', pos)}
  onRotate={(angle) => console.log('rotated to:', angle)}
  onResize={(size) => console.log('resized to:', size)}
  onConnect={(connection) => console.log('connected:', connection)}
>
  Content
</Drager>`}
        </code>
      </pre>

    </div>
  )
}
