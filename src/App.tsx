import SigninForm from './_auth/Forms/SigninForm'
import SignupForm from './_auth/Forms/SignupForm'
import { Home } from './_root/pages'
import './globals.css'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* public routes */}
            <Route path="/signin" element={<SigninForm/>}/>
            <Route path="/signin" element={<SignupForm/>}/>

            {/* private routes */}
            <Route index element={<Home/>}/>
        </Routes>
    </main>
  )
}

export default App