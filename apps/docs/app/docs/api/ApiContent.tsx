'use client'

export function ApiContent() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1>API Reference</h1>

      <h2>Props</h2>

      <h3>Basic Props</h3>
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
            <td>Unique identifier for the drager element</td>
          </tr>
          <tr>
            <td><code>className</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>CSS class names</td>
          </tr>
          <tr>
            <td><code>style</code></td>
            <td><code>CSSProperties</code></td>
            <td>-</td>
            <td>Inline styles</td>
          </tr>
        </tbody>
      </table>

      <h3>Feature Props</h3>
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
            <td>Enable rotation functionality</td>
          </tr>
          <tr>
            <td><code>scalable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Enable scaling functionality</td>
          </tr>
          <tr>
            <td><code>connectable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Enable connection points</td>
          </tr>
          <tr>
            <td><code>showGuides</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Show alignment guides while dragging</td>
          </tr>
        </tbody>
      </table>

      <h3>Event Handlers</h3>
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
