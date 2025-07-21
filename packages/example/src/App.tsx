import { Drager } from '@es-space/es-drager-react'
import { useState } from 'react'

function App() {
  const [selected1, setSelected1] = useState(false)
  const [disabled1, setDisabled1] = useState(false)

  return (
    <div>
      {/* test selected, disabled, draggable, style, top/left */}
      <Drager
        id="drager1"
        className="bg-blue-500 flex flex-col items-center justify-center text-white relative border-2 border-blue-500 rounded"
        selected={selected1}
        disabled={disabled1}
        draggable={!disabled1}
        style={{
          width: '200px',
          height: '150px',
          minWidth: '100px',
          minHeight: '100px',
          maxWidth: '300px',
          maxHeight: '250px'
        }}
        top={100}
        left={100}
        onClick={() => setSelected1(true)}
        onBlur={() => {
          setSelected1(false)
          setDisabled1(false)
        }}
        onDragStart={() => console.log('drag start')}
        onDragEnd={(pos: { x: number, y: number }) => console.log('drag end at:', pos)}
        onDrag={(pos) => console.log('dragging:', pos)}
        onResize={(size) => console.log('resizing:', size)}
        connectable
        resizable
        rotatable
      >
        <div className="absolute top-0 left-0 w-full bg-black/50 text-white text-sm px-2 py-1 border-b border-white">
          resizable
        </div>
        <div>Drager 1</div>
      </Drager>

      {/* test snapToElements */}
      <Drager
        id="drager2"
        className="bg-green-500 flex flex-col items-center justify-center text-white relative border-2 border-blue-500 rounded"
        style={{
          width: '150px',
          height: '150px'
        }}
        top={300}
        left={300}
        onDragStart={() => console.log('drag start')}
        onDragEnd={(pos: { x: number, y: number }) => console.log('drag end at:', pos)}
        onDrag={(pos) => console.log('dragging:', pos)}
        connectable
        snapToElements
        snapThreshold={10}
      >
        <div className="absolute top-0 left-0 w-full bg-black/50 text-white text-sm px-2 py-1 border-b border-white">
          snapToElements
        </div>
        <div>Drager 2</div>
      </Drager>

      {/* test showGuides */}
      <Drager
        id="drager3"
        className="bg-purple-500 flex flex-col items-center justify-center text-white relative border-2 border-blue-500 rounded"
        style={{
          width: '120px',
          height: '120px'
        }}
        top={500}
        left={150}
        onDragStart={() => console.log('drag start')}
        onDragEnd={(pos: { x: number, y: number }) => console.log('drag end at:', pos)}
        onDrag={(pos) => console.log('dragging:', pos)}
        showGuides
        connectable
        onConnect={() => console.log('connect')}
      >
        <div className="absolute top-0 left-0 w-full bg-black/50 text-white text-sm px-2 py-1 border-b border-white">
          showGuides
        </div>
        <div>Drager 3</div>
      </Drager>
    </div>
  )
}

export default App
