import express from "express";
import { CoachModel } from "../models/coach";
import  bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const register= async (req: express.Request, res: express.Response)=>{
    try {
        const {email,password,name} = req.body;
        //required fields verification
        if(!email||!password||!name){
            return res.status(400).json({msg:"failed to register:{email,password,name} are required"});
        }
        //email verification
        const existingcoach=await CoachModel.findOne({email});
        if(existingcoach){
            return res.status(400).json({msg:"failed to register:email already exists"});
        }
        //create a new coach
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
       const coach=new CoachModel(req.body);
       coach.password = hashedPassword;
       coach.save()
       const token = jwt.sign({
        id:coach._id,
       },process.env.SECRET_KEY)
        return res.status(200).json({msg:"success to register",coach,token});
    } catch (error) {
        //    console.log(error);
           return res.status(400).json({msg:"register controller error",error: error.message});     
    }
}

export const registerMany= async (req: express.Request, res: express.Response)=>{
    try {
    const verifier=req.body.map(async (coach)=>{
        const {email,password,name} = coach;
        //required fields verification
        if(!email||!password||!name){
            return false;
        }
        //email verification
        const existingcoach=await CoachModel.findOne({email});
        if(existingcoach){
            return false;
        }
        return true;
    })
if (!verifier.reduce((acc,curr)=> acc&&curr)){return res.status(400).json({
    msg:"failed to register many: possible error {email,password,name} are required || email already exists"});}
const coaches = await CoachModel.create(req.body);
return res.status(200).json(coaches)
    } catch (error) {
        // console.log(error.message);
        return res.status(400).send({message:error.message});
    }
}

export const login= async (req: express.Request, res: express.Response)=>{
    try {
        const {email,password} = req.body;
        //email verification
        const existingcoach = await CoachModel.findOne({email});
        if(!existingcoach){
            return res.status(400).json({msg:"bad credentials"});
        }
        const comparePasswords = await bcrypt.compare(password, existingcoach.password);
        if(!comparePasswords){
            return res.status(400).json({msg:"bad credentials"});
        }
        const token = jwt.sign({
            id:existingcoach._id,
           },process.env.SECRET_KEY)
        res.status(200).json({msg:"login successful",existingcoach,token});
    } catch (error) {
        //    console.log(error);
           return res.status(400).json({msg:"login controller error",error: error.message});     
    }
}



export const getAllcoaches = async (req: express.Request, res: express.Response)=>{
    try {
const coachs = await CoachModel.find();

return res.status(200).json(coachs)
    } catch (error) {
        // console.log(error.message);
        return res.status(400).send({message:error.message});
    }
}


export const deleteCoach=async (req: express.Request, res: express.Response) =>{
    try {
      const {id}=req.params;
      if(!mongoose.isValidObjectId(id)){
        return res.status(400).send({message:"Invalid id"});
      }
      const deletedcoach=await CoachModel.findOneAndDelete({_id:id});  
      return res.status(200).json(deletedcoach);
    } catch (error) {
        // console.log(error.message);
        return res.status(400).send({message:error.message});
    }
}

export const updateCoach=async (req: express.Request, res: express.Response) =>{
    try {
        const {id}=req.params;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).send({message:"Invalid id"});
          }
    //  console.log(Object.keys(req.body).length);
     if (!Object.keys(req.body).length){
        return res.status(400).send({message:"At least one property provided to update"});
     }
     // if (!Object.keys(req.body).map(property=>property in coach).reduce((acc,curr)=>acc&&curr)){
     //     return res.status(400).send({message:"One or more properties not found"});
     // }
     
    let coach = await CoachModel.findByIdAndUpdate(id,req.body,{ new: true });//By default, findByIdAndUpdate returns the original document
    if (!coach){
        return res.status(400).send({message:"coach not found"});
    }
    return res.status(200).json(coach);

    } catch (error) {
        // console.log(error.message);
        return res.status(400).send({message:error.message});
    }
}
