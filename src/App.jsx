
import Header from './components/Header'
import Tiendas from './components/Tiendas'
import './App.css'
import { useState } from 'react'
import Mercaderia from './components/Mercaderia'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {


  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/externas' element={<Mercaderia/>}></Route>
        <Route path='/tienda/:id' element={<Tiendas/>}></Route>
      </Routes>
    </>
  )
}

export default App
