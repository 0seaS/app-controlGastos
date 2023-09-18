

const AddMercProducto = ({product, setProductList, productList}) => {

    function handleQuitarProducto(){
        setProductList(productList.filter(element => element.descripcion != product.descripcion)) 
    }

  return (
    <div className="gasto__container">
        <span>{product.descripcion} </span><span>{product.cantidad} unidades.</span><span>{product.precio} Bs.</span><span><button className="btn-addGasto" onClick={handleQuitarProducto}>X</button></span>
    </div>
  )
}

export default AddMercProducto