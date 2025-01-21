import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    requuired: true,
  },
nickname: {
    type: String,
    required: true,
},
color: {
  type: String,
  required: true,
}

},{timestamps:true});

export default mongoose.model("chat",chatSchema);