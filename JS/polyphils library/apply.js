Function.prototype.myApply = function(obj,args){
    if(!obj || typeof(obj)!=='object' || Array.isArray(obj) || !args || !Array.isArray(args)) throw new Error('Invalid Input')
       
        obj.key = this
        obj.key(...args)
    }
