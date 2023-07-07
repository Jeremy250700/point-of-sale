import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import History from './pages/History'
import Products from './pages/Products'
export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/history' element={<History />}></Route>
          <Route path='/products' element={<Products />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
