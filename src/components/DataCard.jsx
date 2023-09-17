import BodyCard from "./BodyCard"
import util from "../assets/util/util.js"
import "./styles/DataCard.css"
import { useState } from "react"
import useFetch from "../Hooks/useFetch"

const DataCard = ({bodyData, setEditar}) => {

    const {deleteData} = useFetch()

    const [showGasto, setShowGasto] = useState(true)

    const {sumDat} = util()
    let totalGastos =  bodyData?.gastos <1 ? sumDat(bodyData?.gastos) : 0
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
                <div className="general__data-element"><span>{bodyData?.fecha}</span></div>
                <div className="general__data-element"><span>{bodyData?.sucursal}</span></div>
                <div className="general__data-element"><span>{bodyData?.caja} Bs.</span></div>
            </div>
            <div className={`gastos__card ${showGasto ? 'switchShow': ''}`}>
                <h5><span>Total Ventas del dia: </span><span>{Number(bodyData?.caja) + totalGastos} Bs</span></h5>
                <h4 className="gastos__card-title">Gastos</h4>
                <div>
                    {
                        aux.length<1
                        ? aux.map((register, ind) => (
                            <BodyCard
                                key={ind}
                                data={register}
                            />
                        ))
                        
                        :<span>sin gastos</span>
                    }
                </div>
                <hr />
                <div className="totales"><span>Total gastos: </span><span>{totalGastos} Bs</span></div>
                <div className="btn__container"><button className="btn btn__delete" onClick={(e) => handleDelete(bodyData?.id, e)}>Eliminar</button></div>
                <div className="btn__container"><button className="btn btn__edit" onClick={(e) => handleEdit(bodyData?.id, e)}>Editar</button></div>
            </div>
        </div>
    </>
  )
}

export default DataCard