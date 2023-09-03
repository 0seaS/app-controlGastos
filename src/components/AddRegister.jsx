import { useEffect, useState } from "react"
import AddGasto from "./AddGasto"
import useFetch from "../Hooks/useFetch"
import "./styles/AddRegister.css"

const AddRegister = () => {

    const [gastosList, setGastosList] = useState([])
    const {createRegister, startDB} = useFetch()

    useEffect(()=>{
        startDB()
    },[])
    
    function handleAgregarGastos(){

        const gasto = {
            razon: document.querySelector("#reason").value,
            monto: document.querySelector("#amountOutcome").value
        }

        setGastosList([...gastosList, gasto])

        document.querySelector("#reason").value = ""
        document.querySelector("#amountOutcome").value = ""

    }

    function handleRegistrar(e){
        e.preventDefault()

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
        document.querySelector("#caja").value = ''

        setGastosList([])
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
            <h2>registro de caja</h2>

            <div className="gastos__form">
                <h3 className="gastos__form-title">Añadir Gastos</h3>
                <label htmlFor="reason">Razon </label>
                <input type="text" id="reason" placeholder="Ingrese la Razon" required></input>
                <label htmlFor="amountOutcome">Monto </label>
                <input type="number" id="amountOutcome" placeholder="Monto en Bs" min="0" step=".01" required></input>
                <button className="btn-agregarGasto" onClick={handleAgregarGastos}>Agregar Gasto</button>
            </div>
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
            </div>

            <form className="register__form" onClick={e => e.stopPropagation()} onSubmit={handleRegistrar}>
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
                <button className="btn-submit" type="submit">Registrar</button>
                </div>
            </form >

        
            
        </div>
    </>
  )
}

export default AddRegister