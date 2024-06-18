import './App.css'
import { Navbar } from './components/navbar'
import { AuthProvider } from './context/auth'
import Rotas from './routes/routes'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className='p-16'>
          <Rotas />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
