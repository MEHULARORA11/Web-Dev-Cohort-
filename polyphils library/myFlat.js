Array.prototype.myFlat = function(depth){
    if(typeof(depth) !== 'number' || Number.isNaN(depth)) throw new Error('Invalid depth') 

if(depth===0) return this
let arr1 = [...this]
let arr2 = []
while(depth!==0){
    arr2 = []
for(let i=0;i<arr1.length;i++){
    if(Array.isArray(arr1[i])){
       arr2.push(...arr1[i]) // very important part
           // note don't write arr = arr1 as then the original copy will be there so to make a unique one either use arr = [...arr1] or arr = Array.from(arr1) for a unique copy
    }else{
        arr2.push(arr1[i])
    }
}
arr1 = [...arr2]
depth--;
}
return arr1

}


