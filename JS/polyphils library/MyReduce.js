 Array.prototype.MyReduce = function(cb,initialValue){
    let acc = initialValue
    for(let i=0;i<this.length;i++){
        acc=cb(acc,this[i])
    }
    return acc
 }

