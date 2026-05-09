import mongoose from "mongoose";

/**
 * TODO: Validate MongoDB ObjectId
 *
 * - Check if req.params.id is valid using mongoose.Types.ObjectId.isValid()
 * - If invalid, return 400: { error: { message: "Invalid id" } }
 * - If valid, call next()
 */
export function validateObjectId(req, res, next) {
  // Your code here
  if(!req.params?.id){
    return res.status(404).json('id does not exists')
  }
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id)
  if(!isValid) {
    return res.status(400).json({ error: { message: "Invalid id" } })
  }
  next()
}

/**
 * In Mongoose:

👉 ObjectId.isValid() checks:

Is the string a valid MongoDB ObjectId format (24 hex chars)

Example:

ObjectId.isValid("507f1f77bcf86cd799439011") // ✅ true
ObjectId.isValid("abc")                      // ❌ false
 */

