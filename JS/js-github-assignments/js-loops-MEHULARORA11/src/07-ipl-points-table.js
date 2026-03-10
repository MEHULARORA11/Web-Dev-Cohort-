/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  if(!Array.isArray(matches) || matches.length === 0) return []
  let uniquTeams = {}
    matches.forEach((item) => {
      if(!uniquTeams[item.team1]){ // important check as then again and again overwrite karna padta so optimization decreases
        uniquTeams[item.team1] = {team:item.team1,played:0,won:0,lost:0,tied:0,noResult:0,points:0} // note the line uniquTeams.item.team1 is wrong as it means we want to access team1 inside item which is inside uniquTeams so it is wrong instead use uniquTeams[items.team1] now it means we need a key of obj items.team1 
      }
      if(!uniquTeams[item.team2]){
        uniquTeams[item.team2] = {team:item.team2,played:0,won:0,lost:0,tied:0,noResult:0,points:0}
      }      
    })
   
    let arr = []

    for(let match of matches){
        let result = match.result
        let team1 = match.team1
        let team2 = match.team2
        let winningTeam = match.winner
        switch(result){
            case 'win':{
                if(winningTeam === team1){
                   uniquTeams[team1].points+=2
                uniquTeams[team1].won++
                uniquTeams[team1].played++
                uniquTeams[team2].lost++
                uniquTeams[team2].played++
                }else{
                uniquTeams[team2].points+=2
                uniquTeams[team2].won++
                uniquTeams[team2].played++
                uniquTeams[team1].lost++
                uniquTeams[team1].played++
                }
               
            }
            break;
            case 'tie':{
                 uniquTeams[team1].points++
                 uniquTeams[team2].points++
                uniquTeams[team1].tied++
                uniquTeams[team2].tied++
                uniquTeams[team1].played++
                uniquTeams[team2].played++
            }
            break
            case 'no_result':{
                 uniquTeams[team1].points++
                 uniquTeams[team2].points++
                uniquTeams[team1].noResult++
                uniquTeams[team2].noResult++
                uniquTeams[team1].played++
                uniquTeams[team2].played++
            }
        }
    }
    let teamArr = Object.values(uniquTeams)
    teamArr.sort((a,b) => {
      if(a.points !== b.points){
        return b.points - a.points
      }else{
       return a.team.localeCompare(b.team) // note the line return b.team - a.team is incorrect as we cant do -ve operation in strings try to make ur own sort to know how sortworks on =ve and -ve returns  
      }
    })
    return teamArr   
}
/**
 * see the concept hoe .sort works
 * 
 * 1️⃣ Default .sort() Behavior (Very Important)

If you do:

[10, 2, 30].sort()

You might expect:

[2, 10, 30]

But actual output is:

[10, 2, 30]

Why?

Because by default:

.sort() converts everything to strings and compares lexicographically (dictionary order).

So internally it compares:

"10"
"2"
"30"

And dictionary-wise:

"10" < "2"   (because '1' comes before '2')

So default sort is string-based, not numeric.

2️⃣ How Custom Comparator Works

When you write:

arr.sort((a, b) => {
  return something
})

JavaScript repeatedly calls your function like this:

compare(a, b)

And expects:

Return Value	Meaning
Negative	a comes before b
Positive	b comes before a
0	Keep order
*/

