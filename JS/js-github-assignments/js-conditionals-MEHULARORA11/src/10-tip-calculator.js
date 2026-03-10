/**
 * 🍽️ TipEasy - Restaurant Tip Calculator
 *
 * You're building TipEasy, an app that helps diners calculate the right
 * tip based on how they'd rate their dining experience. No more awkward
 * mental math at the table!
 *
 * Service Rating → Tip Percentage:
 *   - 1 (terrible)  → 5%
 *   - 2 (poor)      → 10%
 *   - 3 (okay)      → 15%
 *   - 4 (good)      → 20%
 *   - 5 (excellent) → 25%
 *
 * Return an object with:
 *   - tipPercentage: the percentage as a number (e.g., 15)
 *   - tipAmount: the calculated tip rounded to 2 decimal places
 *   - totalAmount: bill + tip rounded to 2 decimal places
 *
 * Rules:
 *   - If billAmount is 0 or negative, return null
 *   - If serviceRating is not an integer from 1 to 5, return null
 *
 * Example:
 *   calculateTip(50, 4)
 *   → { tipPercentage: 20, tipAmount: 10.00, totalAmount: 60.00 }
 *
 * @param {number} billAmount - The bill amount in dollars
 * @param {number} serviceRating - Service rating from 1 to 5
 * @returns {{ tipPercentage: number, tipAmount: number, totalAmount: number } | null}
 */
export function calculateTip(billAmount, serviceRating) {
  // Your code here
  // let regex = /[1-5]/
  if(billAmount<=0){
    return null
  }
//   if(!(regex.test(serviceRating.toString()))){
//  return null
//   }
  let ratingPercent
  switch(serviceRating){
    case 1:ratingPercent = 5
    break;
    case 2: ratingPercent = 10
    break;
    case 3:ratingPercent = 15
    break;
    case 4: ratingPercent = 20
    break; 
    case 5 : ratingPercent = 25
    break;
    default: return null 
  }

  return {
    tipPercentage : ratingPercent,
    tipAmount:Number(tipAmount(billAmount,ratingPercent)), // as .toFixed returns the string not a number
    totalAmount:billAmount + Number(tipAmount(billAmount,ratingPercent))
  }

  function tipAmount(billAmount,ratingPercent){
      let amount = (billAmount*(ratingPercent/100)).toFixed(2)
      return amount      
  }

}
