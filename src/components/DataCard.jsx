import BodyCard from "./BodyCard"

const DataCard = ({bodyData}) => {

    console.log(bodyData)
  return (
    <>
    
        <div>
            <div><span>Fecha:</span>{bodyData?.fecha}<span></span></div>
            <div><span>Total en Caja:</span>{bodyData?.caja}<span></span></div>
        </div>
        <div>
            <h3>Gastos</h3>
            {
                bodyData?.gastos.map(register => (
                    <BodyCard
                        key={register.razon}
                        data={register}
                    />
                ))
            }
        </div>
    </>
  )
}

export default DataCard