import BodyCard from "./BodyCard"
import util from "../assets/util/util.js"
import "./styles/DataCard.css"
import { useState } from "react"
import useFetch from "../Hooks/useFetch"

const DataCard = ({bodyData, setEditar}) => {

    const {deleteData} = useFetch()

    const [showGasto, setShowGasto] = useState(true)

    const {sumDat} = util()
    let totalGastos =  sumDat(bodyData?.gastos)
    let aux = bodyData?.gastos

    function handleShowGasto(){
        setShowGasto(!showGasto)
    }

    function handleDelete(id, e){
        e.stopPropagation()
        let deleteRegister = confirm("Esta seguro de ELIMINAR el usuario?")
        if (deleteRegister) {
            deleteData(id)
        }
    }

    function handleEdit(id, e){
        e.stopPropagation()
        console.log(id)
        setEditar(bodyData)
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
                <div><button className="btn__delete" onClick={(e) => handleDelete(bodyData?.id, e)}>Eliminar</button></div>
                <div><button className="btn__edit" onClick={(e) => handleEdit(bodyData?.id, e)}>Editar</button></div>
            </div>
        </div>
    </>
  )
}

export default DataCard