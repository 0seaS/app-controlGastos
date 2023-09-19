import "./styles/AddMercProduct.css"

const AddMercProducto = ({product, setProductList, productList}) => {

    function handleQuitarProducto(){
        setProductList(productList.filter(element => element.descripcion != product.descripcion)) 
    }

  return (
    <>
    <div>{product.descripcion}</div>
    <div className="product__container">
        <span>{product.cantidad} U.</span><span>{product.precio} Bs.</span><span>{Number(product.cantidad*product.precio).toFixed(2)} </span><span><button className="btn-addGasto" onClick={handleQuitarProducto}>X</button></span>
    </div>
    </>   
  )
}

export default AddMercProducto