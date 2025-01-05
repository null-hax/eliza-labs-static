import { FC } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { MainContent } from './components/MainContent/MainContent'

const App: FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col lg:flex-row bg-[#ff6a1a]">
      <Navbar />
      <MainContent />
    </div>
  )
}

export default App
