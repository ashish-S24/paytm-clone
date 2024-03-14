const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://ashish:Pass123@cluster0.llfdbsr.mongodb.net/paytm-app");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password: {
        type:String,
        required:true,
        minLength:6,
    },
    firstName : {
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastName : {
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
})


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // reference to User model
        ref: 'User',
        require: true
    },
    balance: {
        type: Number,
        require: true
    }
})


const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);


module.exports = {
    Account,
    User,
}