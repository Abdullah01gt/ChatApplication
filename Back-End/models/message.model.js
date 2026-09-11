import mongoose from "mongoose"

const MessageModel = mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
     recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text:{
        type: String
    },
    image:{
        type: String
    },
    video: {
        type: String
    }
   
}, {timeStamps: true})



const Message = mongoose.model("Message", MessageModel)
export default Message