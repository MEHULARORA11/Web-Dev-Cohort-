 Array.prototype.MyMap = function(cb){
  let arr = []
  for(let i=0;i<this.length;i++){
    arr.push(cb(this[i],i,this))
  }
  return arr
 }

 
