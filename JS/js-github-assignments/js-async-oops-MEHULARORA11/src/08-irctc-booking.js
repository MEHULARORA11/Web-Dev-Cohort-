/**
 * 🚂 IRCTC Train Ticket Booking - async/await
 *
 * IRCTC pe train ticket book karna India ka sabse mushkil kaam hai! Lekin
 * async/await se yeh kaam asan ho jaata hai. Simulate karo API calls ko
 * async functions se — seat check karo, ticket book karo, cancel karo,
 * aur status check karo. Sab kuch await se sequentially hoga.
 *
 * Function: checkSeatAvailability(trainNumber, date, classType)
 *   - async function, returns a Promise
 *   - Simulates API call with a small delay (~100ms)
 *   - Validates trainNumber: must be a string of exactly 5 digits (e.g., "12345")
 *   - Validates classType: must be one of "SL", "3A", "2A", "1A"
 *   - Validates date: must be a non-empty string
 *   - If invalid trainNumber: throws Error "Invalid train number! 5 digit hona chahiye."
 *   - If invalid classType: throws Error "Invalid class type!"
 *   - If invalid date: throws Error "Date required hai!"
 *   - If valid: returns {
 *       trainNumber, date, classType,
 *       available: true/false (randomly, ~70% chance true),
 *       seats: random number 0-50,
 *       waitlist: random number 0-20
 *     }
 *   - If seats > 0, available = true; if seats === 0, available = false
 *
 * Function: bookTicket(passenger, trainNumber, date, classType)
 *   - async function
 *   - passenger is { name, age, gender } object
 *   - Validates passenger has name, age, gender
 *   - Awaits checkSeatAvailability(trainNumber, date, classType)
 *   - If available: returns {
 *       pnr: "PNR" + Math.floor(Math.random() * 1000000),
 *       passenger, trainNumber, date,
 *       class: classType,
 *       status: "confirmed",
 *       fare: calculated (SL:250, 3A:800, 2A:1200, 1A:2000)
 *     }
 *   - If not available: returns with status: "waitlisted", waitlistNumber: random 1-20
 *
 * Function: cancelTicket(pnr)
 *   - async function
 *   - Simulates cancellation with small delay
 *   - Validates pnr: must be a non-empty string starting with "PNR"
 *   - If invalid: throws Error "Invalid PNR number!"
 *   - Returns { pnr, status: "cancelled", refund: random amount 100-1000 }
 *
 * Function: getBookingStatus(pnr)
 *   - async function
 *   - Simulates status check with small delay
 *   - Validates pnr: must start with "PNR"
 *   - If invalid: throws Error "Invalid PNR number!"
 *   - Returns { pnr, status: random from ["confirmed", "waitlisted", "cancelled"],
 *     lastUpdated: new Date().toISOString() }
 *
 * Function: bookMultipleTickets(passengers, trainNumber, date, classType)
 *   - async function
 *   - Takes array of passenger objects
 *   - Books for EACH passenger SEQUENTIALLY (await in loop, one by one)
 *   - Returns array of booking results (each is bookTicket result or error object)
 *   - If individual booking fails, catch error and include { passenger, error: message }
 *     in results, continue with next passenger
 *   - Agar passengers array empty, return empty array
 *
 * Function: raceBooking(trainNumbers, passenger, date, classType)
 *   - async function
 *   - Takes array of trainNumbers
 *   - Tries booking on ALL trains in PARALLEL
 *   - Returns first successful booking using Promise.any-like approach
 *   - If all fail, throws Error "Koi bhi train mein seat nahi mili!"
 *   - Hint: use Promise.any or map trainNumbers to bookTicket promises
 *
 * Rules:
 *   - ALL functions must be async
 *   - Use await for sequential operations
 *   - bookMultipleTickets must be sequential (one after another)
 *   - raceBooking must be parallel (all at once)
 *   - Proper error handling with try/catch
 *   - Train number format: exactly 5 digit string
 *   - PNR format: starts with "PNR"
 *
 * @example
 *   const availability = await checkSeatAvailability("12345", "2025-01-15", "3A");
 *   // => { trainNumber: "12345", date: "2025-01-15", classType: "3A",
 *   //      available: true, seats: 35, waitlist: 5 }
 *
 * @example
 *   const booking = await bookTicket(
 *     { name: "Rahul", age: 28, gender: "M" },
 *     "12345", "2025-01-15", "3A"
 *   );
 *   // => { pnr: "PNR483921", passenger: {...}, trainNumber: "12345",
 *   //      date: "2025-01-15", class: "3A", status: "confirmed", fare: 800 }
 *
 * @example
 *   const results = await bookMultipleTickets(
 *     [{ name: "Amit", age: 30, gender: "M" }, { name: "Priya", age: 25, gender: "F" }],
 *     "12345", "2025-01-15", "SL"
 *   );
 *   // => [{ pnr: "PNR...", ...}, { pnr: "PNR...", ...}]
 */
