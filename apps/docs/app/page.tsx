import { Header } from './components/Header'
import { Canvas } from './components/Canvas'

export default function Page() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Canvas />
    </div>
  )
}
