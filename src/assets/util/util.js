

const util = (arr) => {
    let res=[]
    for(let i = 0; i < arr.length; i=i+2){
        let obj={}
        obj.razon = arr[i]
        obj.precio = +arr[i+1]
        res.push(obj)
    }
    return res
}

export default util