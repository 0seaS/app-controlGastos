import BodyCard from "./BodyCard"

const DataCard = ({bodyData}) => {

    let gastos1 = bodyData?.gastos.split(',')

  return (
    <>
    
        <div>
            <div><span>Fecha:</span>{bodyData?.fecha}<span></span></div>
            <div><span>Total en Caja:</span>{bodyData?.caja}<span></span></div>
        </div>
        <div>
            <h3>Gastos</h3>
            <div>
                {
                    
                    gastos1?.map((register, ind) => (
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