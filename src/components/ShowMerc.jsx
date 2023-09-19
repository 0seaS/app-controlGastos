import React, { useEffect, useState } from 'react'
import useFetchMerc from '../Hooks/useFetchMerc'
import ShowMercCard from './ShowMercCard'

const ShowMerc = () => {

    const {data, getData} = useFetchMerc()
    const [selectSucursal, setSelectSucursal] = useState("all")
    const [showData, setShowData] = useState()

    useEffect(() => {
      getData()
      setShowData(data)
    }, [])

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

    console.log(data)
  return (
    <article className="data__container">
        <div className="btn__select-container"><button className="btn__select" onClick={handleSacaba}>Sacaba</button><button className="btn__select" onClick={handleVilla}>Villa Tunari</button><button className="btn__select" onClick={handleChimore}>Chimore</button><button className="btn__select" onClick={handleExternas}>Externas</button></div>
        
        <header>
            <h2>Mercaderia de {selectSucursal}</h2>
        </header>
        <section>
            <div>
                <div className="gastos__card-container-title">
                    <div className="general__data">
                        <div className="general__data-element"><span>Fecha: </span></div>
                        <div className="general__data-element"><span>Despacho: </span></div>
                        <div className="general__data-element"><span>Total: </span></div>
                        <div className="general__data-element"><span>Saldo: </span></div>
                    </div>
                </div>
                {
                    showData?.map(register => (
                        <ShowMercCard
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

export default ShowMerc