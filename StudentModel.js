const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let StudentSchema = new Schema(
  { 
    Name: { type: String, required: true },
    CollegeName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true},
  },
  { timestamps: true }
);

let Post = mongoose.model("Student", StudentSchema);

module.exports = Post;