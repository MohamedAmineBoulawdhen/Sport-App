import mongoose from 'mongoose';

export const AthleteSchema = new mongoose.Schema({
     firstName: {
            type: String,
            required: true
      },
    lastName: {
            type: String,
            required: true
      },
    email:{
        type: String, 
        required: true,
        unique:true},
    password:{
        type: String, 
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    dateOfBirth: {
        type: String,
        set: (date) => {
          if (!date) return null;
          const d = new Date(date);
          const year = d.getFullYear();
          const month = `${d.getMonth() + 1}`.padStart(2, '0');
          const day = `${d.getDate()}`.padStart(2, '0');
          return `${year}-${month}-${day}`;
        },
        get: (date) => {
          if (!date) return null;
          return new Date(date);
        }
      },
    street:String,
    city:String,
    state:String,
    zip:String,
    phone:String,
    weight:Number,
    height:Number,
    session: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    }],
    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced", "professional"]
    },
    discipline:[String],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        default:null,
        ref: 'Admin'
    },
    adminType: {
        type: String,
        enum: ['association', 'gym', 'personal trainer'],
    },
    coaches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach'
    }]
}, { strict: true });//using strict: true, Mongoose will not save any properties that are not defined in the schema

export const AthleteModel = mongoose.model("Athlete",AthleteSchema)