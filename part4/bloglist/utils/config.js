require("dotenv").config();

const PORT = process.env.PORT || 3003;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://parthkaul:parthkaul2003@cluster0.bltlz.mongodb.net/bloglist";

module.exports = {
  MONGODB_URI,
  PORT,
};
