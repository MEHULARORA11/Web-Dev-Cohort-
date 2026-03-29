/**
 * 🥛 Punjab ki Famous Lassi Stand Chain - Constructor Functions & Prototype
 *
 * Punjab ki mashoor lassi stand chain hai jahan har stand pe fresh lassi milti
 * hai. Tumhe constructor function se lassi stands banana hai aur prototype pe
 * methods add karne hain. `new` keyword se har stand ek naya instance banega
 * aur prototype methods sab instances share karenge.
 *
 * Constructor: LassiStand(name, city)
 *   Called with `new` keyword. Sets up:
 *   - this.name = name
 *   - this.city = city
 *   - this.menu = [] (empty array, flavors will be added)
 *   - this.orders = [] (empty array)
 *   - this._nextOrderId = 1 (internal counter for auto-increment)
 *
 * Prototype Methods (add on LassiStand.prototype):
 *
 *   addFlavor(flavor, price)
 *     - Pushes { flavor, price } to this.menu
 *     - No duplicates allowed: agar flavor already exists (same name), return -1
 *     - Price must be > 0, otherwise return -1
 *     - Returns menu length after adding
 *
 *   takeOrder(customerName, flavor, quantity)
 *     - Validates ki flavor this.menu mein exists hai
 *     - Quantity must be > 0
 *     - Creates order object:
 *       { id: auto-increment (starting 1), customer: customerName,
 *         flavor, quantity, total: price * quantity, status: "pending" }
 *     - Pushes to this.orders
 *     - Returns order id
 *     - Agar flavor invalid ya quantity <= 0: return -1
 *
 *   completeOrder(orderId)
 *     - Finds order by id, sets status to "completed"
 *     - Returns true if found and updated
 *     - Returns false if not found or already completed
 *
 *   getRevenue()
 *     - Returns sum of totals for orders with status "completed" only
 *     - Pending orders count nahi honge
 *
 *   getMenu()
 *     - Returns a COPY of the menu array (not the original reference)
 *     - Modifying returned array should not affect internal menu
 *
 * Function: isLassiStand(obj)
 *   - Returns true if obj is an instance of LassiStand (use instanceof)
 *   - Returns false otherwise
 *
 * Rules:
 *   - LassiStand must be a constructor function (not a class)
 *   - Methods must be on prototype, NOT inside constructor
 *   - No duplicate flavors in menu (check by flavor name string)
 *   - Order ids auto-increment starting from 1
 *   - getMenu returns a copy, not the original array
 *
 * @param {string} name - Lassi stand ka naam
 * @param {string} city - City jahan stand hai
 *
 * @example
 *   const stand = new LassiStand("Sardar ji", "Amritsar");
 *   stand.addFlavor("mango", 40);          // => 1
 *   stand.addFlavor("rose", 35);           // => 2
 *   stand.addFlavor("mango", 45);          // => -1 (duplicate)
 *   stand.takeOrder("Rahul", "mango", 2);  // => 1
 *   stand.takeOrder("Priya", "rose", 1);   // => 2
 *   stand.completeOrder(1);                 // => true
 *   stand.getRevenue();                     // => 80
 *   isLassiStand(stand);                    // => true
 *   isLassiStand({});                       // => false
 */
export function LassiStand(name, city) {
  // Your code here
  this.name = name
  this.city = city
  this.menu = []
  this.orders = []
  this._nextOrderId = 1
}
LassiStand.prototype.addFlavor = function (flavor, price){
   if(price<=0) return -1
for(let item of this.menu){
  if(item.flavor === flavor){
    return -1
  }
}
this.menu.push({flavor,price})
  return this.menu.length
}
LassiStand.prototype.takeOrder = function(customerName, flavor, quantity){
  if(!(this.menu.some((item) => item.flavor === flavor)) || quantity<=0) return -1

  let total
  for(let i of this.menu){
    if(i.flavor === flavor){
      total = i.price*quantity
    }
  }
let id = this._nextOrderId++
  this.orders.push({id,customer:customerName,flavor,quantity,total,status: "pending"})
  return id

}

LassiStand.prototype.completeOrder = function(orderId){
  if(!(this.orders.some((item) => item.id === orderId))) return false
  for(let item of this.orders){
    if(item.id === orderId && item.status === 'completed') return false
  }
  for(let item of this.orders){
    if(item.id === orderId){
      item.status = 'completed'
      return true
    }
  }

  // if(this.orders.some((item) => item.id === orderId)){
  //   item.status = 'completed'
  //   return true
  // }

}
LassiStand.prototype.getRevenue = function(){
  let orders = this.orders
  let totalCount = orders.reduce((acc,curr) => {
     if(curr.status === 'completed'){
      return acc + curr.total
     }
     return acc
  },0)
  return totalCount

}
LassiStand.prototype.getMenu = function(){
  return this.menu.slice()
}



// Add prototype methods here:
// LassiStand.prototype.addFlavor = function(flavor, price) { ... }
// LassiStand.prototype.takeOrder = function(customerName, flavor, quantity) { ... }
// LassiStand.prototype.completeOrder = function(orderId) { ... }
// LassiStand.prototype.getRevenue = function() { ... }
// LassiStand.prototype.getMenu = function() { ... }

export function isLassiStand(obj) {
  // Your code here
  if(obj instanceof LassiStand) return true
  return false
}
