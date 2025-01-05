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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>id</code></td>
            <td><code>string</code></td>
            <td>auto-generated</td>
          </tr>
          <tr>
            <td><code>className</code></td>
            <td><code>string</code></td>
            <td>-</td>

          </tr>
          <tr>
            <td><code>style</code></td>
            <td><code>CSSProperties</code></td>
            <td>-</td>

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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>rotatable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>

          </tr>
          <tr>
            <td><code>scalable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>

          </tr>
          <tr>
            <td><code>connectable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>

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

          </tr>
          <tr>
            <td><code>minScale</code></td>
            <td><code>number</code></td>
            <td>0.5</td>

          </tr>
          <tr>
            <td><code>maxScale</code></td>
            <td><code>number</code></td>
            <td>2</td>

          </tr>
        </tbody>
      </table>
    </div>
  )
}