export async function checkSeatAvailability(trainNumber, date, classType) {
  // Your code here
  try {
     return await new Promise((res,rej) => {
              if(typeof(trainNumber) !== 'string' || trainNumber.length !== 5) return rej(new Error("Invalid train number! 5 digit hona chahiye."))
      switch (classType) {
        case 'SL':      
        case '3A':      
        case '2A':
        case '1A':
          break
        default:return rej(new Error("Invalid class type!"))
      }
      if(typeof(date) !== 'string' || !date) return rej(new Error("Date required hai!"))
      setTimeout(() => {
      let seats = Math.floor(Math.random()*51)
    let available = seats===0?false:true
        res( {
       trainNumber, date, classType,
       available,
       seats,
       waitlist: Math.floor(Math.random()*21)
        })
  })
      },100)
   
  } catch (error) {
   throw error   
  }
       

}

export async function bookTicket(passenger, trainNumber, date, classType) {
  // Your code here
  if(!passenger.hasOwnProperty('name') || !passenger.hasOwnProperty('age') || !passenger.hasOwnProperty('gender')) return
  let response = await checkSeatAvailability(trainNumber,date,classType)
  let available = response.available
  if(available){
    let fare = null
    switch (classType) {
      case 'SL': fare = 250      
        break;
      case '3A': fare = 800      
        break;
      case '2A': fare = 1200      
        break;
      case '1A': fare = 2000      
      break;
    }
    return {
      pnr:'PNR' + Math.floor(Math.random() * 1000000),
      passenger, trainNumber, date,
      class: classType,status: "confirmed",
      fare

    }
  }else{
    return {status: "waitlisted", waitlistNumber: Math.floor(Math.random() * (20-1) + 1)}
  }
}

export async function cancelTicket(pnr) {
  // Your code here

     if(typeof(pnr) !== 'string' || !pnr || pnr.slice(0,3) !== 'PNR'){
      throw new Error("Invalid PNR number!")
     }
     return new Promise((res,rej) => {
      res({
        pnr,
        status: "cancelled",
        refund:Math.floor(Math.random() * (1000 - 100) + 100)
      })
     })
   

 
}

export async function getBookingStatus(pnr) {
  // Your code here
  if(!pnr.startsWith('PNR')) throw new Error("Invalid PNR number!")
    let arr = ["confirmed", "waitlisted", "cancelled"]
    let status = arr[Math.floor(Math.random() * 3)]
    return new Promise((res,rej) => {
      setTimeout(() => {
           res({
         pnr,status,lastUpdated: new Date().toISOString()
       })
      },100)
       
    })
}

export async function bookMultipleTickets(passengers, trainNumber, date, classType) {
  if (!Array.isArray(passengers) || passengers.length === 0) {
    return []
  }

  const results = []

  for (const passenger of passengers) {
    try {
      const booking = await bookTicket(passenger, trainNumber, date, classType)
      results.push(booking)
    } catch (error) {
      results.push({
        passenger,
        error: error.message
      })
    }
  }

  return results
}

export async function raceBooking(trainNumbers, passenger, date, classType) {
  // Your code here
  let promises = trainNumbers.map((train) => bookTicket(passenger
    ,train,date,classType)) 
   return Promise.any(promises)
   .then(res => res)
   .catch(err => {
    throw err.message
   })
}