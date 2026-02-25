Object.prototype.MyEntries = function(){
    let arr = []
    for(let key in this){
      if(this.hasOwnProperty(key)){ // very imporatnt check as othervise it will check those keys also jo humne create ki hai like MyEntries
        let arr2 = []
        arr2.push(key,this[key])
        arr.push(arr2)
      }
    }
    return arr
}


