import { useState } from 'react'
import './App.css'
import Rotas from './routes/routes'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Rotas/>
    </Router>
  )
}

export default App
