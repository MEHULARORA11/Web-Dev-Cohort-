/**
 * 🪔 Sharma ji ki Diwali Decoration
 *
 * Sharma ji apne ghar ko Diwali pe sajana chahte hain light strings se.
 * Unke paas ek budget hai aur market mein alag alag colors ki light strings
 * hain different lengths mein. Sharma ji sab kuch lena chahte hain, lekin
 * budget se zyada nahi!
 *
 * Color rates (per meter):
 *   - "golden" = Rs 50/meter
 *   - "multicolor" = Rs 40/meter
 *   - "white" = Rs 30/meter
 *   - Any other color = Rs 35/meter
 *
 * Rules:
 *   Step 1 - Use for...of to loop through lightStrings and add ALL of them
 *     to selected list with their cost calculated
 *   Step 2 - Use a while loop to check: agar totalCost > budget, toh remove
 *     the LAST item from selected, subtract its cost, and keep removing until
 *     totalCost <= budget
 *
 * @param {Array<{color: string, length: number}>} lightStrings - Available light strings
 * @param {number} budget - Sharma ji ka budget in rupees
 * @returns {{ selected: Array<{color: string, length: number, cost: number}>, totalLength: number, totalCost: number }}
 *
 * Validation:
 *   - Agar lightStrings array nahi hai ya budget positive number nahi hai,
 *     return: { selected: [], totalLength: 0, totalCost: 0 }
 *
 * @example
 *   diwaliLightsPlan(
 *     [{ color: "golden", length: 5 }, { color: "white", length: 10 }, { color: "multicolor", length: 3 }],
 *     400
 *   )
 *   // golden: 5*50=250, white: 10*30=300, multicolor: 3*40=120
 *   // Total = 670 > 400, remove multicolor (670-120=550), still > 400,
 *   // remove white (550-300=250), 250 <= 400
 *   // => { selected: [{ color: "golden", length: 5, cost: 250 }], totalLength: 5, totalCost: 250 }
 */
export function diwaliLightsPlan(lightStrings, budget) {
  // Your code here
  if(!Array.isArray(lightStrings) || lightStrings.length === 0 || typeof(budget) !== 'number' ||  budget<=0) return { selected: [], totalLength: 0, totalCost: 0 }

  let arr = []
  let cost
  for(let lights of lightStrings){
    switch(lights.color){
      case 'golden': cost = 50*lights.length
      break
      case 'multicolor': cost = 40*lights.length
      break
      case 'white': cost = 30*lights.length
      break
      default: cost = 35*lights.length
    }
    arr.push({color:lights.color,length:lights.length,cost})
  }

  let totalObj = arr.reduce((acc,curr) => {
      acc.totalCost+=curr.cost
      acc.totalLength+=curr.length
      return acc
  },{totalCost:0,totalLength:0})
 


  while(totalObj.totalCost>budget){
    totalObj.totalCost = totalObj.totalCost - arr[arr.length - 1].cost
    totalObj.totalLength = totalObj.totalLength - arr[arr.length - 1].length
  arr.pop()
  }

  return { selected:arr,totalLength:totalObj.totalLength,totalCost:totalObj.totalCost }
}
/**
 * what if we have to delete the most expensive addOnPrice
 * ✅ Approach 1 (Simple but O(n²))

Inside while:

let maxIndex = 0
for (let i = 1; i < arr.length; i++) {
  if (arr[i].cost > arr[maxIndex].cost) {
    maxIndex = i
  }
}

let removed = arr.splice(maxIndex, 1)[0]
totalCost -= removed.cost
totalLength -= removed.length

This works.

But if done repeatedly → O(n²).

Acceptable for small n, not optimal for large n.

🚀 Approach 2 (Better – O(n log n))

Sort once:

arr.sort((a, b) => b.cost - a.cost)

Now most expensive is always at front.

Then just:

while (totalCost > budget) {
  let removed = arr.shift()
  totalCost -= removed.cost
  totalLength -= removed.length
}

Now:

Sorting → O(n log n)

Removals → O(n)

Total → O(n log n)

Much better than O(n²).

🧠 Interview-Level Thinking

The moment requirement changes to:

“remove max each time”

You should think:

Repeated max search? → inefficient

Pre-sort? → better

Use max-heap? → best (O(n log n))

That’s algorithmic maturity.

🎯 Important Correction

You said:

“find index using filter”

That’s not ideal thinking.

Better thinking is:

“How can I structure the data so that expensive element is easy to access?”

That’s data-structure thinking.

Since you're a CS student and like deep understanding —

Next level question for you:

If array size was 1 million, what data structure would you use to always remove the max efficiently?
 */
