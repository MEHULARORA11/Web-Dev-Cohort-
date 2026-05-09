import mongoose from 'mongoose';

/**
 * TODO: Define Image schema
 *
 * Fields:
 * - originalName: String, required, trim, maxlength 255
 * - filename: String, required, unique
 * - mimetype: String, required, enum: ['image/jpeg', 'image/png', 'image/gif']
 * - size: Number, required, min 1, max 5MB (5 * 1024 * 1024)
 * - width: Number, required, min 1
 * - height: Number, required, min 1
 * - thumbnailFilename: String, required
 * - description: String, optional, trim, maxlength 500, default ''
 * - tags: [String], optional, default [], max 10 tags
 *   Use validate: { validator: (arr) => arr.length <= 10, message: 'Cannot have more than 10 tags' }
 * - uploadDate: Date, default Date.now
 *
 * Options:
 * - Enable timestamps (createdAt, updatedAt)
 *
 * Indexes:
 * - uploadDate: -1
 * - mimetype: 1, uploadDate: -1
 * - Text index on originalName and description for search
 */

const imageSchema = new mongoose.Schema(
  {
    originalName:{
     type:String,
     required:true,
     trim:true,
     maxlength:255
    },
    filename:{
      type:String,
      required:true,
      unique:true
    },
    mimetype:{
      type:String,
      required:true,
      enum:['image/jpeg', 'image/png', 'image/gif'],
    },
    size:{
      type:Number,
      required:true,
      min:1,
      max:5 * 1024 * 1024 // 5MB 
    },
    width:{
      type:Number,
      required:true,
      min:1
    },
    height:{
      type:Number,
      required:true,
      min:1
    },
    thumbnailFilename:{
      type:String,
      required:true
    },
    description:{
      type:String,
      trim:true,
      maxlength:500,
      default :''
    },
    tags:{
      type:[String],
      default:[],
      validate:{
        validator:arr => arr.length<=10,
        message:'Cannot have more than 10 tags'
      }
    },
    uploadDate:{
      type:Date,
      default:Date.now
    }
  },
  {
    timestamps:true
  }
);

// TODO: Add indexes
imageSchema.index({ uploadDate: -1 });
imageSchema.index({ mimetype: 1, uploadDate: -1 });
imageSchema.index({ originalName: 'text', description: 'text' });
// doubt in above three lines
 
