/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 }) // now i am comfortable with this format it is nothing but object destructuructuring via short hand property
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  if(!name || typeof(name) !== 'string' || name === '') return null // basically !name ka matlab hain => name === null/undefined ==> the order also matters first check whether name is available or not then check the type else error aayega  and finally check whether is is "" empty or not ,,if i check empty before type then maybe error aaye as maybe vo number ho
  let pricePerDAy
  let totalCost
  switch(mealType){
    case 'veg':{
      pricePerDAy = 80
      totalCost = pricePerDAy*days
    }
    break
    case 'nonveg':{
      pricePerDAy = 120
      totalCost = pricePerDAy*days
    }
    break
    case 'jain':{
      pricePerDAy = 90
      totalCost = pricePerDAy*days
    }
    break
    default:return null
  }
  return { name, mealType, days, dailyRate:pricePerDAy, totalCost }
}

export function combinePlans(...plans) {
  // Your code here
  if(!Array.isArray(plans) || plans.length === 0) return null

  let planObj = plans.reduce((acc,curr) => {
    let pricePerDAy
    let totalCost
    switch(curr.mealType){
    case 'veg':{
      pricePerDAy = 80
      totalCost = pricePerDAy*curr.days
      acc.mealBreakdown.veg+=1
    }
    break
    case 'nonveg':{
      pricePerDAy = 120
      totalCost = pricePerDAy*curr.days
      acc.mealBreakdown.nonveg+=1
    }
    break
    case 'jain':{
      pricePerDAy = 90
      totalCost = pricePerDAy*curr.days
      acc.mealBreakdown.jain+=1
    }
  }
  acc.totalCustomers+=1
  acc.totalRevenue+=totalCost
  return acc

  },{totalCustomers:0,totalRevenue:0,mealBreakdown:{veg:0,nonveg:0,jain:0}})
return {totalCustomers:planObj.totalCustomers,totalRevenue:planObj.totalRevenue,mealBreakdown:planObj.mealBreakdown}
}

export function applyAddons(plan, ...addons) {
  // Your code here
  if(plan === null) return null
  let addTotal = addons.reduce((acc,curr) => {
       acc+=curr.price
       return acc
  },0)
  let modifiedRatePerDay = plan.dailyRate + addTotal
   let totaModifiedRate = modifiedRatePerDay*plan.days
   let plan2 = Object.create(plan)
   let arr = []
   for(let obj of addons){
    arr.push(obj.name)
   }

   plan2.dailyRate = modifiedRatePerDay
   plan2.totalCost = totaModifiedRate
   plan2.addonNames = arr
   return plan2
}
