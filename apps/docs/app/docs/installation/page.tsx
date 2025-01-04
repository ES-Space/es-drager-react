'use client'

export default function InstallationPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1>Installation</h1>

      <p>
        ES Drager can be installed via npm, yarn, or pnpm.
      </p>

      <h2>Using npm</h2>
      <pre className="language-bash">
        <code>npm install @es-space/es-drager-react</code>
      </pre>

      <h2>Using yarn</h2>
      <pre className="language-bash">
        <code>yarn add @es-space/es-drager-react</code>
      </pre>

      <h2>Using pnpm</h2>
      <pre className="language-bash">
        <code>pnpm add @es-space/es-drager-react</code>
      </pre>

      <h2>Peer Dependencies</h2>
      <p>
        ES Drager requires React 18 or later as a peer dependency. Make sure you have it installed in your project:
      </p>

      <pre className="language-json">
        <code>
          {`{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}`}
        </code>
      </pre>
    </div>
  )
}
