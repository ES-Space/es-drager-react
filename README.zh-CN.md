<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/huccct/picx-images-hosting@master/WechatIMG406.lvt50q97w.webp" width="200" />
</p>

<h1 align="center">ES Drager</h1>

<p align="center">
  一个轻量级的 React 组件，用于创建可拖拽、旋转和缩放的元素，并支持连接功能。
</p>

<p align="center">
  <a href="README.md">English</a> | <a href="README.zh-CN.md">简体中文</a>
</p>

## ✨ 特性

- 🎯 支持约束的拖拽功能
- 🔄 支持旋转
- ⚖️ 支持鼠标滚轮缩放
- 📏 手动调整大小的控制点
- 🔗 带贝塞尔曲线的连接点
- 📏 网格对齐和对齐参考线
- 🎮 丰富的交互事件
- 🔒 位置限制和约束
- 🎯 精确的锚点连接
- 🎨 可自定义样式和状态
- 🔄 状态管理支持

## 📦 安装

```bash
# npm
npm install @es-space/es-drager-react

# yarn
yarn add @es-space/es-drager-react

# pnpm
pnpm add @es-space/es-drager-react
```

## 🚀 使用

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
      onDrag={pos => console.log('拖拽中:', pos)}
      onResize={size => console.log('调整大小:', size)}
    >
      拖拽我！
    </Drager>
  )
}
```

## 📝 属性

### 基础属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|---------|-------------|
| id | string | - | 元素的唯一标识符 |
| className | string | - | CSS 类名 |
| style | CSSProperties | - | 内联样式，用于设置尺寸和外观 |
| selected | boolean | false | 元素是否被选中 |
| disabled | boolean | false | 元素是否禁用 |
| draggable | boolean | true | 元素是否可拖拽 |

### 位置属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|---------|-------------|
| top | number | 0 | 顶部位置 |
| left | number | 0 | 左侧位置 |

### 功能属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|---------|-------------|
| rotatable | boolean | false | 启用旋转 |
| scalable | boolean | false | 启用缩放 |
| resizable | boolean | false | 启用手动调整大小 |
| connectable | boolean | false | 启用连接点 |
| showGuides | boolean | false | 显示对齐参考线 |
| snapToElements | boolean | false | 启用对其他元素的对齐吸附 |
| snapThreshold | number | 5 | 吸附阈值（像素） |
| rotation | number | 0 | 初始旋转角度 |

### 约束属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|---------|-------------|
| limit | { minX?: number; maxX?: number; minY?: number; maxY?: number } | - | 移动约束 |
| minScale | number | 0.5 | 最小缩放值 |
| maxScale | number | 2 | 最大缩放值 |

### 事件属性

| 属性 | 类型 | 描述 |
|------|------|-------------|
| onClick | () => void | 元素被点击时触发 |
| onBlur | () => void | 元素失去焦点时触发 |
| onDragStart | () => void | 开始拖拽时触发 |
| onDrag | (position: { x: number; y: number }) => void | 拖拽过程中触发 |
| onDragEnd | (position: { x: number; y: number }) => void | 拖拽结束时触发 |
| onRotate | (rotation: number) => void | 旋转时触发 |
| onScale | (scale: number) => void | 缩放时触发 |
| onResize | (size: { width: number; height: number }) => void | 大小改变时触发 |
| onConnect | (connection: Connection) => void | 建立连接时触发 |

## 🌰 示例

### 基础用法与状态

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
      点击选中
    </Drager>
  )
}
```

### 带尺寸约束

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
  可调整大小（带约束）
</Drager>
```

### 带旋转和缩放

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
  onRotate={angle => console.log('旋转到:', angle)}
  onScale={scale => console.log('缩放到:', scale)}
>
  可旋转和缩放
</Drager>
```

### 带连接功能

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
    console.log('已连接:', connection)
  }}
>
  可连接元素
</Drager>
```

### 带位置限制

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
  带移动约束的元素
</Drager>
```

## 🔨 开发

```bash
# 安装依赖
bun install

# 启动开发
bun dev

# 构建包
bun build
```

## 📄 许可证

ES Drager 是基于 [MIT](https://github.com/ES-Space/es-drager-react/blob/main/LICENSE) 许可的开源软件。
