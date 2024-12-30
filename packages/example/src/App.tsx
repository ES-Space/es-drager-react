import { Drager } from 'react-drager'

function App() {
  return (
    <div className="w-screen h-screen p-8">
      <Drager
        className="w-32 h-32 bg-blue-500 cursor-move flex items-center justify-center text-white"
        onDragStart={() => console.log('drag start')}
        onDragEnd={() => console.log('drag end')}
        onDrag={(e) => console.log('dragging:', e.x, e.y)}
      >
        拖拽我
      </Drager>
    </div>
  )
}

export default App
