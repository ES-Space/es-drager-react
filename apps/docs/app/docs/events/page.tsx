'use client'

import { useTranslation } from 'react-i18next'
import { CodeBlock } from '../../components/CodeBlock'

export default function EventsPage() {
  const { t } = useTranslation()

  const exampleCode = `<Drager
  onClick={() => console.log('clicked')}
  onDragStart={() => console.log('drag started')}
  onDrag={(pos) => console.log('dragging at:', pos)}
  onDragEnd={(pos) => console.log('dropped at:', pos)}
  onRotate={(angle) => console.log('rotated to:', angle)}
  onResize={(size) => console.log('resized to:', size)}
  onConnect={(connection) => console.log('connected:', connection)}
>
  Content
</Drager>`

  return (
    <div className="prose prose-blue max-w-none">
      <h1>{t('events.title')}</h1>

      <p>{t('events.desc')}</p>

      <h2>{t('events.basic')}</h2>

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

      <h2>{t('events.drag')}</h2>

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

      <h2>{t('events.transform')}</h2>

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

      <h2>{t('events.connection')}</h2>

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

      <h2>{t('events.example')}</h2>

      <CodeBlock code={exampleCode} />

    </div>
  )
}
