import { useEffect, useState } from "react"
import AddMercProducto from "./AddMercProducto"
import AddMercPagos from "./AddMercPagos"
import useFetchMerc from "../Hooks/useFetchMerc"


const AddMerc = ({editar, setEditar}) => {

    const [productList, setProductList] = useState([])
    const [pagosList, setPagosList] = useState([])
    const [precioTotal, setPrecioTotal] = useState(0)
    const [pagadoTotal, setPagadoTotal] = useState(0)

    const {createRegisterMerc, edidtRegister} = useFetchMerc()

    function handleAgregarProducto(e){
        e.preventDefault()

        const prod = {
            descripcion: document.querySelector("#description").value,
            cantidad: Number(document.querySelector("#quantity").value),
            precio: Number(document.querySelector("#purchasePrice").value)
        }

        setProductList([...productList, prod])

        document.querySelector("#description").value = ""
        document.querySelector("#quantity").value = ""
        document.querySelector("#purchasePrice").value = ""
    }

    function handleAgregarPago(e){
        e.preventDefault()

        const prod = {
            fecha: document.querySelector("#payDate").value,
            monto: Number(document.querySelector("#montoPago").value)
        }

        //setPagadoTotal(pagadoTotal + Number(document.querySelector("#montoPago").value))
        setPagosList([...pagosList, prod])

        document.querySelector("#payDate").value = ""
        document.querySelector("#montoPago").value = ""
    }

    useEffect(() => {
        setPagadoTotal(pagosList.reduce((ant,act) => ant + act.monto, 0))
    }, [pagosList])
    useEffect(() => {
        setPrecioTotal(productList.reduce((ant,act) => ant + Number((act.precio*act.cantidad).toFixed(2)), 0))
    }, [productList])
    useEffect(()=>{
        if (editar) {
            editarDato()
        }
    },[editar])

    function editarDato(){
        console.log(editar)
        document.getElementById("branch").value = editar.sucursal;
        document.getElementById("typeReceipt").value = editar.tipo;
        document.getElementById("dateReceipt").value = editar.fecha;
        document.getElementById("dispatchPlace").value = editar.lugarDespacho
        setPagosList(editar.pagos)
        setProductList(editar.productos)
    }

    function handleSubmitForm(e){
        e.preventDefault()
        if (editar) {
            let suc = document.getElementById("branch");
            let typ = document.getElementById("typeReceipt");

            const registro = {
                sucursal: suc.options[suc.selectedIndex].value,
                tipo: typ.options[typ.selectedIndex].value,
                fecha: document.getElementById("dateReceipt").value,
                lugarDespacho: document.getElementById("dispatchPlace").value,
                productos: productList,
                pagos:pagosList,
                id : editar.id
            }

            // EDITAR

            edidtRegister(registro)
            console.log(registro)

            clearDatos()
            setEditar(undefined)
            console.log(editar)
        } else{
            register()
        }
    }

    function register(){
        let suc = document.getElementById("branch");
        let typ = document.getElementById("typeReceipt");
        const auxProductos = productList.map(data => Object.values(data)).toString()
        const auxPagos = pagosList.map(data => Object.values(data)).toString()

        const registro = {
            sucursal: suc.options[suc.selectedIndex].value,
            tipo: typ.options[typ.selectedIndex].value,
            fecha: document.getElementById("dateReceipt").value,
            lugarDespacho: document.getElementById("dispatchPlace").value,
            productos: productList,
            pagos:pagosList
        }
        
        createRegisterMerc(registro)
        console.log(registro)

        clearDatos()
    }

    function clearDatos(){
        document.getElementById("dateReceipt").value = ""
        document.getElementById("dispatchPlace").value = ""
        setPagosList([])
        setProductList([])
    }

  return (
    <>
    <div className="register__container">
        <h2>Registrar Mercaderia</h2>
        <form className="gastos__form" onClick={e => e.stopPropagation()} onSubmit={handleAgregarProducto}>
            <h3 className="gastos__form-title">Añadir Producto</h3>
            <label htmlFor="description">Descripcion </label>
            <input type="text" id="description" placeholder="Descripcion" required></input>
            <label htmlFor="quantity">Cantidad </label>
            <input type="number" id="quantity" placeholder="Cantidad del producto" step=".01" required></input>
            <label htmlFor="purchasePrice">Precio de Compra</label>
            <input type="number" id="purchasePrice" placeholder="Precio en Bs" step=".01" required></input>
            <button className="btn-agregarGasto" type="submit">Agregar</button>
        </form>
        <h3 className="gastos__title">Productos</h3>
        <div className="gastos__container" id="mostrar-gastos">
            {
                productList.length>0 
                ? productList.map((element, ind) => (
                    <AddMercProducto
                    key={ind}
                    product={element}
                    setProductList={setProductList}
                    productList={productList}
                    precioTotal={precioTotal}
                    setPrecioTotal={setPrecioTotal}
                    />                  
                    ))
                : <span>Sin Productos </span>
            }
            <hr />
            <div className="gasto__total"><span>Total: </span><span>{precioTotal.toFixed(2)} Bs.</span></div>
        </div>

        <form className="gastos__form" onClick={e => e.stopPropagation()} onSubmit={handleAgregarPago}>
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
                pagosList.length>0 
                ? pagosList.map((pago, ind) => (
                    <AddMercPagos 
                    key={ind}
                    pago={pago}
                    setPagosList={setPagosList}
                    pagosList={pagosList}
                    pagadoTotal={pagadoTotal}
                    setPagadoTotal={setPagadoTotal}
                    />                  
                    ))
                : <span>Sin Pagos </span>
            }
            <hr />
            <div className="gasto__total"><span>A Cuenta: </span><span>{pagadoTotal} Bs.</span></div>
        </div>

        <form className="register__form" onClick={e => e.stopPropagation()} onSubmit={handleSubmitForm}>
            <div className="register__body">
            <h3 className="form__title">Ingrese los Datos de Recivo</h3>
            <label htmlFor="branch">Sucursal </label>
            <select name="branch" id="branch" required>
                <option value="externas">Externas</option>
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

            <button className="btn-submit" type="submit">
                {
                editar
                ? "Editar"
                : "Registrar"
                }
            </button>
            </div>
        </form >
    </div>
    </>
  )
}

export default AddMerc