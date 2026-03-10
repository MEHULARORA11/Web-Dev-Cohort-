/**
 * 🍳 Dosa Counter - Order Calculator
 *
 * Raju ka South Indian dosa counter hai Bangalore mein. Customer aata hai,
 * dosa ka type bolta hai, kitne chahiye bolta hai, aur spicy chahiye ya nahi.
 * Tujhe order calculate karke bill banana hai.
 *
 * Rules:
 *   - Dosa prices: plain=40, masala=60, onion=50, butter=70, paper=90, cheese=80
 *   - quantity ka default value 1 hai (agar nahi diya toh 1 maano)
 *   - isSpicy ka default value false hai
 *   - Agar isSpicy true hai, toh har dosa pe Rs 10 extra lagao
 *   - pricePerDosa = base price + (10 if spicy)
 *   - total = pricePerDosa * quantity
 *   - Return: { type, quantity, pricePerDosa, total }
 *   - Hint: Use default parameters, object return
 *
 * Validation:
 *   - Agar type string nahi hai ya unknown type hai, return null
 *   - Agar quantity positive number nahi hai (<=0 ya NaN), return null
 *
 * @param {string} type - Dosa type
 * @param {number} [quantity=1] - Number of dosas
 * @param {boolean} [isSpicy=false] - Add spicy for Rs 10 extra
 * @returns {{ type: string, quantity: number, pricePerDosa: number, total: number } | null}
 *
 * @example
 *   calculateDosaOrder("masala", 2, true)
 *   // => { type: "masala", quantity: 2, pricePerDosa: 70, total: 140 }
 *
 *   calculateDosaOrder("plain")
 *   // => { type: "plain", quantity: 1, pricePerDosa: 40, total: 40 }
 */
export function calculateDosaOrder(type, quantity = 1, isSpicy = false) {
  // Your code here
  if(typeof(type) !== 'string' || typeof(quantity) !== 'number' || Number.isNaN(quantity) || quantity<=0) return null
let pricePerDosa
let total

  switch(type){
    case 'plain':
      if(isSpicy){
        pricePerDosa = (40 + 10)
        total = pricePerDosa*quantity
      }else{
        pricePerDosa = (40)
         total = pricePerDosa*quantity
      }
      break
    case 'masala':
      if(isSpicy){
        pricePerDosa = (60 + 10)
        total = pricePerDosa*quantity
      }else{
        pricePerDosa = (60)
         total = pricePerDosa*quantity
      }
      break
    case 'onion':
      if(isSpicy){
        pricePerDosa = (50 + 10)
        total = pricePerDosa*quantity
      }else{
        pricePerDosa = (50)
         total = pricePerDosa*quantity
      }
      break
    case 'butter':
      if(isSpicy){
        pricePerDosa = (70 + 10)
        total = pricePerDosa*quantity
      }else{
        pricePerDosa = (70)
         total = pricePerDosa*quantity
      }
      break
    case 'paper':
       if(isSpicy){
        pricePerDosa = (90 + 10)
        total = pricePerDosa*quantity
      }else{
        pricePerDosa = (90)
         total = pricePerDosa*quantity
      }
      break
    case 'cheese':
       if(isSpicy){
        pricePerDosa = (80 + 10)
        total = pricePerDosa*quantity
      }else{
        pricePerDosa = (80)
         total = pricePerDosa*quantity
      }
      break
      default:return null
  }



  return { type,quantity,pricePerDosa,total}
}

/**
 * 🔹 What Does This Mean?
@ param {number} [quantity=1]
@ param {boolean} [isSpicy=false]

The square brackets [] in JSDoc mean:

This parameter is OPTIONAL.

And = value means:

If not provided, use this default value.

🔹 In Actual Function Signature
export function calculateDosaOrder(type, quantity = 1, isSpicy = false)

This is ES6 default parameter syntax.

It means:

If caller writes:
calculateDosaOrder("plain")

Then internally:

type = "plain"
quantity = 1
isSpicy = false

Because they were not passed.

If caller writes:
calculateDosaOrder("masala", 3)

Then:

type = "masala"
quantity = 3
isSpicy = false

Because third argument missing → default false used.

If caller writes:
calculateDosaOrder("butter", 2, true)

Then:

type = "butter"
quantity = 2
isSpicy = true

Because it was explicitly passed.

🔹 Why This Is Useful?

Before ES6, we had to write:

quantity = quantity || 1

But that breaks if quantity = 0.

Default parameters solve this cleanly.

🔹 Important Behavior (Interview Trick)

Defaults only apply when argument is:

undefined

Not when it is:

null
false
0

Example:

calculateDosaOrder("plain", undefined, true)

→ quantity becomes 1

But:

calculateDosaOrder("plain", 0)

→ quantity stays 0 (and your validation rejects it)
 */