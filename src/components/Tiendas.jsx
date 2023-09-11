import DataTable from './DataTable'
import AddRegister from './AddRegister'
import { useEffect, useState } from 'react'

const Tiendas = () => {

    const [pagSelected, setPagSelected] = useState("datos")
    const [editar, setEditar] = useState()

    useEffect(() => {
      if (editar) {
        setPagSelected("caja")
      }
    }, [editar])

    function handleDatos(){
        setPagSelected("datos")
      }
    
      function handleCerrarCaja(){
        setPagSelected("caja")
      }
    
      return (
        <>
        <header>
          <nav >
            <ul>
                <li onClick={handleDatos}>Datos</li>
                <li onClick={handleCerrarCaja}>Cerrar Caja</li>
            </ul>
          </nav>
        </header>
        {
            pagSelected == "datos"
            ?<DataTable
            setEditar={setEditar}
            />
            :<AddRegister
            editar={editar}
            setEditar={setEditar}
            />
        }
        </>
      )
}

export default Tiendas