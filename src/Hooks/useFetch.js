import { useState } from "react"
import util from "../assets/util/util"

const useFetch = () => {

  /*** Esta parte es para trasformar los gastos ***/
  const {toObj} = util()
  /*** Aqui termina ***/

  const [dataApi, setDataApi] = useState()
  const [db, setDb] = useState()

  /*** START DB ***/

  function startDB(){
    let solicitud = indexedDB.open("control-tienda");

    solicitud.addEventListener("error", showError);
    solicitud.addEventListener("success", start);
    solicitud.addEventListener("upgradeneeded", createDB);
  }
  function showError(e){
    alert("Tenemos un error: " + e.code + " / " + e.message);
  }

  function start(e){
    setDb(e.target.result)
    //db = e.target.result;
  }

  function createDB(e){
    let dataBase = e.target.result;
    let tabla1 = dataBase.createObjectStore("caja", {keyPath: "id"});
    startDB()
  }

  /*** GET ***/

  function getData(){
    var request = indexedDB.open("control-tienda");
    request.onsuccess = function(e) {
      let auxDB =  e.target.result;
      let transaccion = auxDB.transaction(["caja"]);
      transaccion.oncomplete = (ev) => {

      }
      let almacen = transaccion.objectStore("caja");
      let getReq = almacen.getAll()
      getReq.onsuccess = (ev) => {
        let dataApiBD = ev.target

        /*** Esta parte cambia los gastos por un arreglo de objetos ***/
        let dataTrasform = dataApiBD.result
        dataTrasform.forEach(element => {
          let arrAux = element.gastos.split(',')
          let aux = toObj(arrAux)
          element.gastos = aux
        });
        /*** aqui termina el cambio ***/
        
        setDataApi(dataTrasform)
      }
      getReq.onerror = (err) => {
        console.log(err)
      }
    }
  }

  // CREATE

  function createRegister(data1){
    
    let transaccion1 = db.transaction(["caja"], "readwrite");
    let almacen1 = transaccion1.objectStore("caja");
    almacen1.add(data1);

  }

  /*** EXPORT ***/

  return {dataApi, getData, createRegister, startDB}
  
}

export default useFetch