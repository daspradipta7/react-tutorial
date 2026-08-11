import './App.css'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-wrap items-center justify-center">
      <div className="w-full-block">
        <Header />
          <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App
