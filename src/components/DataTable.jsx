import { useEffect, useState } from "react"
import useFetch from "../Hooks/useFetch.js"
import DataCard from "./DataCard.jsx"
import "./styles/DataTable.css"

const DataTable = ({setEditar}) => {

    const {dataApi, getData, startDB} = useFetch()
    const [selectSucursal, setSelectSucursal] = useState("Todos")
    const [showData, setShowData] = useState()

    useEffect(() => {
        startDB()
        getData()
    }, [])

    useEffect(() => {
        let show

        if (selectSucursal === "Villa") {
            show = dataApi.filter(data => data.sucursal == "villa").sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
            setShowData(show)
        }
        else if(selectSucursal === "Chimore") {
            show = dataApi.filter(data => data.sucursal == "chimore").sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
            setShowData(show)
        }
        else if(selectSucursal === "Sacaba") {
            show = dataApi.filter(data => data.sucursal == "sacaba").sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
            setShowData(show)
        }
        else{
            setShowData(dataApi?.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()))
        }
        

        
    }, [dataApi, selectSucursal])

    function handleSacaba(){
        setSelectSucursal("Sacaba")
    }
    function handleVilla(){
        setSelectSucursal("Villa")
    }
    function handleChimore(){
        setSelectSucursal("Chimore")
    }

  return (
    <article className="data__container">
        <div className="btn__select-container"><button className="btn__select" onClick={handleSacaba}>Sacaba</button><button className="btn__select" onClick={handleVilla}>Villa Tunari</button><button className="btn__select" onClick={handleChimore}>Chimore</button></div>
        
        <header>
            <h2>Cuentas de {selectSucursal}</h2>
        </header>
        <section>
            <div>
                {
                    showData?.map(register => (
                        <DataCard
                            key={register.id}
                            bodyData={register}
                            setEditar={setEditar}
                        />
                    ))
                }
            </div>
            <span></span>
        </section>
    </article>
  )
}

export default DataTable