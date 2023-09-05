import { useEffect, useState } from "react"
import useFetch from "../Hooks/useFetch.js"
import DataCard from "./DataCard.jsx"

const DataTable = () => {

    const {dataApi, getData, startDB, actualizarData} = useFetch()
    const [selectSucursal, setSelectSucursal] = useState("Todos")
    const [showData, setShowData] = useState()

    useEffect(() => {
        startDB()
        getData()
    }, [])

    console.log(showData)

    useEffect(() => {
        let show

            if (selectSucursal === "Villa") {
                console.log(dataApi)
                show = dataApi.filter(data => data.sucursal == "villa")
                console.log(show)
                setShowData(show)
            }
            else if(selectSucursal === "Chimore") {
                console.log(dataApi)
                show = dataApi.filter(data => data.sucursal == "chimore")
                console.log(show)
                setShowData(show)
            }
            else if(selectSucursal === "Sacaba") {
                console.log(dataApi)
                show = dataApi.filter(data => data.sucursal == "sacaba")
                console.log(show)
                setShowData(show)
            }
            else{
                setShowData(dataApi)
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
    <article>
        <button onClick={handleSacaba}>Sacaba</button><button onClick={handleVilla}>Villa Tunari</button><button onClick={handleChimore}>Chimore</button>
        <header>
            <h2>Lista de Gastos {selectSucursal}</h2>
        </header>
        <section>
            <div>
                {
                    showData?.map(register => (
                        <DataCard
                            key={register.id}
                            bodyData={register}
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