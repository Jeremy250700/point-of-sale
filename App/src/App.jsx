import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from './components/Layout'
import Home from './pages/Home'
import History from './pages/History'
import Products from './pages/Products/Products.jsx'

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
