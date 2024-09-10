const jwt = require("jsonwebtoken");
const User = require("../models/user");

tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "Token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    request.user = user.toJSON();
    next();
  } catch (error) {
    console.error("Error in userExtractor middleware:", error);
    next(error);
  }
};
module.exports = { tokenExtractor, userExtractor };
