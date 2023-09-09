

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

    function sumDat(arr){
        let res=0
        arr.forEach(data => {
            res = res + Number(data.precio)
        });
    return res
    }

    return {toObj, sumDat}

    
}

export default util