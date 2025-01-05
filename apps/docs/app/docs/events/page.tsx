'use client'

export default function EventsPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1>Event Handlers</h1>

      <p>
        ES Drager provides a rich set of event handlers to help you build interactive interfaces.
      </p>

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
            <td><code>{'(pos: { x: number; y: number }) => void'}</code></td>
            <td>Called continuously while dragging</td>

          </tr>
          <tr>
            <td><code>onDragEnd</code></td>
            <td><code>{'() => void'}</code></td>
            <td>Called when dragging ends</td>

          </tr>
        </tbody>
      </table>

      <h2>Feature Events</h2>

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
            <td><code>{'(angle: number) => void'}</code></td>
            <td>Called when rotation changes</td>

          </tr>
          <tr>
            <td><code>onScale</code></td>
            <td><code>{'(scale: number) => void'}</code></td>
            <td>Called when scale changes</td>

          </tr>
          <tr>
            <td><code>onConnect</code></td>
            <td>
              <code>
                {'(sourceId: string, sourceAnchor: string, targetId: string, targetAnchor: string) => void'}
              </code>
            </td>
            <td>Called when a connection is created</td>

          </tr>
        </tbody>
      </table>

    </div>
  )
}
