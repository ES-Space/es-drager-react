'use client'

import { useTranslation } from 'react-i18next'

export default function PropsPage() {
  const { t } = useTranslation()
  return (
    <div className="prose prose-blue max-w-none">
      <h1>{t('props.title')}</h1>

      <h2>{t('props.basic')}</h2>
      <table>
        <thead>
          <tr>
            <th>{t('props.prop')}</th>
            <th>{t('props.type')}</th>
            <th>{t('props.default')}</th>
            <th>{t('props.description')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>id</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>
              {t('props.id.description')}
            </td>
          </tr>
          <tr>
            <td><code>className</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>{t('props.className.description')}</td>
          </tr>
          <tr>
            <td><code>style</code></td>
            <td><code>CSSProperties</code></td>
            <td>-</td>
            <td>{t('props.style.description')}</td>
          </tr>
          <tr>
            <td><code>selected</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>{t('props.selected.description')}</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>{t('props.disabled.description')}</td>
          </tr>
          <tr>
            <td><code>draggable</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>{t('props.draggable.description')}</td>
          </tr>
        </tbody>
      </table>

      <h2>{t('props.position')}</h2>
      <table>
        <thead>
          <tr>
            <th>{t('props.prop')}</th>
            <th>{t('props.type')}</th>
            <th>{t('props.default')}</th>
            <th>{t('props.description')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>top</code></td>
            <td><code>number</code></td>
            <td>0</td>
            <td>{t('props.top.description')}</td>
          </tr>
          <tr>
            <td><code>left</code></td>
            <td><code>number</code></td>
            <td>0</td>
            <td>{t('props.left.description')}</td>
          </tr>
        </tbody>
      </table>

      <h2>{t('props.feature')}</h2>
      <table>
        <thead>
          <tr>
            <th>{t('props.prop')}</th>
            <th>{t('props.type')}</th>
            <th>{t('props.default')}</th>
            <th>{t('props.description')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>rotatable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>{t('props.rotatable.description')}</td>
          </tr>
          <tr>
            <td><code>rotation</code></td>
            <td><code>number</code></td>
            <td>0</td>
            <td>{t('props.rotation.description')}</td>
          </tr>
          <tr>
            <td><code>scalable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>{t('props.scalable.description')}</td>
          </tr>
          <tr>
            <td><code>resizable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>{t('props.resizable.description')}</td>
          </tr>
          <tr>
            <td><code>connectable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>{t('props.connectable.description')}</td>
          </tr>
          <tr>
            <td><code>showGuides</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>{t('props.showGuides.description')}</td>
          </tr>
          <tr>
            <td><code>snapToElements</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>{t('props.snapToElements.description')}</td>
          </tr>
          <tr>
            <td><code>snapThreshold</code></td>
            <td><code>number</code></td>
            <td>5</td>
            <td>{t('props.snapThreshold.description')}</td>
          </tr>
        </tbody>
      </table>

      <h2>{t('props.constraint')}</h2>
      <table>
        <thead>
          <tr>
            <th>{t('props.prop')}</th>
            <th>{t('props.type')}</th>
            <th>{t('props.default')}</th>
            <th>{t('props.description')}</th>
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
            <td>{t('props.limit.description')}</td>
          </tr>
          <tr>
            <td><code>minScale</code></td>
            <td><code>number</code></td>
            <td>0.5</td>
            <td>{t('props.minScale.description')}</td>
          </tr>
          <tr>
            <td><code>maxScale</code></td>
            <td><code>number</code></td>
            <td>2</td>
            <td>{t('props.maxScale.description')}</td>
          </tr>
        </tbody>
      </table>

      <h2>{t('props.event')}</h2>
      <table>
        <thead>
          <tr>
            <th>{t('props.prop')}</th>
            <th>{t('props.type')}</th>
            <th>{t('props.description')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>onBlur</code></td>
            <td><code>() =&gt; void</code></td>
            <td>{t('props.onBlur.description')}</td>
          </tr>
          <tr>
            <td><code>onClick</code></td>
            <td><code>() =&gt; void</code></td>
            <td>{t('props.onClick.description')}</td>
          </tr>
          <tr>
            <td><code>onDragStart</code></td>
            <td><code>() =&gt; void</code></td>
            <td>{t('props.onDragStart.description')}</td>
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
            <td>{t('props.onDrag.description')}</td>
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
            <td>{t('props.onDragEnd.description')}</td>
          </tr>
          <tr>
            <td><code>onRotate</code></td>
            <td><code>(rotation: number) =&gt; void</code></td>
            <td>{t('props.onRotate.description')}</td>
          </tr>
          <tr>
            <td><code>onScale</code></td>
            <td><code>(scale: number) =&gt; void</code></td>
            <td>{t('props.onScale.description')}</td>
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
            <td>{t('props.onResize.description')}</td>
          </tr>
          <tr>
            <td><code>onConnect</code></td>
            <td><code>(connection: Connection) =&gt; void</code></td>
            <td>{t('props.onConnect.description')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
