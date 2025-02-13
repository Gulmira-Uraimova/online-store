import { ToastContainer } from 'react-toastify'
import './App.css'
import Header from './components/header/Header'
import RoutesApp from './routes/Routes'

function App() {

  return (
    <>
      < Header/>
      <RoutesApp />
      <ToastContainer />
    </>
  )
}

export default App
