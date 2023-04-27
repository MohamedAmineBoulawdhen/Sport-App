import mongoose from 'mongoose';

const uri:string = process.env.DB_URI;
if (!uri){console.error("error to connect to Mongo")}
else{
    mongoose.connect(uri).then(()=>console.log("connected to db")).catch((err)=>{
        console.error(err.message);
        })
}
 