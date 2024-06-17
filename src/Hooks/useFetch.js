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
    let solicitud = indexedDB.open("control-tienda", 2);
    solicitud.addEventListener("error", showError);
    solicitud.addEventListener("success", start);
    solicitud.addEventListener("upgradeneeded", createDB);
  }
  function showError(e){
    alert("Tenemos un error: " + e.code + " / " + e.message);
    console.log(e)
  }

  function start(e){
    setDb(e.target.result)
    //db = e.target.result;
  }

  function createDB(e){
    let dataBase = e.target.result
    if (!dataBase.objectStoreNames.contains("caja")) {
      let tabla1 = dataBase.createObjectStore("caja", {
          keyPath: "id"
      });
      //aca van los insert
    }
    if (!dataBase.objectStoreNames.contains("compras")) {
      let tabla2 = dataBase.createObjectStore("compras", {
          keyPath: "id"
      });
    }
    // let dataBase = e.target.result;
    // let tabla1 = dataBase.createObjectStore("caja", {keyPath: "id"});
    // startDB()
  }

  // funcion que inserta los datos

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
          if (element.gastos === "") {
            element.gastos = []
          } else {
            let arrAux = element.gastos.split(',')
            let aux = toObj(arrAux)
            element.gastos = aux
          }
          
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

  function createRegister(data){
    let transaction = db.transaction("caja", "readwrite");
    transaction.oncomplete = ev => {
        //una ves la transaccion termino
    };
    transaction.onerror = err => console.log(err)
    let store = transaction.objectStore('caja');
    let request = store.add(data);

    request.onsuccess = ev => {
        alert("Registro insertado con exito");
    };
    request.onerror = err => {
      console.log(err);
      alert("Error!! No se inserto el registro")
    };

    // let transaccion1 = db.transaction(["caja"], "readwrite");
    // let almacen1 = transaccion1.objectStore("caja");
    // almacen1.add(data1);
  }

  /*** UPDATE ***/

  function edidtRegister(data){
    let transaction = db.transaction("caja", "readwrite");
    transaction.oncomplete = ev => {
        //una ves la transaccion termino
    };
    transaction.onerror = err => console.log(err)
    let store = transaction.objectStore('caja');
    let request = store.put(data);

    request.onsuccess = ev => {
        alert("Registro actualizado con exito");
    };
    request.onerror = err => {
      console.log(err);
      alert("Error!! No se actualizo el registro")
    };

    // let transaccion1 = db.transaction(["caja"], "readwrite");
    // let almacen1 = transaccion1.objectStore("caja");
    // almacen1.add(data1);
  }

  /*** DELETE ***/

  function deleteData(key){
    
    var request = indexedDB.open("control-tienda");
    request.onsuccess = function(e) {
      let auxDB =  e.target.result;
      let transaction = auxDB.transaction("caja", "readwrite");
      transaction.oncomplete = e => {
          // ACTUALIZAR DATOS
          getData()
      };
      transaction.onerror = err => console.log(err)
      let store = transaction.objectStore('caja');
      let request = store.delete(key);

      request.onsuccess = ev => {
          alert("Registro Eliminado con exito");
      };
      request.onerror = err => {
        console.log(err);
        alert("Error!! No se Elimino el registro")
      };
    }
  }

  /*** EXPORT ***/

  return {dataApi, getData, createRegister, startDB, deleteData, edidtRegister}
  
}

export default useFetch