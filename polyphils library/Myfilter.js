Array.prototype.Myfilter = function(cb){
    let arr = []
    for(let i=0;i<this.length;i++){
      if(cb(this[i],i,this)){
        arr.push(this[i])
      }
    }
    return arr
}

