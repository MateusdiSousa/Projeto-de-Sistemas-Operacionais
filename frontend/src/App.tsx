import './App.css'
import { Navbar } from './components/navbar'
import Rotas from './routes/routes'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <div className='p-16'>
        <Rotas />
      </div>
    </Router>
  )
}

export default App
