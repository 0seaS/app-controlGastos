import "./styles/AddGasto.css"

const AddGasto = ({gasto, setGastosList, gastosList}) => {

    function handleQuitarGasto(){
        setGastosList(gastosList.filter(element => element.razon != gasto.razon)) 
    }

  return (
    <div className="gasto__container">
        <span>{gasto.razon} </span><span>{gasto.precio} Bs.</span><span><button className="btn-addGasto" onClick={handleQuitarGasto}>X</button></span>
    </div> 
  )
}

export default AddGasto