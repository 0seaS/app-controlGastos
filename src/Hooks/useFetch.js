import { useState } from "react"

const useFetch = () => {

  const [dataApi, setDataApi] = useState()
  const [db, setDb] = useState()
  const [testDataApi, setTestDataApi] = useState([])
  let showData = []

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

  /**** FUNCION DE CREADO DB ****/

  // function createDB(e){
  //   let dataBase = e.target.result;
  //   let almacen = dataBase.createObjectStore("ingresos", {keyPath: "id"});
  //   almacen.createIndex("BuscarRazon", "razon", {unique: false});
  //   startDB()
  // }

  // READ

  const getData = () => {
    setDataApi([{
      id: 1,
      caja: 1200,
      fecha: "2023-09-01",
      sucursal: "sacaba",
      gastos: [{razon:"compras",
               monto:25
              },
              {razon:"pan",
               monto:5
              },
              {razon:"huevo",
               monto:15
              },
              {razon:"gas",
               monto:25
              },
            ]
    },
    {
      id: 2,
      caja: 900,
      fecha: "2023-08-31",
      sucursal: "chimore",
      gastos: [{razon:"compras",
               monto:25
              },
              {razon:"pan",
               monto:5
              },
              {razon:"huevo",
               monto:15
              },
              {razon:"gas",
               monto:25
              },
            ]
    },
    {
      id: 3,
      caja: 1500,
      fecha: "2023-08-30",
      sucursal: "chimore",
      gastos: [{razon:"compras",
               monto:25
              },
              {razon:"pan",
               monto:5
              },
              {razon:"huevo",
               monto:15
              },
              {razon:"gas",
               monto:25
              }
            ]
    }
    ])
  }
  /**** ALTERNO ****/

  
  function test(){
    getIncomes()
    setTestDataApi(showData)
  }

  function getIncomes(){
    let transaccion = db.transaction(["caja"]);
    let almacen = transaccion.objectStore("caja");

    let puntero = almacen.openCursor();
    
    puntero.addEventListener("success", generarData);
}

function generarData(evento){
    var puntero = evento.target.result;
    if(puntero)
    {
        showData.push(puntero.value)
        //setTestDataApi([...testDataApi, puntero.value])
        puntero.continue();
    }
}


  // CREATE

  function createRegister(data1){
    
    let transaccion1 = db.transaction(["caja"], "readwrite");
    let almacen1 = transaccion1.objectStore("caja");
    almacen1.add(data1);

  }

  return {dataApi, getData, createRegister, startDB, test, testDataApi}
  
}

export default useFetch