import { useEffect, useState } from "react"
import AddGasto from "./AddGasto"
import useFetch from "../Hooks/useFetch"
import "./styles/AddRegister.css"
import util from "../assets/util/util"

const AddRegister = ({editar, setEditar}) => {

    const [gastosList, setGastosList] = useState([])
    const [totalGastos, setTotalGastos] = useState(0)
    const {createRegister, startDB, edidtRegister} = useFetch()
    const {sumDat} = util()

    useEffect(()=>{
        startDB()
        if (editar) {
            editarDato()
        }
    },[editar])

    useEffect(() => {
        //setTotalGastos(gastosList + Number(document.querySelector("#amountOutcome").value))
        setTotalGastos(gastosList.reduce((ant,act) => ant + act.precio, 0))
    }, [gastosList])
    
    function handleAgregarGastos(e){
        e.preventDefault()

        const gasto = {
            razon: document.querySelector("#reason").value,
            precio: Number(document.querySelector("#amountOutcome").value)
        }

        setGastosList([...gastosList, gasto])

        document.querySelector("#reason").value = ""
        document.querySelector("#amountOutcome").value = ""
    }

    function handleSubmitForm(e){
        e.preventDefault()
        if(editar){
            let suc = document.getElementById("select-sucursal");
            const aux = gastosList.map(data => Object.values(data)).toString()

            const registro = {
                sucursal: suc.options[suc.selectedIndex].value,
                caja: Number(document.querySelector("#caja").value),
                fecha: document.querySelector("#date").value,
                gastos: aux,
                /*gastos: gastosList,*/
                id: editar.id
            }

            // EDITAR

            edidtRegister(registro)
            console.log(registro)

            clearDatos()
            setEditar(undefined)
            console.log(editar)
            
        }else{
            handleRegistrar()
        }
    }

    function handleRegistrar(){

        let suc = document.getElementById("select-sucursal");
        const aux = gastosList.map(data => Object.values(data)).toString()

        const registro = {
            sucursal: suc.options[suc.selectedIndex].value,
            caja: document.querySelector("#caja").value,
            fecha: document.querySelector("#date").value,
            gastos: aux,
            /*gastos: gastosList,*/
            id: generateUUID()
        }

        // Aqui va la insersion
        
        createRegister(registro)

        console.log(aux)
        console.log(registro)

        //Reset de datos

        clearDatos()
        // document.querySelector("#caja").value = ''
        // setTotalGastos(0)

        // setGastosList([])
    }

    function clearDatos(){
        document.querySelector("#caja").value = ''
        setTotalGastos(0)
        setGastosList([])
    }

    function editarDato(){
        console.log(editar)
        console.log(editar.gastos)
        document.getElementById("select-sucursal").value = editar.sucursal
        document.querySelector("#caja").value = editar.caja
        setGastosList(editar.gastos)
        document.querySelector("#date").value = editar.fecha
        setTotalGastos(sumDat(editar.gastos))

        // const registro = {
        //     sucursal: suc.options[suc.selectedIndex].value,
        //     caja: document.querySelector("#caja").value,
        //     fecha: document.querySelector("#date").value,
        //     gastos: aux,
        //     /*gastos: gastosList,*/
        //     id: generateUUID()
        // }
    }

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

  return (
    <>
        
        <div className="register__container">
            <h2>Registro de caja</h2>

            <form className="gastos__form" onClick={e => e.stopPropagation()} onSubmit={handleAgregarGastos}>
                <h3 className="gastos__form-title">Añadir Gastos</h3>
                <label htmlFor="reason">Descripcion </label>
                <input type="text" id="reason" placeholder="Descripcion del Gasto" required></input>
                <label htmlFor="amountOutcome">Monto </label>
                <input type="number" id="amountOutcome" placeholder="Monto en Bs" step=".01" required></input>
                <button className="btn-agregarGasto" type="submit">Agregar Gasto</button>
            </form>
            <h3 className="gastos__title">Gastos del dia</h3>
            <div className="gastos__container" id="mostrar-gastos">
                {
                    gastosList.length>0 
                    ? gastosList.map(gasto => (
                        <AddGasto 
                        key={gasto.razon}
                        gasto={gasto}
                        setGastosList={setGastosList}
                        gastosList={gastosList}
                        />                  
                    ))
                    : <span>Sin gastos </span>
                }
                <hr />
                <div className="gasto__total"><span>Total gastos: </span><span>{totalGastos} Bs.</span></div>
            </div>

            <form className="register__form" onClick={e => e.stopPropagation()} onSubmit={handleSubmitForm}>
                <div className="register__body">
                <h3 className="form__title">Ingrese los Datos de Caja</h3>
                <label htmlFor="select-sucursal">Sucursal </label>
                <select name="sucursal" id="select-sucursal" required>
                    <option value="villa">Villa</option>
                    <option value="chimore">Chimore</option>
                    <option value="sacaba">Sacaba</option>
                </select>
                <label htmlFor="caja">Cantidad en Caja </label>
                <input type="number" id="caja" placeholder="Monto en Bs" min="0" step=".01" required></input>
                <label htmlFor="date">Fecha </label>
                <input type="date" id="date" required></input>
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

export default AddRegister