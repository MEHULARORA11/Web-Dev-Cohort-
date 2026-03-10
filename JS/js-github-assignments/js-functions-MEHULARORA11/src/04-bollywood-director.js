/**
 * 🎬 Bollywood Scene Director - Factory Functions
 *
 * Bollywood ka script generator bana! Factory functions use karo — matlab
 * aise functions jo DOOSRE functions return karte hain. Pehle configuration
 * do, phir ek specialized function milega jo kaam karega.
 *
 * Functions:
 *
 *   1. createDialogueWriter(genre)
 *      - Factory: returns a function (hero, villain) => string
 *      - Genres and their dialogue templates:
 *        "action"  => `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`
 *        "romance" => `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`
 *        "comedy"  => `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`
 *        "drama"   => `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`
 *      - Unknown genre => return null (not a function, just null)
 *      - Returned function: if hero or villain empty/missing, return "..."
 *
 *   2. createTicketPricer(basePrice)
 *      - Factory: returns a function (seatType, isWeekend = false) => price
 *      - Seat multipliers: silver=1, gold=1.5, platinum=2
 *      - Agar isWeekend, multiply final price by 1.3 (30% extra)
 *      - Round to nearest integer
 *      - Unknown seatType in returned fn => return null
 *      - Agar basePrice not positive number => return null (not a function)
 *
 *   3. createRatingCalculator(weights)
 *      - Factory: returns a function (scores) => weighted average
 *      - weights: { story: 0.3, acting: 0.3, direction: 0.2, music: 0.2 }
 *      - scores: { story: 8, acting: 9, direction: 7, music: 8 }
 *      - Weighted avg = sum of (score * weight) for matching keys
 *      - Round to 1 decimal place
 *      - Agar weights not an object => return null
 *
 * Hint: A factory function RETURNS another function. The returned function
 *   "remembers" the parameters of the outer function (this is a closure!).
 *
 * @example
 *   const actionWriter = createDialogueWriter("action");
 *   actionWriter("Shah Rukh", "Raees")
 *   // => "Shah Rukh says: 'Tujhe toh main dekh lunga, Raees!'"
 *
 *   const pricer = createTicketPricer(200);
 *   pricer("gold", true)  // => 200 * 1.5 * 1.3 = 390
 */
export function createDialogueWriter(genre) {
  // Your code here
  let arr = ['action','romance','comedy','drama']
  if(!(arr.includes(genre))) return null
  function dilogue(hero,villain){
       if(!hero || hero === '' || !villain || villain === '') return '...'
       let message

              switch(genre){
            case 'action': message = `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`
              break
            case 'romance': message = `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`
              break
            case 'comedy': message = `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`
              break
            case 'drama': message = `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`
              break
          }       
          return message
          

          }
          return dilogue // this is the example of closures that when the inner function is returned (ie the defination) then it brings the bag of lexical scopes of the outer function given the fact that defination of outer function is deleted but still there is 

}

export function createTicketPricer(basePrice) {
  // Your code here
  if(typeof(basePrice) !== 'number' || basePrice<=0) return null 
  function seat(seatType,isWeekend=false){ 
    let price
    switch(seatType){
      case 'silver' :  price = basePrice * 1 // see this is also closures see the basePrice
       break
      case 'gold' :  price = basePrice * 1.5
       break
      case 'platinum' :  price = basePrice * 2 
       break
       default:return null
    }
    if(isWeekend){
       price = Math.round(price*1.3)
    }else{
      price = Math.round(price)
    }
    return price
  }
  return seat
}

export function createRatingCalculator(weights) {
  // Your code here
  if(!weights || typeof(weights) !== 'object' || weights === null || Array.isArray(weights)) return null // note no need to write weight === null as we already write !weight ie !weight means that weight === null/undefined

  function calc(scores){
    let avg = 0
   for(let key in weights){
    if(!weights[key] || !scores[key]) continue
     avg += weights[key]*scores[key]
   }
   return parseFloat((avg).toFixed(1))
  }
  return calc

}
