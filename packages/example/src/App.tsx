import { Drager } from 'react-drager'

function App() {
  return (
    <div className="w-screen h-screen">
      <Drager
        className="w-32 h-32 bg-blue-500 cursor-move"
        onDragStart={() => console.log('drag start')}
        onDragEnd={() => console.log('drag end')}
        onDrag={(e) => console.log('dragging:', e.x, e.y)}
      >
        <div>拖我</div>
      </Drager>
    </div>
  )
}

export default App
