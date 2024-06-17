import React, { useEffect, useState } from 'react'
import useFetchMerc from '../Hooks/useFetchMerc'
import ShowMercCard from './ShowMercCard'
import "./styles/ShowMerc.css"

const ShowMerc = ({setEditar}) => {

    const {data, getData} = useFetchMerc()
    const [selectSucursal, setSelectSucursal] = useState("Externas")
    const [showData, setShowData] = useState()
    const [totalCompras, setTotalCompras] = useState(0)
    const [totalVentas, setTotalVentas] = useState(0)
    const [pagadoCompras, setPagadoCompras] = useState(0)
    const [pagadoVentas, setPagadoVentas] = useState(0)
    const [fromDateValue, setFromDateValue] = useState("2023-08-01")
    const [toDateValue, setToDateValue] = useState(new Date().toISOString().slice(0, 10))
    const [typeMerc, setTypeMerc] = useState("todos")

    useEffect(() => {
      getData()
      setShowData(data)
    }, [])

    useEffect(() => {
      setTotalCompras(showData?.filter(data => data.tipo == 'compra').reduce((acc, cur) => acc + cur.productos.reduce((acc, cur) => acc + Number((cur.cantidad*cur.precio).toFixed(2)), 0), 0))
      setPagadoCompras(showData?.filter(data => data.tipo == 'compra').reduce((acc, cur) => acc + cur.pagos.reduce((acc, cur) => acc + Number(cur.monto), 0), 0))
      setTotalVentas(showData?.filter(data => data.tipo == 'venta').reduce((acc, cur) => acc + cur.productos.reduce((acc, cur) => acc + Number((cur.cantidad*cur.precio).toFixed(2)), 0), 0))
      setPagadoVentas(showData?.filter(data => data.tipo == 'venta').reduce((acc, cur) => acc + cur.pagos.reduce((acc, cur) => acc + Number(cur.monto), 0), 0))
  }, [showData])

    useEffect(() => {
      setEditar(undefined)
      let show

      if (selectSucursal === "Villa") {
          show = data.filter(data1 => data1.sucursal == "villa").sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      }
      else if(selectSucursal === "Chimore") {
          show = data.filter(data1 => data1.sucursal == "chimore").sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      }
      else if(selectSucursal === "Sacaba") {
          show = data.filter(data1 => data1.sucursal == "sacaba").sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      }
      else if(selectSucursal === "Externas"){
          show = data?.filter(data1 => data1.sucursal == "externas").sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      }
      if(typeMerc == "todos"){
        show = show?.filter(data => new Date(data.fecha).getTime() <= new Date(toDateValue).getTime() && new Date(data.fecha).getTime() >= new Date(fromDateValue).getTime())
      }else {
        show = show?.filter(data => new Date(data.fecha).getTime() <= new Date(toDateValue).getTime() && new Date(data.fecha).getTime() >= new Date(fromDateValue).getTime() && data.tipo == typeMerc)
      }
      setShowData(show)
  }, [data, selectSucursal, toDateValue, fromDateValue, typeMerc])

    function handleSacaba(){
      setSelectSucursal("Sacaba")
    }

    function handleVilla(){
      setSelectSucursal("Villa")
    }

    function handleChimore(){
      setSelectSucursal("Chimore")
    }

    function handleExternas(){
      setSelectSucursal("Externas")
    }

    function setDatesValues(){
      setToDateValue(document.getElementById("toDate").value)
      setFromDateValue(document.getElementById("fromDate").value)
    }

    function handleBtnTodos(){
      setTypeMerc("todos")
    }
    function handleBtnCompras(){
      setTypeMerc("compra")
    }
    function handleBtnVentas(){
      setTypeMerc("venta")
    }

  return (
    <article className="data__container">
      <header className='title-container'>
        <h2>EXTERNAS <i className='bx bxs-truck'></i></h2>
      </header>
        {/*<div className="btn__select-container"><button className="btn__select" onClick={handleSacaba}>Sacaba</button><button className="btn__select" onClick={handleVilla}>Villa Tunari</button><button className="btn__select" onClick={handleChimore}>Chimore</button><button className="btn__select" onClick={handleExternas}>Externas</button></div>*/}
        <div className="filterDate"><span>Desde: </span><input type="date" id="fromDate" value={fromDateValue} onChange={setDatesValues}/> </div>
        <div className="filterDate"><span>Hasta: </span><input type="date" id="toDate" value={toDateValue} onChange={setDatesValues}/></div>
        <div className='buttons-container'><button className='btn__select' onClick={handleBtnTodos}>Todos</button><button className='btn__select' onClick={handleBtnCompras}>Compras</button><button className='btn__select' onClick={handleBtnVentas}>Ventas</button></div>
        <section>
            <div>
                {
                    showData?.map(register => (
                        <ShowMercCard
                            key={register.id}
                            data={register}
                            setEditar={setEditar}
                        />
                    ))
                }
            </div>
            <span></span>
        </section>
        {typeMerc == 'todos' ?
        <>
        <div className="total__cajas minus">Total Compras: {totalCompras?.toFixed(2)} Bs.</div>
        <div className="total__cajas">Total Ventas: {totalVentas?.toFixed(2)} Bs.</div>
        <div className="total__cajas plus big">Ganancia: {(totalVentas-totalCompras)?.toFixed(2)} Bs.</div>
        </>
         : 
         typeMerc == 'venta' ?
        <>
        <div className="total__cajas">Pagado: {pagadoVentas?.toFixed(2)} Bs.</div>
        <div className="total__cajas">Saldo: {(totalVentas - pagadoVentas)?.toFixed(2)} Bs.</div>
        <div className="total__cajas">Total Ventas: {totalVentas?.toFixed(2)} Bs.</div>
        </>
         :
        <>
        <div className="total__cajas">Pagado: {pagadoCompras?.toFixed(2)} Bs.</div>
        <div className="total__cajas">Saldo: {(totalCompras - pagadoCompras)?.toFixed(2)} Bs.</div>
        <div className="total__cajas">Total Compras: {totalCompras?.toFixed(2)} Bs.</div>
        </>
         }
    </article>
  )
}

export default ShowMerc