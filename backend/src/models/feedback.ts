import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({

    session:{
        type:mongoose.Types.ObjectId,
        ref:"Session"
    },
    rating:Number,
    comment:String,
    sender: {
         type: mongoose.Types.ObjectId,
        ref: 'Athlete' },
    receiver: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Coach' }
  

});

export const Session = mongoose.model("Feedback",FeedbackSchema)