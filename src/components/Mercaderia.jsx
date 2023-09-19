import { useEffect, useState } from "react"
import AddMerc from "./AddMerc"
import ShowMerc from "./ShowMerc"


const Mercaderia = () => {

    const [pagSelected, setPagSelected] = useState("datos")
    const [editar, setEditar] = useState()

    useEffect(() => {
      if (editar) {
        setPagSelected("addMerc")
      }
    }, [editar])
    

    function handleDatos(){
      setPagSelected("datos")
      }
    
      function handleAgregarMerc(){
        setPagSelected("addMerc")
      }
    
      return (
        <>
        <header>
          <nav >
            <ul>
                <li onClick={handleDatos}>Datos</li>
                <li onClick={handleAgregarMerc}>Ingresar Datos</li>
            </ul>
          </nav>
        </header>
        {
            pagSelected == "datos"
            ?<ShowMerc
            setEditar={setEditar}
            />
            :<AddMerc
            editar={editar}
            setEditar={setEditar}
            />
        }
        </>
      )
}

export default Mercaderia