/**
 * 🎉 Festival Countdown Planner - Module Pattern
 *
 * Indian festivals ka planner bana! Module pattern use karna hai —
 * matlab ek function jo ek object return kare jisme public methods hain,
 * lekin andar ka data PRIVATE rahe (bahar se directly access na ho sake).
 *
 * Function: createFestivalManager()
 *
 * Returns an object with these PUBLIC methods:
 *
 *   - addFestival(name, date, type)
 *     date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
 *     Returns new total count of festivals
 *     Agar name empty or date not string or invalid type, return -1
 *     No duplicate names allowed (return -1 if exists)
 *
 *   - removeFestival(name)
 *     Returns true if removed, false if not found
 *
 *   - getAll()
 *     Returns COPY of all festivals array (not the actual private array!)
 *     Each festival: { name, date, type }
 *
 *   - getByType(type)
 *     Returns filtered array of festivals matching type
 *
 *   - getUpcoming(currentDate, n = 3)
 *     currentDate is "YYYY-MM-DD" string
 *     Returns next n festivals that have date >= currentDate
 *     Sorted by date ascending
 *
 *   - getCount()
 *     Returns total number of festivals
 *
 * PRIVATE STATE: festivals array should NOT be accessible from outside.
 *   manager.festivals should be undefined.
 *   getAll() must return a COPY so modifying it doesn't affect internal state.
 *   Two managers should be completely independent.
 *
 * Hint: This is the Module Pattern — a function that returns an object
 *   of methods, all closing over shared private variables.
 *
 * @example
 *   const mgr = createFestivalManager();
 *   mgr.addFestival("Diwali", "2025-10-20", "religious");   // => 1
 *   mgr.addFestival("Republic Day", "2025-01-26", "national"); // => 2
 *   mgr.getAll(); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
 *   mgr.getUpcoming("2025-01-01", 1); // => [{ name: "Republic Day", ... }]
 */
export function createFestivalManager() {
  // Your code here
  let arr = []
  let count = 0
  let arr3 = []
  let festival = ["religious","national","cultural"]
  function addFestival(name, date, type){
    if(!festival.includes(type)) return -1
    if(!name || !date || typeof(date) !== 'string') return -1
    for(let fest of arr){
    if(fest.name === name)return -1      
   }
    arr.push({name,date,type})
      count++
      return count
  }
  arr3 = [...arr]

  function removeFestival(name){
    arr3 = []
    let isFound = false
   for(let fest of arr){
    if(fest.name === name){
      isFound = true
      continue
    }
    arr3.push(fest)
      
   }
  arr = [...arr3]
    return isFound
  }

  function getAll(){
    return [...arr]
  }

  function getByType(type){
   let arr2 = arr.filter((item) => item.type === type)
   return arr2
  }

  function getUpcoming(currentDate, n = 3){
    let arr2 = []
    let array = [...arr]
    array.sort((a,b) => a.date.localeCompare(b.date))
    let c = n
    let currentMili = new Date(currentDate).getTime()
    for(let i=0;i<array.length;i++){
       let mili = new Date(array[i].date).getTime()
       if(mili>currentMili){
        arr2.push(array[i])
        c--
       }
       if(c === 0) break
    }
    arr2.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    return arr2

  }

  function getCount(){
    return arr.length
  }
  return {
  addFestival,
  removeFestival,
  getAll,
  getByType,
  getUpcoming,
  getCount
}


}
