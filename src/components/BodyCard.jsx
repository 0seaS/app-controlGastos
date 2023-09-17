import "./styles/BodyCard.css"

const BodyCard = ({data}) => {
  return (
    <div className="bodycard__gastos">
      <span>{data.razon}</span><span>{data.precio} Bs.</span>
    </div>
  )
}

export default BodyCard