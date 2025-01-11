import type { AnchorPosition, AnchorProps } from '../types'

export const Anchor: React.FC<AnchorProps> = ({ position, onDragStart }) => {
  return (
    <div
      className="anchor"
      data-position={position}
      style={{
        position: 'absolute',
        width: '8px',
        height: '8px',
        backgroundColor: '#3b82f6',
        borderRadius: '50%',
        cursor: 'crosshair',
        ...getAnchorStyle(position),
      }}
      onMouseDown={() => onDragStart(position)}
    />
  )
}

function getAnchorStyle(position: AnchorPosition) {
  const styles = {
    top: { top: '-4px', left: '50%', transform: 'translateX(-50%)' },
    right: { right: '-4px', top: '50%', transform: 'translateY(-50%)' },
    bottom: { bottom: '-4px', left: '50%', transform: 'translateX(-50%)' },
    left: { left: '-4px', top: '50%', transform: 'translateY(-50%)' },
  }
  return styles[position]
}
