import { useEffect, useState } from "react"
import useFetch from "../Hooks/useFetch.js"
import DataCard from "./DataCard.jsx"

const DataTable = () => {

    const {dataApi, getData,} = useFetch()
    const [selectSucursal, setSelectSucursal] = useState("Todos")
    const [showData, setShowData] = useState()

    useEffect(() => {
        getData()
    }, [])

    console.log(dataApi)

    useEffect(() => {
        if (dataApi) {
            if (selectSucursal === "Villa") {
                const show = dataApi.filter(data => data.sucursal === "Villa")
                console.log(show)
                setShowData(show)
            }
            if(selectSucursal === "Chimore") {
                const show = dataApi.filter(data => data.sucursal === "Chimore")
                console.log(show)
                setShowData(show)
            }
            if(selectSucursal === "Sacaba") {
                const show = dataApi.filter(data => data.sucursal === "Sacaba")
                console.log(show)
                setShowData(show)
            }
            else{
                setShowData(dataApi)
            }
        }
        
    }, [dataApi])

    console.log(showData)

  return (
    <article>
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