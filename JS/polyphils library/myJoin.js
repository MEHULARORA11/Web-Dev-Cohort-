Array.prototype.myJoin = function(seperator){
    let input;
    if(seperator === undefined){
       input = ','
    }else{
      input = String(seperator)
    }

    let str = "";
    for(let box of this){
      str+=box + input
    }
    return str
    

}
