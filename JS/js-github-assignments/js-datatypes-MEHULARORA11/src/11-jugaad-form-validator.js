/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  // Your code here
  let isValid = false
  
  let Error = {}
  // if(formData.name !== formData.name.trim() || (formData.name.length<2 && formData.name.length>50)){ // this line is wrong as a number can't be greater than 50 and smaller than 2 at the same time so ..
  if(formData.name !== formData.name.trim() || !(formData.name.length>=2 && formData.name.length<=50)){  
  Error.name = "Name must be 2-50 characters"
  }
  let index = formData.email.indexOf("@")
  let index2 = formData.email.indexOf("@",(index+1))
  if(!formData.email.includes("@") || !formData.email.includes(".",index) || index2 !== -1){
    Error.email = "Invalid email format"
  }
  if(formData.phone.length !== 10 || !/^\d+$/.test(formData.phone) || !(/^[6789]/.test(formData.phone)) ){
Error.phone = "Invalid Indian phone number"
  }
  if(isNaN(Number(formData.age)) || Number(formData.age) !== parseInt(formData.age) || !(formData.age>=16&&formData.age<=100)){
   Error.age = "Age must be an integer between 16 and 100"
  }
  if(formData.pincode.length !== 6 || !/^[1-9]\d*$/.test(formData.pincode)){
    Error.pincode = "Invalid Indian pincode"
  }
  if(Boolean(formData.agreeTerms) === false){
Error.agreeTerms = "Must agree to terms"
  }

  if(formData.state === '' || formData.state === null || formData.state === undefined){
     Error.state = "State is required"
  }

  if(Object.keys(Error).length === 0){
isValid = true
  }

  let obj = {
    isValid:isValid,
    errors:Error
  }
  return obj

}