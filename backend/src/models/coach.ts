import mongoose from 'mongoose';

const CoachSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true
          },
          last: {
            type: String,
            required: true
          }
        },
    email:{
        type: String, 
        required: true,
        unique:true
        },
    password:{
            type: String, 
            required: true
        },
    expertise: [String],
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
      },
      phone: String,
      bio: String,
      approved: {
        type: Boolean,
        default: false
      },
    

});

  
export const CoachModel = mongoose.model("Coach", CoachSchema)