'use client'

import { Drager } from '@es-space/es-drager-react'
import { useTranslation } from 'react-i18next'
import { CodeBlock } from '../../components/CodeBlock'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export default function ConnectionsPage() {
  const { t } = useTranslation()
  const handleConnect = () => {
    // eslint-disable-next-line no-console
    console.log('connect')
  }

  const basicUsageCode = `<Drager
  id="node-1"
  connectable
  className="w-32 h-32 bg-blue-500"
>
  Source
</Drager>`

  const eventHandlingCode = `const handleConnect = (
  sourceId: string,    // ID of the source node
  sourceAnchor: string,// Position of source anchor ('top', 'right', 'bottom', 'left')
  targetId: string,    // ID of the target node
  targetAnchor: string // Position of target anchor
) => {
  console.log('Connected:', { sourceId, sourceAnchor, targetId, targetAnchor })
}`

  return (
    <div className="prose prose-blue max-w-none">
      <h1>{t('connections.title')}</h1>

      <p>{t('connections.desc')}</p>

      <h2>{t('connections.basic')}</h2>

      <p>{t('connections.basicDesc')}</p>

      <CodeBlock code={basicUsageCode} />

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            id="source"
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '100px', top: '50px' }}
            connectable
          >
            Source
          </Drager>
          <Drager
            id="target"
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '300px', top: '50px' }}
            connectable
          >
            Target
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>{t('connections.tip')}</p>
      </div>

      <h2>{t('connections.connectionEvents')}</h2>

      <p>
        {t('connections.connectionEventsDesc')}
      </p>

      <CodeBlock code={eventHandlingCode} />

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            id="event-source"
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '100px', top: '50px' }}
            connectable
            onConnect={handleConnect}
          >
            {t('connections.connectMe')}
          </Drager>
          <Drager
            id="event-target"
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '300px', top: '50px' }}
            connectable
            onConnect={handleConnect}
          >
            {t('connections.toMe')}
          </Drager>
        </InfiniteCanvas>
      </div>

      <h2>{t('connections.connectionFeatures')}</h2>

      <ul>
        <li>{t('connections.fourAnchors')}</li>
        <li>{t('connections.visualFeedback')}</li>
        <li>{t('connections.automaticBezier')}</li>
        <li>{t('connections.autoUpdate')}</li>
        <li>{t('connections.clickToSelect')}</li>
        <li>{t('connections.deleteConnections')}</li>
      </ul>

      <h2>{t('connections.complexExample')}</h2>

      <p>
        {t('connections.complexExampleDesc')}
      </p>

      <div className="not-prose my-8 h-[400px] rounded-lg border overflow-hidden">
        <InfiniteCanvas>
          <Drager
            id="complex-1"
            className="w-32 h-32 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '100px', top: '50px' }}
            connectable
            rotatable
            scalable
          >
            {t('connections.node1')}
          </Drager>
          <Drager
            id="complex-2"
            className="w-32 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '300px', top: '50px' }}
            connectable
            rotatable
            scalable
          >
            {t('connections.node2')}
          </Drager>
          <Drager
            id="complex-3"
            className="w-32 h-32 bg-purple-500 rounded-lg shadow-lg flex items-center justify-center text-white font-medium"
            style={{ left: '500px', top: '50px' }}
            connectable
            rotatable
            scalable
          >
            {t('connections.node3')}
          </Drager>
        </InfiniteCanvas>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>
          {t('connections.tryConnections')}
        </p>
      </div>
    </div>
  )
}
