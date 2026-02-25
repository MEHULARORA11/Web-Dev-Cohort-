 Object.prototype.MyValues = function(){
    let arr = []
    for(let key in this){
   if(this.hasOwnProperty(key)){
    arr.push(this[key])
   }
    }
    return arr
 }

  let a = {
    a:'jkdn',
    b:'jkbj'
 }
 console.log(a.MyValues());