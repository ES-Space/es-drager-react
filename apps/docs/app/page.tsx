import { Examples } from './components/Examples'
import { Header } from './components/Header'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div className="flex-1">
        <Examples />
      </div>
    </div>
  )
}
