import { useState } from "react"


const AddMerc = () => {

    const [productList, setProductList] = useState([])
    const [pagosList, setPagosList] = useState([])
    const [precioTotal, setPrecioTotal] = useState(0)

    

  return (
    <>
    <div className="register__container">
            <h2>Registrar Mercaderia</h2>

        <form className="gastos__form" onClick={e => e.stopPropagation()} >
            <h3 className="gastos__form-title">Añadir Producto</h3>
            <label htmlFor="description">Descripcion </label>
            <input type="text" id="description" placeholder="Descripcion" required></input>
            <label htmlFor="quantity">Cantidad </label>
            <input type="text" id="quantity" placeholder="Cantidad del producto" required></input>
            <label htmlFor="purchasePrice">Precio de Compra</label>
            <input type="number" id="purchasePrice" placeholder="Precio en Bs" step=".01" required></input>
            <button className="btn-agregarGasto" type="submit">Agregar</button>
        </form>
        <h3 className="gastos__title">Productos</h3>
        <div className="gastos__container" id="mostrar-gastos">
            {
                productList.length>0 
                ? productList.map(product, ind => (
                    <AddGasto 
                    key={ind}
                    product={product}
                    setProductList={setProductList}
                    productList={productList}
                    />                  
                    ))
                : <span>Sin Productos </span>
            }

            <div><span>Total Productos: </span><span>{precioTotal}</span></div>
        </div>



        <form className="gastos__form" onClick={e => e.stopPropagation()} >
            <h3 className="gastos__form-title">Añadir Pago</h3>
            <label htmlFor="payDate">fecha </label>
            <input type="date" id="payDate" required></input>
            <label htmlFor="montoPago">Monto</label>
            <input type="number" id="montoPago" placeholder="Monto en Bs" step=".01" required></input>
            <button className="btn-agregarGasto" type="submit">Agregar</button>
        </form>
        <h3 className="gastos__title">pagos</h3>
        <div className="gastos__container" id="mostrar-gastos">
            {
                productList.length>0 
                ? productList.map(product, ind => (
                    <AddGasto 
                    key={ind}
                    product={product}
                    setProductList={setProductList}
                    productList={productList}
                    />                  
                    ))
                : <span>Pagos </span>
            }

            <div><span>A Cuenta: </span><span>{precioTotal}</span></div>
        </div>



        <form className="register__form" onClick={e => e.stopPropagation()}>
            <div className="register__body">
            <h3 className="form__title">Ingrese los Datos de Recivo</h3>
            <label htmlFor="branch">Sucursal </label>
            <select name="branch" id="branch" required>
                <option value="villa">Villa</option>
                <option value="chimore">Chimore</option>
                <option value="sacaba">Sacaba</option>
            </select>
            <label htmlFor="dateReceipt">Fecha </label>
            <input type="date" id="dateReceipt" required></input>
            <label htmlFor="typeReceipt">Compra/Venta </label>
            <select name="typeReceipt" id="typeReceipt" required>
                <option value="compra">Compra</option>
                <option value="venta">Venta</option>
            </select>
            <label htmlFor="dispatchPlace">Lugar de Despacho </label>
            <input type="text" id="dispatchPlace" placeholder="Lugar de Despacho" required></input>

            <button className="btn-submit" type="submit">Registrar</button>
            </div>
        </form >

        
            
        </div>
    </>
  )
}

export default AddMerc