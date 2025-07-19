import { Drager } from '@es-space/es-drager-react'

// test
function App() {
  return (
    <div className="w-screen h-screen p-8">
      <Drager
        id="drager1"
        className="w-32 h-32 bg-blue-500 cursor-move flex items-center justify-center text-white"
        draggable={false}
        onDragStart={() => console.log('drag start')}
        onDragEnd={() => console.log('drag end')}
        onDrag={(e) => console.log('dragging:', e.x, e.y)}
        connectable
        onConnect={() => console.log('connect')}
        snapToElements
        snapThreshold={10}
      >
        拖拽我1
      </Drager>
      <Drager
        id="drager2"
        className="w-32 h-32 bg-blue-500 cursor-move flex items-center justify-center text-white"
        onDragStart={() => console.log('drag start')}
        onDragEnd={() => console.log('drag end')}
        onDrag={(e) => console.log('dragging:', e.x, e.y)}
        connectable
        onConnect={() => console.log('connect')}
        snapToElements
        snapThreshold={10}
      >
        拖拽我2
      </Drager>
      <Drager
        id="drager3"
        className="w-32 h-32 bg-blue-500 cursor-move flex items-center justify-center text-white"
        onDragStart={() => console.log('drag start')}
        onDragEnd={() => console.log('drag end')}
        onDrag={(e) => console.log('dragging:', e.x, e.y)}
        showGuides
        connectable
        onConnect={() => console.log('connect')}
      >
        拖拽我3
      </Drager>
    </div>
  )
}

export default App
