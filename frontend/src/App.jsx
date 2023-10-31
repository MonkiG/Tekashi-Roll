// import Login from './componentes/Auth/Login'
import AuthHome from './componentes/Auth/AuthHome'
import Home from './componentes/HomeComponents/Home'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider'

function App () {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth/login' element={<AuthHome typeForm={'login'} initialFormData={{
          mail: '',
          password: ''
        }}/>
        }/>
        <Route path='/auth/signup' element={<AuthHome typeForm={'register'} initialFormData={{
          mail: '',
          password: '',
          name: '',
          lastName: '',
          phone: ''
        }}/>}/>
      </Routes>
    </AuthProvider>
  )
}

export default App
