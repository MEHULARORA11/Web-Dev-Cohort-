import { Todo } from "../models/todo.model.js";

/**
 * TODO: Create a new todo
 * - Extract data from req.body
 * - Create todo in database
 * - Return 201 with created todo
 */
export async function createTodo(req, res, next) {
  try {
    const data = req.body
    const todo = await Todo.create(data)
    return res.status(201).json(todo)
  } catch (error) {
    next(error);
  }
}

//#region  //*=========== concept ===========
/**
 * You’re asking for “all” Mongoose/MongoDB operators — that’s not realistically enumerable (there are dozens across categories and more get added).
So instead of dumping an unreadable list, I’ll give you a complete mental map + all the important operators you must know (interview + real-world).

🧠 First clarity (very important)
👉 Things like $set, $not are MongoDB operators, not Mongoose-specific
👉 Mongoose just provides a layer to use them easily

🧩 1. Query Operators (Filtering)
Used inside .find(), .findOne()

🔹 Comparison
{ age: { $gt: 18 } }   // greater than{ age: { $gte: 18 } }  // >={ age: { $lt: 60 } }   // <{ age: { $lte: 60 } }  // <={ age: { $eq: 25 } }   // equals{ age: { $ne: 25 } }   // not equal

🔹 Logical
{ $and: [{ age: { $gt: 18 } }, { active: true }] }{ $or: [{ role: "admin" }, { role: "user" }] }{ $not: { age: { $gt: 18 } } }{ $nor: [{ age: 10 }, { age: 20 }] }

🔹 Element
{ email: { $exists: true } }   // field exists{ age: { $type: "number" } }   // type check

🔹 Evaluation
{ name: { $regex: "john", $options: "i" } } // search{ score: { $mod: [10, 0] } } // divisible by 10{ $expr: { $gt: ["$price", "$cost"] } } // compare fields

🔹 Array
{ tags: { $in: ["node", "js"] } }     // any match{ tags: { $all: ["node", "js"] } }    // all must match{ tags: { $size: 3 } }               // array length

🧩 2. Update Operators (VERY IMPORTANT)
Used in .update(), .findByIdAndUpdate()

🔹 $set (most used)
{ $set: { name: "Mehul" } }
👉 updates specific field

🔹 $unset
{ $unset: { name: "" } }
👉 removes field

🔹 $inc
{ $inc: { views: 1 } }
👉 increment/decrement

🔹 $mul
{ $mul: { price: 2 } }
👉 multiply value

🔹 $rename
{ $rename: { oldName: "newName" } }

🔹 $setOnInsert
👉 only works with upsert

🧩 3. Array Update Operators

🔹 $push
{ $push: { tags: "mongodb" } }

🔹 $pop
{ $pop: { tags: 1 } } // remove last

🔹 $pull
{ $pull: { tags: "node" } }
👉 remove matching element

🔹 $addToSet
{ $addToSet: { tags: "node" } }
👉 add only if not exists (like Set)

🔹 $each
{ $push: { tags: { $each: ["a", "b"] } } }

🧩 4. Bitwise / Advanced (rare but asked)
{ $bit: { flags: { and: 5 } } }

🧩 5. Projection Operators
Used in .find({}, projection)
{ name: 1 }      // include{ password: 0 }  // exclude

🧩 6. Aggregation Operators (advanced)
Used in .aggregate()

🔹 $match
👉 filter
🔹 $group
👉 grouping
{  $group: {    _id: "$category",    total: { $sum: "$price" }  }}

🔹 $sort, $limit, $skip

🔹 $lookup
👉 join collections

🔹 $project
👉 reshape output

🧩 7. Index-related
schema.index({ name: 1 })

🧠 Important conceptual takeaway
👉 MongoDB operators are grouped:
CategoryPurposeQueryfilter documentsUpdatemodify documentsArraymanipulate arraysAggregationdata processingProjectioncontrol output

⚠️ Most important ones (focus here)
If you're preparing for interviews:
👉 MUST know:


$set


$inc


$push


$pull


$addToSet


$in


$regex


$and, $or


$exists



🧠 Final mental model
👉 MongoDB is:

“Query language + update operators + aggregation engine”


✅ Final Answer (1 line — interview style)
👉 Mongoose uses MongoDB operators like $set, $inc, $push, $in, $regex, etc., which are categorized into query, update, array, and aggregation operators for data retrieval and manipulation.

If you want, I can give you a cheat sheet PDF-style summary or top 20 interview questions on these operators — that would help you revise fast.
*/
//#endregion  //*======== concept ===========

/**
 * TODO: List todos with pagination and filters
 * - Support query params: page, limit, completed, priority, search
 * - Default: page=1, limit=10
 * - Return: { data: [...], meta: { total, page, limit, pages } }
 */
