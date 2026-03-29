/**
 * 🙏 Aarti Form - Form Handling, preventDefault & Validation
 *
 * Mandir ki aarti booking form bana rahe hain! Bhakton ka naam, aarti type,
 * aur date validate karke submit karna hai. Form submit hone pe page reload
 * nahi hona chahiye (preventDefault), pehle sab fields validate karo,
 * phir success ya error callback call karo. Jaise mandir mein pujari
 * entry check karta hai ki sab theek hai, waise hi form ko validate karo.
 *
 * Functions:
 *
 *   1. validateName(name)
 *      - Name must be a string, 2-50 characters long
 *      - Only letters (a-z, A-Z) and spaces allowed
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages (Hinglish):
 *        - Not string: "Naam string hona chahiye"
 *        - Too short: "Naam mein kam se kam 2 characters hone chahiye"
 *        - Too long: "Naam 50 characters se zyada nahi ho sakta"
 *        - Invalid chars: "Naam mein sirf letters aur spaces allowed hain"
 *
 *   2. validateDate(dateString)
 *      - Must be a valid date string in YYYY-MM-DD format
 *      - Must be today or a future date (past dates not allowed)
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages:
 *        - Not string: "Date string honi chahiye"
 *        - Invalid format: "Date YYYY-MM-DD format mein honi chahiye"
 *        - Past date: "Date aaj ya future ki honi chahiye"
 *
 *   3. validateAartiType(type)
 *      - Must be one of: "morning", "evening", "special"
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages:
 *        - Not string: "Aarti type string hona chahiye"
 *        - Invalid type: "Aarti type morning, evening, ya special mein se hona chahiye"
 *
 *   4. setupAartiForm(formElement, onSuccess, onError)
 *      - Adds "submit" event listener on formElement with preventDefault()
 *      - On submit: reads form fields:
 *        - name: from input/element with name="name" (formElement.elements.name.value)
 *        - date: from input with name="date"
 *        - aartiType: from select/input with name="aartiType"
 *      - Validates all three fields using above functions
 *      - If ALL valid: calls onSuccess({ name, date, aartiType })
 *      - If ANY invalid: calls onError(errorsArray) where errorsArray contains
 *        error strings from each failed validation
 *      - Returns cleanup function that removes the submit listener
 *      - Agar formElement null/undefined, return null
 *      - Agar onSuccess or onError not functions, return null
 *
 *   5. createBookingSummary(booking)
 *      - Takes { name, date, aartiType } object
 *      - Creates a div.booking-summary containing:
 *        - h3 with text "Booking Confirmation"
 *        - p.booking-name with text "Bhakt: {name}"
 *        - p.booking-date with text "Date: {date}"
 *        - p.booking-type with text "Aarti: {aartiType}"
 *      - Returns the div element
 *      - Agar booking null/undefined or missing fields, return null
 *
 * Hint: event.preventDefault() form ka default submit behavior rokta hai.
 *   formElement.elements se form ke inputs access karo by name attribute.
 *
 * @example
 *   validateName("Rahul Sharma");
 *   // => { valid: true, error: null }
 *
 *   validateName("R");
 *   // => { valid: false, error: "Naam mein kam se kam 2 characters hone chahiye" }
 *
 *   validateDate("2025-12-25");
 *   // => { valid: true, error: null } (if date is in future)
 *
 *   validateAartiType("morning");
 *   // => { valid: true, error: null }
 *
 *   const summary = createBookingSummary({
 *     name: "Rahul", date: "2025-12-25", aartiType: "morning"
 *   });
 *   // => <div class="booking-summary">...</div>
 */
export function validateName(name) {
  // Your code here
  try {
    if(typeof(name) !== 'string') throw new Error("Naam string hona chahiye")
    if(name.length<2) throw new Error("Naam mein kam se kam 2 characters hone chahiye")
    if(name.length>50) throw new Error("Naam 50 characters se zyada nahi ho sakta")
      if(!(/^[a-z A-Z]+$/.test(name))) throw new Error("Naam mein sirf letters aur spaces allowed hain")
        return { valid: true, error: null }
  } catch (error) {
    return { valid: false, error: error.message }
  }
}

export function validateDate(dateString) {
  // Your code here
   try {
    if(typeof(dateString) !== 'string') throw new Error("Date string honi chahiye")
      let arr = dateString.split('-')
      if(!(arr.every((item,index) => {
        if(index === 0 && item.length === 4){
           return true
        }
        if(index === 1 && item.length === 2){
           return true
        }
        if(index === 2 && item.length === 2){
           return true
        }
        return false
      }))) throw new Error("Date YYYY-MM-DD format mein honi chahiye")

      let today =   new Date()
      if((new Date(dateString)).getFullYear() < today.getFullYear() || (new Date(dateString)).getMonth() < today.getMonth() || (new Date(dateString)).getDay() < today.getDay()) throw new Error("Date aaj ya future ki honi chahiye")
    return { valid: true, error: null }
  } catch (error) {
    return { valid: false, error: error.message }
  }
}

export function validateAartiType(type) {
  // Your code here
 
  try {

    if(typeof type !== 'string') throw new Error("Aarti type string hona chahiye")

     switch (type) {
    case 'morning':      
      break;
    case 'evening':      
      break;
    case 'special':      
      break;
      default: throw new Error("Aarti type morning, evening, ya special mein se hona chahiye")
  }

    return  { valid: true, error: null }

  } catch (error) {
    return { valid: false, error: error.message }
  }

  
 
}

export function setupAartiForm(formElement, onSuccess, onError) {
  // Your code here
  if(!formElement || typeof(onSuccess) !== 'function' || typeof(onError) !== 'function') return null 
  let funct = (e) => {
     e.preventDefault()
     let name = formElement.elements.name.value
     let date = formElement.elements.date.value
     let aartiType = formElement.elements.aartiType.value

     let valid1 = validateName(name)
     let valid2 = validateDate(date)
     let valid3 = validateAartiType(aartiType)
     if(valid1.valid && valid2.valid && valid3.valid){
      onSuccess({name,date,aartiType})
     }else{
      let errorArr = []
         if(!valid1.valid){
          errorArr.push(valid2.error)
         }
         if(!valid2.valid){
          errorArr.push(valid2.error)
         }
         if(!valid3.valid){
          errorArr.push(valid3.error)
         }
         onError(errorArr)
     }

   
  }
  formElement.addEventListener('submit',funct)
    return function cleanUp(){
       formElement.removeEventListener('submit',funct)
     }
}

export function createBookingSummary(booking) {
  // Your code here
  if(!booking || !booking.name || !booking.date || !booking.aartiType) return null

  let div = document.createElement('div')
  div.className = 'booking-summary'
  let h3 = document.createElement('h3')
  h3.textContent = "Booking Confirmation"
  let p_name = document.createElement('p')
  p_name.className = 'booking-name'
  p_name.textContent = `Bhakt: ${booking.name}`
  let p_date = document.createElement('p')
  p_date.className = 'booking-date'
  p_date.textContent = `Date: ${booking.date}`
  let p_type = document.createElement('p')
  p_type.className = 'booking-type'
  p_type.textContent = `Aarti: ${booking.aartiType}`
  div.appendChild(h3)
  div.appendChild(p_name)
  div.appendChild(p_date)
  div.appendChild(p_type)
  return div

}
