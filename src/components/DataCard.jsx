import BodyCard from "./BodyCard"
import util from "../assets/util/util.js"
import "./styles/DataCard.css"
import { useState } from "react"

const DataCard = ({bodyData}) => {

    const [showGasto, setShowGasto] = useState(true)

    const {sumDat} = util()
    let totalGastos =  sumDat(bodyData?.gastos)
    let aux = bodyData?.gastos

    function handleShowGasto(){
        setShowGasto(!showGasto)
    }

  return (
    <>
        <div className="gastos__card-container" onClick={handleShowGasto}>
            <div className="general__data">
                <div className="general__data-element"><span>Fecha: </span>{bodyData?.fecha}<span></span></div>
                <div className="general__data-element"><span>Sucursal: </span>{bodyData?.sucursal}<span></span></div>
                <div className="general__data-element"><span>Caja: </span>{bodyData?.caja} Bs.<span></span></div>
            </div>
            <div className={`gastos__card ${showGasto ? 'switchShow': ''}`}>
                <h5><span>Total Ventas del dia: </span><span>{Number(bodyData?.caja) + totalGastos} Bs</span></h5>
                <h4 className="gastos__card-title">Gastos</h4>
                <div>
                    {
                        aux.map((register, ind) => (
                            <BodyCard
                                key={ind}
                                data={register}
                            />
                        ))
                    }
                </div>
                <hr />
                <div><span>Total gastos: </span><span>{totalGastos} Bs</span></div>
            </div>
        </div>
    </>
  )
}

export default DataCard