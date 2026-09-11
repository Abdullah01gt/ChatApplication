import mongoose from "mongoose"

const UserModel = new mongoose.Schema({
    clerkId:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    fullName:{
        type: String,
        required: true,
    },
    profilePic:{
        type: String,
        default:""
    },

})

const User = mongoose.model("User", UserModel)

export default User

