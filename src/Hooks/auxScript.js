

const useFetch = () => {
    let db = null;
    let objectStore = null;
    let DBOpenReq = indexedDB.open("control-tienda")

    DBOpenReq.addEventListener("error", err => console.log(err));
    DBOpenReq.addEventListener("success", ev => db = ev.target.result);
    DBOpenReq.addEventListener("upgradeneeded", ev => {
        db = ev.target.result;

        if (!db.objectStoreNames.contains("caja")) {
            objectStore = db.createObjectStore("caja", {
                keyPath: "id"
            });
        }
        if (!db.objectStoreNames.contains("compras")) {
            objectStore = db.createObjectStore("compras", {
                keyPath: "id"
            });
        }
    });
}