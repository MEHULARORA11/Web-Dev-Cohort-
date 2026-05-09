import mongoose from 'mongoose';

/**
 * TODO: Validate MongoDB ObjectId
 *
 * 1. Check if req.params.id is a valid MongoDB ObjectId
 *    Use: mongoose.Types.ObjectId.isValid(req.params.id)
 * 2. If invalid: return 400 with { error: { message: 'Invalid id format' } }
 * 3. If valid: call next()
 */ 
export function validateObjectId(req, res, next) {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
   return res.status(400).json({ error: { message: 'Invalid id format' } })
  }
  next()
    /**
     * this .isValid is used to tell whether we can use this id to forn BSON id or not ==> note it is BSON => explore it 
    */
}
