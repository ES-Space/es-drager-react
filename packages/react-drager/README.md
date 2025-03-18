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
- 🎨 Tailwind CSS styling
- 🎮 Rich interaction events
- 🔒 Position limits and constraints
- 🎯 Precise anchor point connections

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
  return (
    <Drager
      className="w-32 h-32 bg-blue-500"
      rotatable
      scalable
      onDrag={pos => console.log(pos)}
    >
      Drag me!
    </Drager>
  )
}
```

## 📝 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | auto-generated | Unique identifier for the drager |
| className | string | - | CSS class names |
| style | CSSProperties | - | Inline styles |
| rotatable | boolean | false | Enable rotation |
| scalable | boolean | false | Enable scaling |
| resizable | boolean | false | Enable manual resizing with handles |
| minScale | number | 0.5 | Minimum scale value |
| maxScale | number | 2 | Maximum scale value |
| showGuides | boolean | false | Show alignment guides |
| snapToElements | boolean | false | Enable snapping to other elements |
| snapThreshold | number | 5 | Snapping threshold in pixels |
| connectable | boolean | false | Enable connection points |
| limit | { minX?: number; maxX?: number; minY?: number; maxY?: number } | - | Movement constraints |
| rotation | number | 0 | Initial rotation angle |
| onDragStart | function | - | Drag start event handler |
| onDrag | function | - | Drag event handler |
| onDragEnd | function | - | Drag end event handler |
| onRotate | function | - | Rotation event handler |
| onScale | function | - | Scale event handler |
| onConnect | function | - | Connection event handler |

## 🌰 Examples

### Basic Dragging

```tsx
<Drager className="w-32 h-32 bg-blue-500">
  Basic draggable element
</Drager>
```

### With Rotation

```tsx
<Drager
  className="w-32 h-32 bg-blue-500"
  rotatable
>
  Rotatable element
</Drager>
```

### With Scaling

```tsx
<Drager
  className="w-32 h-32 bg-blue-500"
  scalable
  minScale={0.5}
  maxScale={2}
>
  Scalable element
</Drager>
```

### With Connections

```tsx
<Drager
  id="drager1"
  className="w-32 h-32 bg-blue-500"
  connectable
  onConnect={(sourceId, sourceAnchor, targetId, targetAnchor) => {
    console.log('Connected:', { sourceId, sourceAnchor, targetId, targetAnchor })
  }}
>
  Connectable element
</Drager>
```

### With Resizing

```tsx
<Drager
  className="w-32 h-32 bg-blue-500"
  resizable
>
  Resizable element
</Drager>
```

### With Position Limits

```tsx
<Drager
  className="w-32 h-32 bg-blue-500"
  limit={{ minX: 0, maxX: 500, minY: 0, maxY: 500 }}
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
