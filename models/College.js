const mongoose = require('mongoose');
const CollegeSchema = new mongoose.Schema({

    collegeName: 
        {
            type: String,
            required: true,
        },
    JntuCode:
        {
            type:String,
            required:true,
        },
        workshop:
            {
                type:String,                                    
                required:true,
                seats:Int32Array
            },
  });
  
  const College = mongoose.model('Colleges', CollegeSchema);
  module.exports = College;
