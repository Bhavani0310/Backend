const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema(
  {
    email: { type: String,  unique: true },
    password: { type: String },
    confirmPassword: { type: String},
    Collegename :{type:String},
    Jntucode:{type:String},
    Workshop:{
      Name:{type:String},
      seats:{type:Number}
    },
    Date:{type:Date},
    slotTime:{type:String},
    BookingClg:{type:String}
  }
)

let Post = mongoose.model("College", registerSchema);

module.exports = Post;
