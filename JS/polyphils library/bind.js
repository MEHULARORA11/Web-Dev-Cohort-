Function.prototype.myBind = function(obj,...args1){
     if(!obj || typeof(obj)!=='object' || Array.isArray(obj) ) throw new Error('Invalid Input')
  
        const fn = this
        function back(...args2){
           return fn.apply(obj,[...args1,...args2])
        }
        return back
}
