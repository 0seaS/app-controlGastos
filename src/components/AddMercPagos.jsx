

const AddMercPagos = ({pago, pagosList, setPagosList}) => {

    function handleQuitarPago(){
        setPagosList(pagosList.filter(element => !(element.fecha == pago.fecha && element.monto == pago.monto))) 
    }

  return (
    <div className="gasto__container">
        <span>{pago.fecha} </span><span>{pago.monto} Bs.</span><span><button className="btn-addGasto" onClick={handleQuitarPago}>X</button></span>
    </div>
  )
}

export default AddMercPagos