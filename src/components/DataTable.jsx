import { useEffect, useState } from "react"
import useFetch from "../Hooks/useFetch.js"
import DataCard from "./DataCard.jsx"

const DataTable = () => {

    const {dataApi, getData, startDB, actualizeData} = useFetch()
    const [selectSucursal, setSelectSucursal] = useState("Todos")
    const [showData, setShowData] = useState()

    useEffect(() => {
        startDB()
        getData()
    }, [])

    useEffect(() => {
        
        if (dataApi != []) {
            if (selectSucursal === "Villa") {
                let show = dataApi.filter(data => data.sucursal == "villa")
                console.log(show)
                setShowData(show)
            }
            if(selectSucursal === "Chimore") {
                let show = dataApi.filter(data => data.sucursal == "chimore")
                console.log(show)
                setShowData(show)
            }
            if(selectSucursal === "Sacaba") {
                let show = dataApi.filter(data => data.sucursal == "sacaba")
                console.log(show)
                setShowData(show)
            }
            else{
                setShowData(dataApi)
            }
        }
        else{
            getData()
        }
        
    }, [dataApi], selectSucursal)

    console.log(dataApi)
    console.log(selectSucursal)
    console.log(showData)

    function handleSacaba(){
        actualizeData()
        setSelectSucursal("Sacaba")
    }
    function handleVilla(){
        actualizeData()
        setSelectSucursal("Villa")
    }
    function handleChimore(){
        actualizeData()
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