

const util = () => {

    function toObj(arr){
        let res=[]
        for(let i = 0; i < arr.length; i=i+2){
            let obj={}
            obj.razon = arr[i]
            obj.precio = +arr[i+1]
            res.push(obj)
        }
    return res
    }

    function toObj2(arr){
        let res=[]
        for(let i = 0; i < arr.length; i=i+2){
            let obj={}
            obj.fecha = arr[i]
            obj.monto = +arr[i+1]
            res.push(obj)
        }
    return res
    }

    function toObj3(arr){
        let res=[]
        for(let i = 0; i < arr.length; i=i+3){
            let obj={}
            obj.descripcion = arr[i]
            obj.cantidad = +arr[i+1]
            obj.precio = +arr[i+2]
            res.push(obj)
        }
    return res
    }

    function sumDat(arr){
        let res=0
        arr.forEach(data => {
            res = res + Number(data.precio)
        });
    return res
    }

    return {toObj, toObj2, toObj3, sumDat}

    
}

export default util