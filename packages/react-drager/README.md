<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/WechatIMG406.lvt50q97w.webp" width="200" />
</p>

<h1 align="center">ES Drager</h1>

<p align="center">
  A lightweight React component for creating draggable, rotatable and scalable elements with connection capabilities.
</p>

## ✨ Features

- 🎯 Drag & drop with constraints
- 🔄 Rotation support
- ⚖️ Scale with mouse wheel
- 📏 Resize handles for manual resizing
- 🔗 Connection points with bezier curves
- 📏 Snap to grid & alignment guides
- 🎮 Rich interaction events
- 🔒 Position limits and constraints
- 🎯 Precise anchor point connections
- 🎨 Customizable styles and states
- 🔄 State management support

## 📦 Installation

```bash
# npm
npm install @es-space/es-drager-react

# yarn
yarn add @es-space/es-drager-react

# pnpm
pnpm add @es-space/es-drager-react
```

## 🚀 Usage

```tsx
import { Drager } from '@es-space/es-drager-react'

function App() {
  const [selected, setSelected] = useState(false)

  return (
    <Drager
      className="drager-element"
      selected={selected}
      rotatable
      scalable
      resizable
      onClick={() => setSelected(true)}
      onBlur={() => setSelected(false)}
      onDrag={pos => console.log('dragging:', pos)}
      onResize={size => console.log('resized:', size)}
    >
      Drag me!
    </Drager>
  )
}
```

## 📝 Props

### Basic Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | - | Unique identifier for the drager |
| className | string | - | CSS class names |
| style | CSSProperties | - | Inline styles |
| selected | boolean | false | Whether the element is selected |
| disabled | boolean | false | Whether the element is disabled |
| draggable | boolean | true | Whether the element can be dragged |

### Dimension Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| width | number | - | Width of the element |
| height | number | - | Height of the element |
| top | number | 0 | Top position |
| left | number | 0 | Left position |
| minWidth | number | 20 | Minimum width |
| minHeight | number | 20 | Minimum height |
| maxWidth | number | - | Maximum width |
| maxHeight | number | - | Maximum height |

### Feature Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| rotatable | boolean | false | Enable rotation |
| scalable | boolean | false | Enable scaling |
| resizable | boolean | false | Enable manual resizing |
| connectable | boolean | false | Enable connection points |
| showGuides | boolean | false | Show alignment guides |
| snapToElements | boolean | false | Enable snapping to other elements |
| snapThreshold | number | 5 | Snapping threshold in pixels |
| rotation | number | 0 | Initial rotation angle |

### Constraint Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| limit | { minX?: number; maxX?: number; minY?: number; maxY?: number } | - | Movement constraints |
| minScale | number | 0.5 | Minimum scale value |
| maxScale | number | 2 | Maximum scale value |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| onClick | () => void | Called when element is clicked |
| onBlur | () => void | Called when element loses focus |
| onDragStart | () => void | Called when dragging starts |
| onDrag | (position: { x: number; y: number }) => void | Called while dragging |
| onDragEnd | (position: { x: number; y: number }) => void | Called when dragging ends |
| onRotate | (rotation: number) => void | Called when rotation changes |
| onScale | (scale: number) => void | Called when scale changes |
| onResize | (size: { width: number; height: number }) => void | Called when size changes |
| onConnect | (connection: Connection) => void | Called when connection is made |

## 🌰 Examples

### Basic Usage with State

```tsx
function App() {
  const [selected, setSelected] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <Drager
      className="drager-element"
      selected={selected}
      disabled={disabled}
      onClick={() => setSelected(true)}
      onBlur={() => {
        setSelected(false)
        setDisabled(false)
      }}
    >
      Click to select
    </Drager>
  )
}
```

### With Size Constraints

```tsx
<Drager
  className="drager-element"
  width={200}
  height={150}
  minWidth={100}
  minHeight={100}
  maxWidth={300}
  maxHeight={250}
  resizable
>
  Resizable with constraints
</Drager>
```

### With Rotation and Scaling

```tsx
<Drager
  className="drager-element"
  rotatable
  scalable
  rotation={45}
  minScale={0.5}
  maxScale={2}
  onRotate={angle => console.log('rotated to:', angle)}
  onScale={scale => console.log('scaled to:', scale)}
>
  Rotatable and scalable
</Drager>
```

### With Connections

```tsx
<Drager
  id="drager1"
  className="drager-element"
  connectable
  onConnect={(connection) => {
    console.log('Connected:', connection)
  }}
>
  Connectable element
</Drager>
```

### With Position Limits

```tsx
<Drager
  className="drager-element"
  limit={{ minX: 0, maxX: 500, minY: 0, maxY: 500 }}
  showGuides
  snapToElements
  snapThreshold={10}
>
  Element with movement constraints
</Drager>
```

## 🔨 Development

```bash
# Install dependencies
bun install

# Start development
bun dev

# Build package
bun build
```

## 📄 License

ES Drager is open source software licensed as [MIT](https://github.com/ES-Space/es-drager-react/blob/main/LICENSE).
