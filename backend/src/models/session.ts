import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    startDate:Date,
    completionDate: Date,
    startTime:String,
    endTime:String,
    location: {
            name:String,
            street: String,
            city: String,
            state: String,
            zip: String
            },
    coaches: {
        type:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Coach",
            }],
         default:[]
        },
    admins: {
        type:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Admin",
            }],
            default:[]
        },
    maximumAthletes:{
        type:Number,
        default:10
    },
    athletes:{
        type:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Athlete",
            }],
        default:[]
            },
    notes:String,
    status:{
        type:String,
        enum:["confirmed","pending","canceled","completed"],
        default: "pending"
    },
    type:{
        type:String,
        enum:["event","personal training","nutrition plan","competition","group training"],
        required:true
    },
    
    

},{timestamps:true});


function validateAthletes(val:object[]) {
    return val.length <= 10;
  }
  
export const SessionModel = mongoose.model("Session",SessionSchema);

