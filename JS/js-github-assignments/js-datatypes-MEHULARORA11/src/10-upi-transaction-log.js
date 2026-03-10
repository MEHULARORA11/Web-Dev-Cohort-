/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {
  // Your code here
  if(!Array.isArray(transactions)) return null
  
  // let validTransactions = transactions.filter((item) => item.amount>0).filter((item) => item.type === ('credit' || 'debit'))
  /***
   * the above line is wrong as 
   * // also note if i say transactions.filter((item) => item.type === ('credit' || 'debit')) // hence js will read it as item.type === 'credit' as logical or returns first truthy and last falsy , and ampty string is falsy and non empty is truthy ==> so i should write it like ==> transaction.filter((item) => item.type === 'credit' || item.type === 'debit') 
   * so see below
   */

  let validTransactions = transactions.filter((item) => item.amount>0).filter((item) => item.type === ('credit') || item.type === ('debit'))
  if(validTransactions.length === 0) return null

  function highest(arr){
let high = Number.MIN_SAFE_INTEGER
for(let item of arr){
    high = Math.max(high,item[1])
}
return high
  }


  let obj = validTransactions.reduce((acc,curr) => {
    if(curr.type === 'credit'){
        acc.creditAmt+=curr.amount
    }
    if(curr.type === 'debit'){
        acc.debitAmt+=curr.amount
    }
    acc.transactionsCount++;
    acc.highestTransaction = Math.max(acc.highestTransaction,curr.amount)
    return {
        creditAmt:acc.creditAmt,
        debitAmt:acc.debitAmt,
        transactionsCount:acc.transactionsCount,
        highestTransaction:acc.highestTransaction
    }
  },{creditAmt:0,debitAmt:0,transactionsCount:0,highestTransaction:Number.MIN_SAFE_INTEGER,})


  let isAbove100 = validTransactions.every((item) => item.amount>100)
  let isLargeTransaction = validTransactions.some((item) => item.amount>=5000)
  let highestTransaction = Number.MIN_SAFE_INTEGER
  for(let item of validTransactions){
    highestTransaction = Math.max(highestTransaction,item.amount)
  }
  let highestTransactionObj = validTransactions.filter((item) => item.amount === highestTransaction)

  let category = validTransactions.map((item) => item.category)
let final = []
  for(let item of category){
    let totalAmtPerCategory = validTransactions.reduce((acc,curr) => {
  if(curr.category === item){
    acc+=curr.amount
  }
  return acc
    },0)
    final.push(Array.of(item,totalAmtPerCategory))
  }
 
  let amtLeft = obj.creditAmt - obj.debitAmt
  let avgTransaction = Math.round((obj.creditAmt + obj.debitAmt)/obj.transactionsCount)
  let name2 = validTransactions[0].to
   let name3
   let arr = []
   for(let item in validTransactions){
    item = Number(item)
 let name1 = validTransactions[item].to
   

    // if(name1 !== name2){
    //     name2 = name1
    // }

   if(name1 !==name3){
     name2 = validTransactions[item].to
     let count = validTransactions.reduce((acc,curr) => {
         if(curr.to === name2){
            acc++
         }
         return acc
    },0)
    name3 = name2
     arr.push(Array.of(name2,count))
 
}
   }
   let numHigh = highest(arr)
let highArr = arr.filter((item) => item[1] === numHigh)


  return { totalCredit: obj.creditAmt, totalDebit: obj.debitAmt, netBalance: amtLeft, transactionCount: obj.transactionsCount, avgTransaction: avgTransaction, highestTransaction: highestTransactionObj[0], categoryBreakdown: Object.fromEntries(final), frequentContact: highArr[0][0], allAbove100: isAbove100, hasLargeTransaction: isLargeTransaction }

}

console.log(analyzeUPITransactions([
      { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
      { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
      { id: "T3", type: "debit", amount: 10, to: "Swiggy", category: "food", date: "2025-01-03" },
      { id: "T2", type: "debit", amount: 200, to: "Swi", category: "food", date: "2025-01-02" },
      { id: "T3", type: "debit", amount: 10, to: "Swi", category: "food", date: "2025-01-03" }
    ]));
