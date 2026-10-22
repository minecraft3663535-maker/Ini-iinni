import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BackgroundVideo from './components/BackgroundVideo'

export default function App() {
  return (
    <div className="relative min-h-screen bg-black" style={{ fontFamily: 'var(--font-body)' }}>
      <BackgroundVideo />
      <Navbar />
      <Hero />
    </div>
  )
}
