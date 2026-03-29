/**
 * 🇮🇳 Republic Day Parade - Capstone: All DOM Concepts Combined
 *
 * Republic Day parade ka live dashboard bana rahe hain! Multiple DOM
 * concepts ek saath use honge - createElement, appendChild, classList,
 * dataset, event delegation, DOM traversal, insertBefore, sab kuch.
 * Jaise 26 January ko Rajpath pe alag alag contingents march karte hain
 * aur commentary team sab track karti hai, waise hi tum DOM se parade
 * ka poora dashboard manage karoge. Yeh CAPSTONE challenge hai - saare
 * DOM skills combine karo!
 *  
 * Functions:
 *
 *   1. createContingent(name, type, state, members)
 *      - Creates a div.contingent with:
 *        - data-name attribute = name
 *        - data-type attribute = type (e.g., "military", "cultural", "school")
 *        - data-state attribute = state (e.g., "Maharashtra", "Punjab")
 *        - h3 with textContent = name
 *        - span.type with textContent = type
 *        - span.state with textContent = state
 *        - ul with each member as an li element
 *      - Returns the div element
 *      - Validation: name (string), type (string), state (string),
 *        members (array of strings). Agar invalid, return null.
 *
 *   2. setupParadeDashboard(container)
 *      - Sets up the parade dashboard on container element
 *      - Returns object with these methods:
 *
 *        addContingent(contingent)
 *          - contingent: { name, type, state, members }
 *          - Creates element using createContingent()
 *          - Appends to container
 *          - Returns the created element, or null if invalid
 *
 *        removeContingent(name)
 *          - Finds .contingent child with data-name matching name
 *          - Removes it from container
 *          - Returns true if found and removed, false if not found
 *
 *        moveContingent(name, direction)
 *          - direction: "up" or "down"
 *          - "up": swaps contingent with its previousElementSibling
 *            (uses insertBefore to place it before its previous sibling)
 *          - "down": swaps with its nextElementSibling
 *            (uses insertBefore to place next sibling before this element)
 *          - Returns true if moved, false if can't move (no sibling in that direction)
 *          - Returns false if contingent not found
 *
 *        getContingentsByType(type)
 *          - Finds all .contingent children with data-type matching type
 *          - Returns array of elements
 *
 *        highlightState(state)
 *          - Adds class "highlight" to all .contingent children with
 *            data-state matching state
 *          - Removes class "highlight" from all other .contingent children
 *          - Returns count of highlighted contingents
 *
 *        getParadeOrder()
 *          - Returns array of contingent names in current DOM order
 *          - Reads data-name from each .contingent child
 *
 *        getTotalMembers()
 *          - Counts ALL li elements across all contingents in container
 *          - Returns the total count
 *
 *      - Agar container null/undefined, return null
 *
 * Hint: Yeh capstone hai - createElement, appendChild, classList, dataset,
 *   querySelectorAll, insertBefore, removeChild sab use hoga. Har method
 *   mein ek alag DOM concept practice hoga.
 *
 * @example
 *   const container = document.createElement("div");
 *   const dashboard = setupParadeDashboard(container);
 *
 *   dashboard.addContingent({
 *     name: "Punjab Regiment",
 *     type: "military",
 *     state: "Punjab",
 *     members: ["Col. Singh", "Maj. Kaur", "Capt. Gill"]
 *   });
 *
 *   dashboard.addContingent({
 *     name: "Bharatanatyam Group",
 *     type: "cultural",
 *     state: "Tamil Nadu",
 *     members: ["Lakshmi", "Priya", "Deepa", "Meena"]
 *   });
 *
 *   dashboard.getParadeOrder();
 *   // => ["Punjab Regiment", "Bharatanatyam Group"]
 *
 *   dashboard.moveContingent("Bharatanatyam Group", "up");
 *   // => true
 *   dashboard.getParadeOrder();
 *   // => ["Bharatanatyam Group", "Punjab Regiment"]
 *
 *   dashboard.getContingentsByType("military");
 *   // => [element for Punjab Regiment]
 *
 *   dashboard.highlightState("Punjab");
 *   // => 1 (Punjab Regiment highlighted)
 *
 *   dashboard.getTotalMembers();
 *   // => 7 (3 + 4)
 *
 *   dashboard.removeContingent("Punjab Regiment");
 *   // => true
 */
export function createContingent(name, type, state, members) {
  // Your code here
  if(typeof(name) !== 'string' || typeof(type) !== 'string' || typeof(state) !== 'string' || !Array.isArray(members)) return null

  let div = document.createElement('div')
  div.className = 'contingent'
  div.dataset.name = name
  div.dataset.type = type
  div.dataset.state = state
  let h3 = document.createElement('h3')
  h3.textContent = name
  let span = document.createElement('span')
  span.className = 'type'
  span.textContent = type
  let span2 = document.createElement('span')
  span2.className = 'state'
  span2.textContent = state
  let ul = document.createElement('ul')
  members.forEach((item) => {
    let li = document.createElement('li')
    li.textContent = item
    ul.appendChild(li)
    li = null
  })
  div.appendChild(h3)
  div.appendChild(span)
  div.appendChild(span2)
  div.appendChild(ul)
  return div

}

export function setupParadeDashboard(container) {
  // Your code here
  if(!container) return null

  function addContingent(contingent){
    let element = createContingent(contingent.name,contingent.type,contingent.state,contingent.members)
    if(!element) return null
    container.appendChild(element)
    return element
  }
  function removeContingent(name){
    let list = container.querySelectorAll('.contingent')
    let isRemoved = false
    list.forEach((item) => {
      if(item.dataset.name === name){
        item.remove()
        isRemoved = true
      }
    })
    return isRemoved
  }
   function moveContingent(name, direction) {
  const el = container.querySelector(`.contingent[data-name="${name}"]`);
  if (!el) return false;

  if (direction === "up") {
    const prev = el.previousElementSibling;
    if (!prev) return false;
    container.insertBefore(el, prev);
    return true;
  }

  if (direction === "down") {
    const next = el.nextElementSibling;
    if (!next) return false;
    container.insertBefore(next, el);
    return true;
  }

  return false;
}
   function getContingentsByType(type){
      let list = Array.from(container.querySelectorAll('.contingent'))
      let matchedList = list.filter((item) => item.dataset.type === type )
      return matchedList
   }

   function highlightState(state){
     let list = Array.from(container.querySelectorAll('.contingent'))
     let highlightCount = 0
      list.forEach((item) => {
         if(item.dataset.state === state){
          item.classList.add('highlight')
          highlightCount++
         }else{
          item.classList.remove('highlight')
         }
      })
      return highlightCount
   }
   function  getParadeOrder(){
      let list = Array.from(container.querySelectorAll('.contingent'))
      let nameArr = list.map((item) => item.dataset.name)
      return nameArr
   }
   function getTotalMembers(){
    let liCount = 0
     let list = Array.from(container.querySelectorAll('.contingent'))
     list.forEach((item) => {
      let ul = item.querySelector('ul')
      if(ul)liCount += ul.childElementCount
      ul = null
     })
     return liCount
   }
   return {
    addContingent,
    removeContingent,
    moveContingent,
    getContingentsByType,
    highlightState,
    getParadeOrder,
    getTotalMembers

   }
}
