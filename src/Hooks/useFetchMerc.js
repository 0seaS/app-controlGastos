

const useFetchMerc = () => {

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

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

  return {createRegisterMerc}

}

export default useFetchMerc