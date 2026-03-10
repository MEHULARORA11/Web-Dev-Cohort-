/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  // Your code here
  function filter(obj){
    switch(operator){
    case '<': if(Number(value) === NaN) return Boolean(obj[field] < Number(value))
      else{
        return Boolean(obj[field] < value)
      }
    case '>': if(Number(value) === NaN) return Boolean(obj[field] > Number(value))
      else{
        return Boolean(obj[field] > value)
      }
    case '<=': if(Number(value) === NaN) return Boolean(obj[field] <= Number(value))
      else{
        return Boolean(obj[field] <= value)
      }
    case '>=': if(Number(value) === NaN) return Boolean(obj[field] >= Number(value))
      else{
        return Boolean(obj[field] >= value)
      }
    case '===': if(Number(value) === NaN) return Boolean(obj[field] === Number(value))
      else{
        return Boolean(obj[field] === value)
      }
    default: return false
    
    }
  }
   return filter
}

export function createSorter(field, order = "asc") {
  // Your code here
  const collator = Intl.Collator('en',{
    numeric:true,
    sensitivity:"base"
  })
  function sort(a,b){
   switch(order){
    case 'asc': return collator.compare(a[field],b[field])
    case 'desc':return  collator.compare(b[field],a[field])
   }
  }
  return sort
}


export function createMapper(fields) {
  // Your code here
  function map(objj){
    let obj = {}
      for(let item of fields){
        if(objj.hasOwnProperty(item)){
          obj[item] = objj[item]
        }

      }
      return obj
  }
  return map
}

export function applyOperations(data, ...operations) {
  // Your code here
  if(!Array.isArray(data) || data.length === 0) return []
     let result = data
  for(let i=0;i<operations.length;i++){
    result = operations[i](result)
  }
  return result
 

}

