import { CopyButton } from './CopyButton'

export function Pre({ children, ...props }) {
  const code = props.children.props.raw

  return (
    <div className="relative">
      <pre {...props}>{children}</pre>
      <CopyButton code={code} />
    </div>
  )
}
