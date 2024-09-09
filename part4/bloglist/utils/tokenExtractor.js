// Middleware to extract token from the Authorization header
exports.tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", ""); // Assign the token to request.token
  }
  next(); // Call next() to pass control to the next middleware
};
