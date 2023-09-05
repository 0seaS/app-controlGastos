
import Header from './components/Header'
import DataTable from './components/DataTable'
import AddRegister from './components/AddRegister'

import './App.css'
import { useState } from 'react'

function App() {

  const [pagSelected, setPagSelected] = useState("datos")

  return (
    <>
      <Header
      setPagSelected={setPagSelected}
      />
      {
        pagSelected == "datos"
        ?<DataTable/>
        :<AddRegister/>
      }
    </>
  )
}

export default App
