'use client'

import { Drager } from '@es-space/es-drager-react'
import { useTranslation } from 'react-i18next'
import { InfiniteCanvas } from '../../components/InfiniteCanvas'

export default function ResizePage() {
  const { t } = useTranslation()
  return (
    <div className="prose prose-blue max-w-none">
      <h1>{t('resize.title')}</h1>

      <p>{t('resize.desc')}</p>

      <h2>{t('resize.basic')}</h2>

      <p>{t('resize.basicDesc')}</p>

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

      <h2>{t('resize.handles')}</h2>

      <p>{t('resize.handlesDesc')}</p>

      <ul>
        <li>{t('resize.handlesCorner')}</li>
        <li>{t('resize.handlesEdge')}</li>
      </ul>

      <h2>{t('resize.combining')}</h2>

      <p>{t('resize.combiningDesc')}</p>

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
