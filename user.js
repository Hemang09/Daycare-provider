const mongoose = require("mongoose")

const userData = new mongoose.Schema({

    childName:{
            type: String
    },
    
    parentName:{
            type: String
    },
    
    email:{
            type: String
    },
    
    phone:{
            type: Number
    },
    
    age:{
            type: Number
    },
    program:{
            type: String
    },
    datetime:{
            type: Date
    },
    slot:{
            type: mongoose.Mixed
    },
})

const User = mongoose.model("User", userData)
module.exports = User