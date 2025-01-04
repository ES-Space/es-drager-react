import { Canvas } from './components/Canvas'
import { Header } from './components/Header'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div className="flex-1">
        <Canvas />
      </div>
    </div>
  )
}
