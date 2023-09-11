
import Header from './components/Header'
import Tiendas from './components/Tiendas'
import './App.css'
import { useState } from 'react'
import Mercaderia from './components/Mercaderia'

function App() {

  const [pagSelected, setPagSelected] = useState("cajas")

  return (
    <>
      <Header
      setPagSelected={setPagSelected}
      />
      {
        pagSelected == "cajas"
        ?<Tiendas/>
        :<Mercaderia/>
      }
    </>
  )
}

export default App
