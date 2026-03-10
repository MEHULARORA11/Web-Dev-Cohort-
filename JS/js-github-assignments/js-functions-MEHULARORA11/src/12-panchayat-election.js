/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  // Your code here
  
  
  for(let c of candidates){
    c.votes = 0
  }
let dummyCandidates = [...candidates]

  let registeredVoter = []
  function registerVoter(voter){
    let dummyVoter = {...voter}
    if(!dummyVoter.id) return false
    if(typeof(dummyVoter) !== 'object'  || !dummyVoter || Array.isArray(dummyVoter) || dummyVoter.age < 18) return false
    for(let vote of registeredVoter){
      if(!vote.id) return false
      if(vote.id === dummyVoter.id) return false
    }
    dummyVoter.isVoted = false
     registeredVoter.push(dummyVoter)
     return true
        
  }

  function castVote(voterId, candidateId, onSuccess, onError){
    if(!(registeredVoter.some((voter) => voter.id === voterId && voter.isVoted === false) && dummyCandidates.some((voter) => voter.id === candidateId))){
      return onError("voter not registered")
    }else{
     for(let a of registeredVoter){
      if(a.id === voterId){
        a.isVoted = true
      }
    }

     for(let a of dummyCandidates){
      if(a.id === candidateId){
        a.votes++
      }
     }
     return onSuccess({voterId,candidateId})
    

  }

}

function getResults(sortFn){
  let dummy = [...dummyCandidates]
  if(!sortFn){
    dummy.sort((a,b) => b.votes - a.votes)
  }else{
    dummy.sort(sortFn)
  }
  return dummy
}

function getWinner(){
  let max = {}
  max.votes = 0
  for(let a of dummyCandidates){
    if(a.votes>max.votes){
      max = a
    }
  }
  if(max.votes === 0) return null
  let count = dummyCandidates.filter((item) => item.votes === max.votes)
  if(count.length === 0) return null
  return count[0]
}

return {
registerVoter,castVote,getResults,getWinner
}

}

export function createVoteValidator(rules){
  function object(obj){
    let isValid = false
    for(let item of rules.requiredFields){
      if(obj.hasOwnProperty(item)){
        isValid = true
      }else{
        isValid = false
        break
      }
    }
    if(obj.age <18) isValid = false

    return {valid:isValid,reason:""}

  }
  return object
}




export function countVotesInRegions(regionTree) {
  // Your code here
  if(!regionTree || typeof(regionTree) !== 'object') return 0

  let count = regionTree.votes || 0 // important line
  if(Array.isArray(regionTree.subRegions)){
   for(let sub of regionTree.subRegions){
    count+= countVotesInRegions(sub)
   }
  }
  return count

}

export function tallyPure(currentTally, candidateId) {
  // Your code here
  let newObj = {...currentTally}
  if(!newObj.hasOwnProperty(candidateId)){
    newObj[candidateId] = 1
    return newObj
  }
  newObj[candidateId]++
  return newObj
}
