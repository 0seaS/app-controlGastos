import { useEffect, useState } from "react"
import ShowMercProductos from "./ShowMercProductos"
import ShowMercPagos from "./ShowMercPagos"
import useFetchMerc from "../Hooks/useFetchMerc"
import "./styles/ShowMercCard.css"


const ShowMercCard = ({data, setEditar}) => {

    const [totalCompra, setTotalCompra] = useState(0)
    const [totalPagado, setTotalPagado] = useState(0)
    const [showData, setshowData] = useState(false)
    const {deleteData} = useFetchMerc()

    useEffect(() => {
        setTotalCompra(data?.productos.reduce((acc, cur) => acc + Number((Number(cur.cantidad)*Number(cur.precio)).toFixed(2)), 0))
        setTotalPagado(data?.pagos.reduce((acc, cur) => acc + Number(cur.monto), 0))
    }, [])

    function handleShowData(){
        setshowData(!showData)
    }

    function handleDelete(id, e){
        e.stopPropagation()
        let deleteRegister = confirm("Esta seguro de ELIMINAR el registro?")
        if (deleteRegister) {
            deleteData(id)
        }
    }

    function handleEdit(id, e){
        e.stopPropagation()
        setEditar(data)
    }
    
  return (
    <>
    <div className="gastos__card-container" onClick={handleShowData}>
        <div className="general__data-element"><span>{data?.fecha}</span></div>
        <div className="data__table-title">           
            <div className="general__data-element"><span>Despacho: </span></div>
            <div className="general__data-element"><span>Total: </span></div>
            <div className="general__data-element"><span>Saldo: </span></div>
        </div>
        <div className="general__data">
            <div className="general__data-element"><span>{data?.lugarDespacho}</span></div>
            <div className="general__data-element"><span>{totalCompra.toFixed(2)} Bs.</span></div>
            <div className="general__data-element"><span>{totalCompra > totalPagado ? (totalCompra - totalPagado).toFixed(2) + " Bs." : "Pagado"}</span></div>
        </div>
        {
            showData
            ? <div>
                <hr />
                <div className="data__table-title"><span>Productos</span></div>
                <div className="data__table-title">           
                    <div className="general__data-element"><span>Nombre </span></div>
                    <div className="general__data-element"><span>Cantidad </span></div>
                    <div className="general__data-element"><span>Precio U. </span></div>
                    <div className="general__data-element"><span>Precio </span></div>
                </div>
                {
                    
                    data.productos.length >= 1
                    ? data.productos.map((register, ind) => (
                        <ShowMercProductos
                            key={ind}
                            data={register}
                        />
                    ))
                    
                    : <span>Sin Productos</span>
                }
                <hr />
                <div className="totales__merc"><span>Total: {totalCompra} Bs</span></div>
                <hr />
                <div className="data__table-title"><span>Pagos</span></div>
                <div className="data__table-title">           
                    <div className="general__data-element"><span>Fecha </span></div>
                    <div className="general__data-element"><span>Monto </span></div>
                </div>
                {
                    data.pagos.length >= 1
                    ? data.pagos.map((register, ind) => (
                        <ShowMercPagos
                            key={ind}
                            data={register}
                        />
                    ))
                    
                    : <span>Sin Pagos</span>
                }
                <hr />
                <div className="totales__merc"><span>Total Pagos: {totalPagado} Bs</span></div>
                <div className="btn__container"><button className="btn btn__delete" onClick={(e) => handleDelete(data?.id, e)}>Eliminar</button></div>
                <div className="btn__container"><button className="btn btn__edit" onClick={(e) => handleEdit(data?.id, e)}>Editar</button></div>
            </div>
            : <></>
            
        }
    </div>
    </>
  )
}

export default ShowMercCard