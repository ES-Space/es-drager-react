import { Canvas } from './components/Canvas'
import { Header } from './components/Header'

export default function Page() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Canvas />
    </div>
  )
}
