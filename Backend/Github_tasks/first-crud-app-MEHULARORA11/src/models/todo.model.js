import mongoose from "mongoose";

/**
 * TODO: Define Todo schema
 *
 * Fields:
 * - title: String, required, trim, min 3, max 120 chars
 * - completed: Boolean, default false
 * - priority: Enum ["low", "medium", "high"], default "medium"
 * - tags: Array of Strings, max 10 items, default []
 * - dueDate: Date, optional
 *
 * Options:
 * - Enable timestamps
 * - Add index: { completed: 1, createdAt: -1 }
 */

const todoSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      required:true,
      trim:true,
      minlength:3,
      maxlength:120
    },
    completed:{
      type:Boolean,
      default:false
    },
    priority:{
      type:String,
    enum: ["low", "medium", "high"],
     default :`medium`
    },
      tags:{
    type:[String],
    maxlength:10,//  => this means each element string in this array can only have maximum 10 letter only , but it won't tell ki maximum elements kitne ho array main  
     validate: { // this is a special keyword in mongoose that heps us to run a function before the fiels get save  // so basically this tells us ki 10 elements hi ho sakte hain is array of Strings main
    validator: arr => arr.length <= 10, // basically jab ye true hoga only then ye save hoga else message waala error jaayega 
    message: "Maximum 10 tags allowed"
  },
    max:10, // this is for numbers
    default:[]
  },
  dueDate:{
    type:Date
  }
  /**
   * 🧠 Then how is it “optional”?

In Mongoose:

👉 Fields are optional by default

Unless you write:

required: true
   */
  },
  {
    timestamps:true,
  }
);



// TODO: Add index

todoSchema.index({completed: 1, createdAt: -1 })

export const Todo = mongoose.model('Todo',todoSchema)

// TODO: Create and export the Todo model

// doubt in below concept

/** 
 * 
 * Yes — ✅ this is correct.
todoSchema.index({ completed: 1, createdAt: -1 });

🔍 What it means
In Mongoose, this creates a compound index on:


completed → ascending (1)


createdAt → descending (-1)



🧠 How MongoDB will use it
👉 It builds an index like:
(completed, createdAt)
So queries like:
Todo.find({ completed: true }).sort({ createdAt: -1 });
👉 become very fast 🚀

⚠️ Important rule (interview favorite)
👉 Index order matters:
{ completed: 1, createdAt: -1 }
✔ Works for:


filter by completed


then sort by createdAt


❌ Not optimal for:
Todo.find().sort({ createdAt: -1 })
(because completed is first in index)

🧠 Mental model
Think of it like:

First group by completed, then sort inside each group by newest (createdAt desc)


🔥 When this is useful


Todo apps


Task dashboards


Status-based filtering + recent-first sorting



✅ Final Answer (1 line — interview style)
👉 Yes, it correctly creates a compound index on completed (asc) and createdAt (desc) to optimize filtered and sorted queries.

If you want, I can show you how .explain() proves index usage — that’s a strong practical + interview combo.
*/

