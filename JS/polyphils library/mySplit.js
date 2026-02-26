String.prototype.mySplit = function(str){
  let input = String(this)
    
  if(typeof(str) !== 'string') return 
  let indexStart = 0;
 let indexEnd = input.indexOf(str,indexStart);
 let arr = []

 if(indexEnd === -1 || str === ''){
    return Array.of(input)
 }

  while(true){

    if(input.indexOf(str,indexStart) === -1){
      arr.push(input.substring(indexStart,input.length))
        break;
    }

    indexEnd = input.indexOf(str,indexStart);
   let element = input.substring(indexStart,indexEnd)
   arr.push(element)
   indexStart = indexEnd+1;
  }
  return arr

}
