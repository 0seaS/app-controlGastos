

const AddGasto = ({gasto, setGastosList, gastosList}) => {

    function handleQuitarGasto(){
        setGastosList(gastosList.filter(element => element.razon != gasto.razon)) 
    }

  return (
    <div>
        <span>{gasto.razon}</span><span>{gasto.monto}</span><button onClick={handleQuitarGasto}>quitar</button>
    </div> 
  )
}

export default AddGasto