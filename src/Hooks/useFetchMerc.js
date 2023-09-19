import { useState } from "react"
import util from "../assets/util/util"

const useFetchMerc = () => {

    const {toObj2, toObj3} = util()
    const [data, setData] = useState()

    function createRegisterMerc(data){
        data.id = generateUUID()
        data.productos = data.productos.map(data => Object.values(data)).toString()
        data.pagos = data.pagos.map(data => Object.values(data)).toString()

        var request = indexedDB.open("control-tienda");
        request.onsuccess = function(e) {
            let db =  e.target.result;
            let transaction = db.transaction("compras", "readwrite");
            transaction.oncomplete = ev => {
            };
            transaction.onerror = err => console.log(err)
            let store = transaction.objectStore('compras');
            let request = store.add(data);
        
            request.onsuccess = ev => {
                alert("Registro insertado con exito");
            };
            request.onerror = err => {
            console.log(err);
            alert("Error!! No se inserto el registro")
            };
        }
    }

    function getData(){
        var request = indexedDB.open("control-tienda");
        request.onsuccess = function(e) {
            let auxDB =  e.target.result;
            let transaccion = auxDB.transaction(["compras"]);
            transaccion.oncomplete = (ev) => {
        
            }
            let almacen = transaccion.objectStore("compras");
            let getReq = almacen.getAll()
            getReq.onsuccess = (ev) => {
                let dataApiBD = ev.target
                /*** Esta parte cambia los gastos por un arreglo de objetos ***/
                let dataTrasform = dataApiBD.result
                dataTrasform.forEach(element => {
                    console.log(element.pagos)
                let auxPagos = element.pagos == "" ? [] : toObj2(element.pagos.split(','))
                let auxProductos = element.productos == "" ? [] : toObj3(element.productos.split(','))
                element.pagos = auxPagos
                element.productos = auxProductos
                });
                /*** aqui termina el cambio ***/
                
                setData(dataTrasform)
                console.log(dataTrasform)
            }
            getReq.onerror = (err) => {
                console.log(err)
            }
        }
      }

    function deleteData(key){
    
        var request = indexedDB.open("control-tienda");
        request.onsuccess = function(e) {
            let auxDB =  e.target.result;
            let transaction = auxDB.transaction("compras", "readwrite");
            transaction.oncomplete = e => {
            };
            transaction.onerror = err => console.log(err)
            let store = transaction.objectStore('compras');
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

    function edidtRegister(data){
        data.productos = data.productos.map(data => Object.values(data)).toString()
        data.pagos = data.pagos.map(data => Object.values(data)).toString()
        var request = indexedDB.open("control-tienda");
        request.onsuccess = function(e) {
            let db =  e.target.result;

            let transaction = db.transaction("compras", "readwrite");
            transaction.oncomplete = ev => {
            };
            transaction.onerror = err => console.log(err)
            let store = transaction.objectStore('compras');
            let request = store.put(data);

            request.onsuccess = ev => {
                alert("Registro actualizado con exito");
            };
            request.onerror = err => {
                console.log(err);
                alert("Error!! No se actualizo el registro")
            };
        }
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

  return {data, createRegisterMerc, getData, deleteData, edidtRegister}

}

export default useFetchMerc