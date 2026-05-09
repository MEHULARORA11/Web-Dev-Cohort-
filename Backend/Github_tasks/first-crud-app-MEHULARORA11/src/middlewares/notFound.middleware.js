/**
 * TODO: Handle 404 errors
 *
 * Return 404: { error: { message: "Route not found" } }
 */
export function notFound(req, res,next) {
  
      return res.status(404).json({
    error: { message: "Route not found" }
  });
}

/**
 * ⚠️ But best practice is to keep it
1. Consistency

All middleware follow the same pattern:

(req, res, next)
2. Future flexibility

Maybe later you want:

next(new Error("Route not found"));

👉 Then you’ll need next
 */
