 Object.prototype.MyKeys = function(){
    let arr = []
    for(let key in this){
        if(this.hasOwnProperty(key)){
            arr.push(key)
        }
    }
    return arr
 }


 