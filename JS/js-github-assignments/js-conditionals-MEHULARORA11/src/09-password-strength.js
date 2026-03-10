/**
 * 🔒 SecureApp Password Checker
 *
 * You're building the signup page for SecureApp, a new productivity tool.
 * The product manager wants a password strength meter that gives users
 * real-time feedback as they type their password.
 *
 * The checker evaluates 5 criteria:
 *   1. At least 8 characters long
 *   2. Contains at least one uppercase letter (A-Z)
 *   3. Contains at least one lowercase letter (a-z)
 *   4. Contains at least one number (0-9)
 *   5. Contains at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)
 *
 * Strength levels based on how many criteria are met:
 *   - 0–1 criteria → "weak"
 *   - 2–3 criteria → "medium"
 *   - 4 criteria   → "strong"
 *   - All 5        → "very strong"
 *
 * Rules:
 *   - Empty string → "weak"
 *   - Non-string input → "weak"
 *
 * @param {string} password - The password to evaluate
 * @returns {string} "weak", "medium", "strong", or "very strong"
 */
export function checkPasswordStrength(password) {
  // Your code here

  if(password === ''){
    return 'weak'
  }
  if(typeof(password) !== 'string'){
    return 'weak'
  }
  let regex1 = /[0-9]/
  let regex2 = /[a-z]/
  let regex3 = /[A-Z]/
  let regex4 = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/
  let regex5 = password.toString().length
let count = 0
  if(regex5>=8){
    count++
  }
  if(regex1.test(password)){
    count++
  }
  if(regex2.test(password)){
    count++
  }
  if(regex3.test(password)){
    count++
  }
  if(regex4.test(password)){
    count++
  }

  if(count === 0 || count === 1){
    return 'weak'
  }else if(count === 2 || count === 3){
    return 'medium'
  }else if(count === 4){
    return 'strong'
  }else if(count === 5){
    return 'very strong'
  }
  
}
