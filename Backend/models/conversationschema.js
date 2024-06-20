const mongoose=require("mongoose");
const conversationSchema = new mongoose.Schema({
    members: {    // contain [sender id , reciever id]
        type: Array
    },

    message: {   // last message between the user having ids are - senderid and recieverid
        type: String
    }
},

    {
        timestamps: true
    }
);

const conversation = mongoose.model('conversation', conversationSchema);

module.exports=conversation;