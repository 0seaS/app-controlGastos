import { useEffect, useState } from "react"
import useFetch from "../Hooks/useFetch.js"
import DataCard from "./DataCard.jsx"
import "./styles/DataTable.css"

const DataTable = ({setEditar}) => {

    const {dataApi, getData, startDB} = useFetch()
    const [selectSucursal, setSelectSucursal] = useState("Todos")
    const [showData, setShowData] = useState()
    const [totalCajas, setTotalCajas] = useState(0)
    const [totalGastos, setTotalGastos] = useState(0)

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

    useEffect(() => {
        setTotalCajas(showData?.reduce((acc, cur) => acc + Number(cur.caja), 0))
        setTotalGastos(showData?.reduce((acc, cur) => acc + cur.gastos.reduce((acc, cur) => acc + cur.precio, 0), 0))
    }, [showData])



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
                <div className="gastos__card-container-title">
                    <div className="general__data">
                        <div className="general__data-element"><span>Fecha: </span></div>
                        <div className="general__data-element"><span>Ventas: </span></div>
                        <div className="general__data-element"><span>Caja: </span></div>
                    </div>
                </div>
                
                {
                    showData?.map(register => (
                        <DataCard
                            key={register.id}
                            bodyData={register}
                            setEditar={setEditar}
                        />
                    ))
                }
                <div className="total__cajas">Total Gastos: {totalGastos}</div>
                <div className="total__cajas">Total en Caja: {totalCajas}</div>
            </div>
        </section>
    </article>
  )
}

export default DataTable