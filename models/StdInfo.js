const mongoose = require('mongoose');

const personInfoSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'StdUser',
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    collegeName:{
        type:String,
        required:true,
    },
    imageName: {
        type:String,
    },
  created: { type: Date, default: Date.now }
});
let StdInfo=mongoose.model('StdInfo',personInfoSchema);

 module.exports=StdInfo;