// import Login from './componentes/Auth/Login'
import Login from './componentes/Auth/Login'
import Register from './componentes/Auth/Register'
import Home from './componentes/HomeComponents/Home'
import { Routes, Route } from 'react-router-dom'

function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/signup' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
