/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here
  if(typeof(student) !== 'object' || student === null || typeof(student.name) !== 'string' || !student.name || typeof(student.marks) !== 'object' || Array.isArray(student.marks) || student.marks === null || Object.keys(student.marks).length === 0){
    return null
  }
  let marks = Object.values(student.marks)
  for(let mark of marks){
    if(mark>100 || mark<0 || !Number(mark)){
      return null
    }
  }
  let total = marks.reduce((acc,curr) => {
    acc = acc + curr
    return acc
  },0)
let percnt = parseFloat(((total/ (marks.length * 100)) * 100).toFixed(2))
  // "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
  let grade 
  if(percnt>=90){
    grade = 'A+'
  }else if(percnt>=80){
    grade = 'A'
  }else if(percnt>=70){
    grade = 'B'
  }else if(percnt>=60){
    grade = 'C'
  }else if(percnt>=40){
    grade = 'D'
  }else if(percnt<40){
    grade = 'F'
  }
let subjectCount = marks.length
let subject_marks = Object.entries(student.marks)
let passed = subject_marks.filter((([key,value]) => value>=40))
let failed = subject_marks.filter((([key,value]) => value<40))
let passedSubj = passed.map((item) => item[0])
let failedSubj = failed.map((item) => item[0])
// let low = Number.MAX_SAFE_INTEGER
// let high = Number.MIN_SAFE_INTEGER
// let low1 = low
// let high1 = high
let lowSubj = subject_marks.reduce((acc,curr) => {
  if(curr[1] < acc[1]){
    acc = curr
    return acc
  }
  return acc
},[2000,2000])
let highSubj = subject_marks.reduce((acc,curr) => {
  if(curr[1] > acc[1]){
    acc = curr
    return acc
  }
  return acc
},[-1,-1])



// for(let [subj1,subj2] of subject_marks){
//  console.log(subj1,subj2);
// high = Math.max(high,subj2)
// low = Math.min(low,subj2)
// if(high1 !== high){
//     high1 = high
//     highSubj = subj1
// }
// if(low1 !== low){
//     low1 = low
//     lowSubj = subj1
// }

 
// }

return {name:student.name,totalMarks:total,percentage:percnt,grade:grade,highestSubject:highSubj[0],lowestSubject:lowSubj[0],passedSubjects:passedSubj,failedSubjects:failedSubj,subjectCount:subjectCount}
}