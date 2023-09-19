

const ShowMercPagos = ({data}) => {
  return (
    <div className="product__container">
        <span>{data.fecha}</span><span>{data.monto} Bs.</span>
    </div>
  )
}

export default ShowMercPagos