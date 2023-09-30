const mongoose = require('mongoose');
const personalInfoSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClgUser',
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
      unique:true,
    },
    JntuCode:{
        type:String,
        required:true,
        unique:true,
    },
    Address:{
        type:String,
        required:true,
    },
    website:{
        type:String,
    },

    workshops:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Workshop' }],
  });
  
  const ClgInfo = mongoose.model('ClgInfo', personalInfoSchema);
  
  module.exports = ClgInfo;