export async function listTodos(req, res, next) {
  try {
    
    let { page = 1, limit = 10, completed, priority, search } = req.query;

   
    page = parseInt(page);
    limit = parseInt(limit);

   
    const filter = {};

    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

    if (priority) {
      filter.priority = priority;
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" }; // case-insensitive
    } // as $regex will make mongoDB querry to search for , let's say => ?search=task => so it will search for task also we have $options:"i" so it will make it search for task but case insensitive ie TasK will also be searched  


    
    const skip = (page - 1) * limit;

    
    const data = await Todo.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

      /**
       * const data = await Todo.find(filter)
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });

This is a classic pagination + sorting query in Mongoose. Let’s break each part clearly.

🧠 1. .skip(skip)

👉 Skips a number of documents

.skip(10)

Means:

“Ignore the first 10 results”

📌 Why we use it

Pagination formula:

skip = (page - 1) * limit

Example:

page = 2
limit = 5
skip = (2 - 1) * 5 = 5

👉 Skip first 5 results → start from 6th

🧠 2. .limit(limit)

👉 Limits how many documents to return

.limit(5)

Means:

“Return only 5 documents”

📌 Combined with skip
.skip(5).limit(5)

👉 Returns:

Documents 6 → 10

🧠 3. .sort({ createdAt: -1 })

👉 Sorts the results

1 → ascending
-1 → descending
.sort({ createdAt: -1 })

Means:

“Newest items first”

📌 Example
createdAt:
2024-01-01
2024-02-01
2024-03-01

After sort:

2024-03-01
2024-02-01
2024-01-01
🔥 Putting it all together
Todo.find(filter)
  .skip(5)
  .limit(5)
  .sort({ createdAt: -1 });

👉 Means:

“Get todos matching filter, sorted by newest first, skip first 5, return next 5”

⚠️ Important execution order (interview trap)

MongoDB logically does:

filter
sort
skip
limit

👉 NOT the chain order you wrote

🧠 Visual example

Total 20 todos (sorted newest → oldest):

[1,2,3,4,5,6,7,8,9,10,...]

Page 2, limit 5:

skip 5 → remove [1–5]
take 5 → [6–10]
⚠️ Performance note
.skip() becomes slow on very large data
Better approach → cursor-based pagination (advanced)
✅ Final Answer (1 line — interview style)

👉 .sort() orders results, .skip() offsets documents, and .limit() restricts the number of returned documents for pagination.

If you want, I can show you how cursor pagination avoids skip’s performance issue — that’s a strong backend upgrade.
       */

 
    const total = await Todo.countDocuments(filter);

  
    const pages = Math.ceil(total / limit);

   
    return res.status(200).json({
      data,
      meta: {
        total,
        page,
        limit,
        pages
      }
    });

  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Get single todo by ID
 * - Return 404 if not found
 */
export async function getTodo(req, res, next) {
  try {
    const todo = await Todo.findById(req.params.id)
    if(!todo) {
      return res.status(404).json({error:{message:"Todo not found"}})
    }
     return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Update todo by ID
 * - Use findByIdAndUpdate with { new: true, runValidators: true }
 * - Return 404 if not found
 */
export async function updateTodo(req, res, next) {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true })
    if(!todo) {
       return res.status(404).json({
        error: { message: "Todo not found" }
      });
    }
      return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Toggle completed status
 * - Find todo, flip completed, save
 * - Return 404 if not found
 */
export async function toggleTodo(req, res, next) {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id,[{
       $set: { completed: { $not: "$completed" } } 
       //#region  //*=========== concept ===========
       /**
        * Good — this is where people usually get confused.

🧠 Can we toggle using $set?
👉 Yes, but not directly alone
👉 You need $set with an expression

❌ Wrong (this does NOT toggle)
{ $set: { completed: !completed } }
👉 This doesn’t work in DB because:


MongoDB doesn’t know your JS variable completed



✅ Correct way (MongoDB toggle)
Use $set + $not:
await Todo.findByIdAndUpdate(  id,  { $set: { completed: { $not: "$completed" } } },  { new: true });

🔍 What’s happening
{ $not: "$completed" }
👉 Means:

Take current value of completed and invert it

So:


true → false


false → true



⚠️ Important (interview-level nuance)
👉 This only works properly in update pipeline form (MongoDB 4.2+)
✅ Safer version (recommended)
await Todo.findByIdAndUpdate(  id,  [    {      $set: {        completed: { $not: "$completed" }      }    }  ],  { new: true });
👉 Notice:
[ ... ]  // pipeline

🧠 Why pipeline is needed


Normal update → static values


Pipeline update → dynamic expressions using current document



🔥 Alternative (simpler but 2-step)
const todo = await Todo.findById(id);todo.completed = !todo.completed;await todo.save();
👉 Easier but:


❌ not atomic


❌ race condition possible



🧠 Best practice
MethodProsConsfetch + savesimplenot atomic ❌$set + $notatomic ✅needs pipeline ⚠️

✅ Final Answer (1 line — interview style)
👉 Toggle using $set by combining it with $not in an update pipeline: { $set: { field: { $not: "$field" } } }.

If you want, I can show you how this works internally in MongoDB execution (very interview-heavy concept).
        */
       //#endregion  //*======== concept ===========
    }], { new: true })
       if (!todo) {
      return res.status(404).json({
        error: { message: "Todo not found" }
      });
    }

    return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Delete todo by ID
 * - Return 204 (no content) on success
 * - Return 404 if not found
 */
export async function deleteTodo(req, res, next) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    if(!todo){
      return res.status(404).json({
        error: { message: "Todo not found" }
      });
    }
     return res.status(204).send(); // no content
  } catch (error) {
    next(error);
  }
}