//#region  //*=========== concept ===========
/**
 * 🧠 First: What is .index() in Mongoose?

👉 An index is like a shortcut for searching data faster.

Without index:

MongoDB scans every document (slow ❌)

With index:

MongoDB uses a pre-built structure (like a sorted list) (fast ✅)
📌 Now your 3 lines — explained one by one
1️⃣
imageSchema.index({ uploadDate: -1 });
✅ Meaning:
Create an index on uploadDate
-1 → descending order (newest first)
🧠 Why use this?

When you do:

Image.find().sort({ uploadDate: -1 })

👉 MongoDB can directly fetch sorted data
instead of sorting later.

🔥 Real-world use:
Show latest uploaded images first
Like Instagram feed
2️⃣
imageSchema.index({ mimetype: 1, uploadDate: -1 });
✅ This is a compound index

👉 It indexes two fields together

mimetype: 1 → ascending
uploadDate: -1 → descending
🧠 Why this matters

Used when you query like:

Image.find({ mimetype: 'image/jpeg' })
     .sort({ uploadDate: -1 })

👉 MongoDB:

Filters by mimetype
Already has data sorted by uploadDate

⚡ SUPER FAST

❗ Important concept (interview favorite)

👉 Order matters in compound index:

{ mimetype: 1, uploadDate: -1 }

Works for:

mimetype only ✅
mimetype + uploadDate ✅

But NOT for:

uploadDate alone ❌
3️⃣
imageSchema.index({ originalName: 'text', description: 'text' });
✅ This is a TEXT INDEX

👉 Used for searching words like Google

🧠 Why this exists

Without this:

Image.find({ originalName: "leaf disease" })

👉 Only exact match works ❌

With text index:

Image.find({
  $text: { $search: "leaf disease" }
})

👉 MongoDB can:

Search keywords
Match partial text
Rank relevance
🔥 Real-world use:

Search feature like:

"leaf disease"
"plant infection"
⚠️ Important rule

👉 MongoDB allows ONLY ONE text index per collection

So this is correct:

{ originalName: 'text', description: 'text' }
🧠 Big Picture (connect everything)
Index	Purpose
uploadDate: -1	Fast sorting (latest first)
mimetype + uploadDate	Filter + sort optimization
text index	Full-text search
🔥 Interview-Level Insight

Indexes are a trade-off:

✅ Pros:
Faster queries
❌ Cons:
Extra memory
Slower inserts (index also updates)
🚀 Simple analogy

Think of:

No index → reading whole book page by page
Index → using table of contents
💡 One-line summary (as you like)

👉 Indexes make queries fast by pre-organizing data for searching and sorting.

If you want next level:
I can show you how MongoDB actually stores indexes internally (B-tree) — that’s where real understanding starts.
 * 

 * i dd'nt get imageSchema.index({ originalName: 'text', description: 'text' }); at all , please explain with more examples

Alright — let’s slow this down and build it from zero → clear understanding. This one confuses a lot of people at first.

🧠 What this line actually means
imageSchema.index({ originalName: 'text', description: 'text' });
👉 It tells MongoDB:

“Create a search engine-like index on originalName and description so I can search words inside them.”


❌ Without this index (normal behavior)
Suppose your data is:
{  originalName: "Tomato leaf disease",  description: "Brown spots on leaves"}
Now you run:
Image.find({ originalName: "leaf" })
👉 Result: ❌ NOTHING
Because MongoDB looks for exact match, not partial words.

✅ With TEXT index (your line)
Now MongoDB builds a word-based index like:
WordDocumentstomatodoc1leafdoc1diseasedoc1browndoc1spotsdoc1

🔍 Now this works:
Image.find({  $text: { $search: "leaf" }})
👉 Result: ✅ It finds the document

💥 Key Idea
👉 TEXT index breaks sentences into individual words (tokens)
👉 Then searches those words

🔥 Example 1 (simple search)
Data:
{  originalName: "Apple leaf infection",  description: "Yellow patches on leaves"}

Query:
Image.find({  $text: { $search: "apple" }})
👉 ✅ Match (found in originalName)

Query:
Image.find({  $text: { $search: "yellow" }})
👉 ✅ Match (found in description)

🔥 Example 2 (multiple words)
Image.find({  $text: { $search: "leaf disease" }})
👉 MongoDB searches:


leaf


disease


👉 Returns documents containing either or both

🔥 Example 3 (ranking relevance)
If one document has both words:
"leaf disease detected"
and another has only:
"leaf spotted"
👉 MongoDB ranks:


More matching words → higher relevance



⚠️ VERY IMPORTANT (common mistake)
This will NOT work:
Image.find({ originalName: "leaf" }) ❌
You MUST use:
Image.find({ $text: { $search: "leaf" } }) ✅

🧠 Why two fields together?
{ originalName: 'text', description: 'text' }
👉 Means:
Search BOTH fields together as one combined text

Think like this:
Instead of:


searching originalName separately


searching description separately


👉 MongoDB treats them like ONE big paragraph

🚀 Real-world analogy
Imagine Google:
You type:
leaf disease
Google:


doesn’t care where word appears


just finds relevant pages


👉 TEXT index works same way

⚠️ Limitation (important)
👉 Only ONE text index allowed per collection
So this is correct:
imageSchema.index({  originalName: 'text',  description: 'text'});

🧠 One-line understanding (your style)
👉 Text index lets MongoDB search words inside strings instead of exact matches.

🔥 If still unclear, answer this:
Do you understand:


Why normal .find() fails?


Why $text works?


If not, I’ll break it down even simpler (even more fundamental than this).
 */
//#endregion  //*======== concept ===========

// TODO: Create and export the Image model
export const Image = mongoose.model('Image', imageSchema);
