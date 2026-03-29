/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  // Your code here
  if(!containerElement) return null
  containerElement.addEventListener('click',(e) => {
    if(e.target.classList.contains('remove-btn')){
      e.target.closest('.guest-item').remove()
    }
  })//
  function addGuest(name,side){
    let div = document.createElement('div')
    div.className = 'guest-item'
    let span = document.createElement('span')
    let btn = document.createElement('button')
    btn.className = 'remove-btn'
    btn.textContent = 'Remove'
    span.textContent = name
    div.setAttribute('data-name',name)
    div.setAttribute('data-side',side)
    div.appendChild(span)
    div.appendChild(btn)
    containerElement.appendChild(div)
    return div
  }

  function removeGuest(name){
    const itemList = document.querySelectorAll('.guest-item')
    for(let item of itemList){
      if(item.getAttribute('data-name') === name){
        item.remove()
          return true
      }
    } // don't use forEach as in it we can't use return,break,continue => as ye work hi nahin karte forEach ke andar also async function bhi work nahin karte forEach ke andar 

    return false
  }
  function getGuests(){
    let itemList = document.querySelectorAll('.guest-item')
    let arr = []
    itemList.forEach((item) => {
      let name = item.getAttribute('data-name')
      let side = item.getAttribute('data-side')
      arr.push({name,side})
      name = null
      side = null
    })
    return arr
  }

  return {addGuest,removeGuest,getGuests}
}

export function setupThemeSelector(containerElement, previewElement) {
  // Your code here
  if(!containerElement || !previewElement) return null
  let button1 = document.createElement('button')
  button1.classList.add('theme-btn')
  button1.setAttribute('data-theme','traditional')
  button1.textContent = 'traditional'
  let button2 = document.createElement('button')
  button2.classList.add('theme-btn')
  button2.setAttribute('data-theme','modern')
  button2.textContent = 'modern'
  let button3 = document.createElement('button')
  button3.classList.add('theme-btn')
  button3.setAttribute('data-theme','royal')
  button3.textContent = 'royal'
  containerElement.appendChild(button1)
  containerElement.appendChild(button2)
  containerElement.appendChild(button3)
  containerElement.addEventListener('click',(e) => {
  if(e.target.classList.contains('theme-btn')){
    previewElement.classList.add(`${e.target.getAttribute('data-theme')}`)
    previewElement.setAttribute('data-theme',`${e.target.getAttribute('data-theme')}`)
  }
  })
  return {
    getTheme(){
      return previewElement.getAttribute('data-theme') || null
    }
  }

}

export function setupCardEditor(cardElement) {
  if (!cardElement) return null;

  cardElement.addEventListener("click", (e) => {
    const editable = e.target.closest("[data-editable]");
    const current = cardElement.querySelector(".editing");

    // Case 1: clicked on editable element
    if (editable && cardElement.contains(editable)) {
      // remove previous editing
      if (current) {
        current.classList.remove("editing");
        current.contentEditable = "false";
      }

      // set new editing
      editable.classList.add("editing");
      editable.contentEditable = "true";
    } 
    // Case 2: clicked outside editable (on card)
    else {
      if (current) {
        current.classList.remove("editing");
        current.contentEditable = "false";
      }
    }
  });

  return {
    getContent(field) {
      const el = cardElement.querySelector(`[data-editable="${field}"]`);
      return el ? el.textContent : null;
    }
  };
}