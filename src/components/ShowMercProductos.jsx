import "./styles/ShowMercProductos.css"

const ShowMercProductos = ({data}) => {
  return (
    <div className="bodycard__gastos">
      <span>{data.descripcion}</span><span>{data.cantidad} u.</span><span>{data.precio} Bs.</span><span>{(data.cantidad*data.precio).toFixed(2)} Bs.</span>
    </div>
  )
}

export default ShowMercProductos