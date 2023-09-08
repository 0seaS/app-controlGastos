import BodyCard from "./BodyCard"
import util from "../assets/util/util.js"
import "./styles/DataCard.css"

const DataCard = ({bodyData}) => {

    let gastos1 = bodyData?.gastos.split(',')
    console.log(gastos1)
    let aux = util(gastos1)
    console.log(aux)

  return (
    <>
    
        <div className="general__data">
            <div><span>Fecha: </span>{bodyData?.fecha}<span></span></div>
            <div><span>Sucursal: </span>{bodyData?.sucursal}<span></span></div>
            <div><span>Caja: </span>{bodyData?.caja} Bs.<span></span></div>
        </div>
        <div className="gastos__card">
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
        </div>
    </>
  )
}

export default DataCard