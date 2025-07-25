<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/WechatIMG406.lvt50q97w.webp" width="200" />
</p>

<h1 align="center">ES Drager</h1>

<p align="center">
  A lightweight React component for creating draggable, rotatable and scalable elements with connection capabilities.
</p>

<p align="center">
  <a href="README.md">English</a> | <a href="README.zh-CN.md">简体中文</a>
</p>

<p align="center">
  <a href="https://discord.gg/pg82AQjN">
    <img src="https://img.shields.io/discord/1398256764654321746?color=7289da&logo=discord&logoColor=white" alt="Discord" />
  </a>
  <a href="https://www.npmjs.com/package/@es-space/es-drager-react">
    <img src="https://img.shields.io/npm/v/@es-space/es-drager-react.svg" alt="npm version" />
  </a>
  <a href="https://github.com/ES-Space/es-drager-react/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@es-space/es-drager-react.svg" alt="license" />
  </a>
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
      style={{
        width: '200px',
        height: '150px'
      }}
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
| style | CSSProperties | - | Inline styles for dimensions and appearance |
| selected | boolean | false | Whether the element is selected |
| disabled | boolean | false | Whether the element is disabled |
| draggable | boolean | true | Whether the element can be dragged |

### Position Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| top | number | 0 | Top position |
| left | number | 0 | Left position |

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
      style={{
        width: '200px',
        height: '150px'
      }}
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
  style={{
    width: '200px',
    height: '150px',
    minWidth: '100px',
    minHeight: '100px',
    maxWidth: '300px',
    maxHeight: '250px'
  }}
  resizable
>
  Resizable with constraints
</Drager>
```

### With Rotation and Scaling

```tsx
<Drager
  className="drager-element"
  style={{
    width: '200px',
    height: '150px'
  }}
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
  style={{
    width: '200px',
    height: '150px'
  }}
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
  style={{
    width: '200px',
    height: '150px'
  }}
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

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

Join our [Discord community](https://discord.gg/pg82AQjN) to discuss ideas and get help.

## 📄 License

ES Drager is open source software licensed as [MIT](https://github.com/ES-Space/es-drager-react/blob/main/LICENSE).
