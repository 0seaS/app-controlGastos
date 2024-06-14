import React, { useEffect, useState } from 'react'
import useFetchMerc from '../Hooks/useFetchMerc'
import ShowMercCard from './ShowMercCard'

const ShowMerc = ({setEditar}) => {

    const {data, getData} = useFetchMerc()
    const [selectSucursal, setSelectSucursal] = useState("Externas")
    const [showData, setShowData] = useState()
    const [totalMercaderia, setTotalMercaderia] = useState(0)
    const [totalPagado, setTotalPagado] = useState(0)
    const [fromDateValue, setFromDateValue] = useState("2023-08-01")
    const [toDateValue, setToDateValue] = useState(new Date().toISOString().slice(0, 10))
    const [typeMerc, setTypeMerc] = useState("compra")

    useEffect(() => {
      getData()
      setShowData(data)
    }, [])

    useEffect(() => {
      setTotalMercaderia(showData?.reduce((acc, cur) => acc + cur.productos.reduce((acc, cur) => acc + Number((cur.cantidad*cur.precio).toFixed(2)), 0), 0))
      setTotalPagado(showData?.reduce((acc, cur) => acc + cur.pagos.reduce((acc, cur) => acc + Number(cur.monto), 0), 0))
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
      show = show?.filter(data => new Date(data.fecha).getTime() <= new Date(toDateValue).getTime() && new Date(data.fecha).getTime() >= new Date(fromDateValue).getTime() && data.tipo == typeMerc)
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

    function handleSwitchType(){
      if(typeMerc == "compra"){
        setTypeMerc("venta")
      }else{
        setTypeMerc("compra")
      }
    }

  return (
    <article className="data__container">
        <div className="btn__select-container"><button className="btn__select" onClick={handleSacaba}>Sacaba</button><button className="btn__select" onClick={handleVilla}>Villa Tunari</button><button className="btn__select" onClick={handleChimore}>Chimore</button><button className="btn__select" onClick={handleExternas}>Externas</button></div>
        <div className="filterDate"><span>Desde: </span><input type="date" id="fromDate" value={fromDateValue} onChange={setDatesValues}/> </div>
        <div className="filterDate"><span>Hasta: </span><input type="date" id="toDate" value={toDateValue} onChange={setDatesValues}/></div>
        <div><button className='btn__select' onClick={handleSwitchType}>{typeMerc == "compra" ? "Ventas" : "Compras"}</button></div>
        <header>
            <h2>Mercaderia de {selectSucursal} {typeMerc}</h2>
        </header>
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
        <div className="total__cajas">Pagado: {totalPagado?.toFixed(2)} Bs.</div>
        <div className="total__cajas">saldo: {(totalMercaderia - totalPagado)?.toFixed(2)} Bs.</div>
        <div className="total__cajas">Total Mercaderia: {totalMercaderia?.toFixed(2)} Bs.</div>
    </article>
  )
}

export default ShowMerc