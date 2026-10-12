import { Routes,Route } from 'react-router'
import { HomePage } from './Pages/Homepage'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='checkout' element={<div>this is checkout page</div>} />
    </Routes>
    
  )
}

export default App
