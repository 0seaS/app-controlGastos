

const util = (arr) => {
    let obj={}
    for(let i = 0; i < arr.length/2; i+2){
        obj[arr[i]] = arr[i+1]
    }
    return obj
}

export default util