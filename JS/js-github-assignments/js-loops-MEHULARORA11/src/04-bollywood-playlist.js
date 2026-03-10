/**
 * 🎵 Simran ki Road Trip Playlist
 *
 * Simran aur uske dost road trip pe jaa rahe hain Delhi se Jaipur!
 * Usne ek playlist banayi hai with song durations (in seconds). Lekin
 * trip sirf itni der ki hai - usse zyada songs mat daalo playlist mein.
 *
 * Rules (use while loop):
 *   - Songs array mein se ek ek song add karo
 *   - BEFORE adding a song, check: kya current total + is song ki duration
 *     maxDuration se zyada ho jayegi? Agar haan, toh STOP. Mat add karo.
 *   - Agar kisi song ki duration positive number nahi hai (negative, zero,
 *     NaN, string, etc.), skip that song and move to the next one
 *   - Continue until all songs are checked or maxDuration limit reached
 *
 * Validation:
 *   - Agar songs array nahi hai, return: { count: 0, totalDuration: 0 }
 *   - Agar maxDuration positive number nahi hai, return: { count: 0, totalDuration: 0 }
 *
 * @param {number[]} songs - Array of song durations in seconds
 * @param {number} maxDuration - Maximum total duration allowed in seconds
 * @returns {{ count: number, totalDuration: number }} Songs added and total duration
 *
 * @example
 *   buildPlaylist([240, 180, 300, 200], 600)
 *   // => { count: 2, totalDuration: 420 }
 *   // 240 + 180 = 420, next song 300 would make 720 > 600, so stop
 *
 *   buildPlaylist([100, -50, 200, 150], 400)
 *   // => { count: 3, totalDuration: 450 }
 *   // Wait, 100 + 200 + 150 = 450 > 400? Let me recalculate...
 *   // 100 added (total=100), skip -50, 200 added (total=300),
 *   // 150: 300+150=450 > 400, STOP.
 *   // => { count: 2, totalDuration: 300 }
 */
export function buildPlaylist(songs, maxDuration) {
  // Your code here
  if(!Array.isArray(songs) || songs.length === 0) return { count: 0, totalDuration: 0 }
  if(typeof(maxDuration) !== 'number' || maxDuration<=0) return { count: 0, totalDuration: 0 }
  let totalDuration = 0
  let count = 0
  let count1 = 0
  /**
   * // note the line while(totalDuration<=maxDuration) ==> this loop is a weak one so use while(count<songs.length){
   * why while(totalDuration<=maxDuration) 
it is a weak loop

Excellent question 👏
Now you’re asking about loop design philosophy, not syntax. Good.

You asked:

Why is while(totalDuration <= maxDuration) a weak loop condition?

Let’s break it properly.

🔥 1️⃣ Loop Condition Should Control Iteration Safety

A loop condition should answer:

"Is it safe to continue iterating?"

Your condition:

while (totalDuration <= maxDuration)

But ask yourself:

Does this guarantee:

You are still inside array bounds?

You are progressing through elements?

You won’t get stuck?

❌ No.

It only depends on totalDuration.

🔥 2️⃣ It Ignores Array Boundary

Suppose:

songs = [100, 200]
maxDuration = 1000

totalDuration will always be ≤ 1000.

So loop continues forever unless you manually break.

Your real iteration control variable is:

count

But your loop condition ignores it.

That’s weak design.

🔥 3️⃣ It Doesn’t Guarantee Progress

Good loop conditions depend on something that changes every iteration.

Example of strong loop:

while (count < songs.length)

Why strong?

Because:

count increases every iteration

Eventually it becomes false

Loop safely ends

Your condition:

while (totalDuration <= maxDuration)

If:

You skip invalid songs

Or forget to increment

Or song duration is 0

Then totalDuration may never change.

➡ Infinite loop risk.

🔥 4️⃣ Logical Responsibility Separation

In your problem, two things control stopping:

No more songs

Duration limit exceeded

The loop condition should control one of them.
The other should be handled inside with break.

Clean structure:

while (index < songs.length) {
    if (total + song > maxDuration) break;
}

Now:

Loop condition controls array boundary

break controls duration rule

This separation is clean.

🔥 5️⃣ Design Principle (Important)

A good loop condition should:

Be simple

Be predictable

Depend on iteration variable

Guarantee termination

Your condition depends on accumulated value — which is fragile.

🎯 Strong vs Weak Loop Comparison

Weak:

while (totalDuration <= maxDuration)

Strong:

while (i < songs.length)

Because index is deterministic.
Total duration is dynamic and conditional.

🧠 Think Like This

Loop condition = "Can I safely look at the next element?"

Not:
"Is some computed value still okay?"

🚀 Senior-Level Insight

Whenever you design a loop, ask:

What is my iteration variable?

If your loop condition doesn’t depend on that variable, it's usually weak.

You’re now thinking about control flow architecture.

That’s a big jump from beginner level 👏

If you want, next I can explain:

The 3 golden rules of safe loop design

Or how to detect infinite loop risks before running code
  */
  while(count<songs.length){ 
  if(typeof(songs[count]) !== 'number' || Number.isNaN(songs[count]) || songs[count]<=0){
    count++
    continue
  }
  if(totalDuration + songs[count]>maxDuration) break
  totalDuration+= songs[count]
  count++
  count1++
  }
return { count:count1, totalDuration }

}
