Function.prototype.myCall = function(obj,...args){ // rest operator
    if(!obj || typeof(obj)!=='object' || Array.isArray(obj)) throw new Error('Invalid Input')
      obj.key = this
      obj.key(...args)
}
