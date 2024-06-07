import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitedHistory: [
        {
            timestamp: {
                type: Number,
            }
        }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userschemas'
    }
},
    { timestamps: true },
)

const URL = mongoose.model('urlschema', urlSchema);

export default URL
