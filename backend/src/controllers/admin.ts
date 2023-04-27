import express from "express";
import {AdminModel} from "../models/admin";
import mongoose from "mongoose";

export const register= async (req: express.Request, res: express.Response)=>{
    try {
        const {email,password,name,type} = req.body;
        //required fields verification
        if(!email||!password||!name||!type){
            return res.status(400).json({msg:"failed to register:{email,password,name,type} are required"});
        }
        //email verification
        const existingadmin=await AdminModel.findOne({email});
        if(existingadmin){
            return res.status(400).json({msg:"failed to register:email already exists"});
        }
        //create a new athelete
       const admin=new AdminModel(req.body)
       admin.save()
        return res.status(200).json({msg:"success to register",admin});
    } catch (error) {
           console.log(error);
           return res.status(400).json({msg:"register controller error",error: error.message});     
    }
}

export const getAllAdmin = async (req: express.Request, res: express.Response)=>{
    try {
const admins = await AdminModel.find();

return res.status(200).json(admins)
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({message:error.message});
    }
}

export const updateAdmin=async (req: express.Request, res: express.Response) =>{
    try {
        const {id}=req.params;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).send({message:"Invalid id"});
          }
     console.log(Object.keys(req.body).length);
     if (!Object.keys(req.body).length){
        return res.status(400).send({message:"At least one property provided to update"});
     } let admin = await AdminModel.findByIdAndUpdate(id,req.body,{ new: true });//By default, findByIdAndUpdate returns the original document
     if (!admin){
         return res.status(400).send({message:"admin not found"});
     }
     if (!Object.keys(req.body).map(property=>property in admin).reduce((acc,curr)=>acc&&curr)){
         return res.status(400).send({message:"One or more properties not found"});
     }
     return res.status(200).json(admin);
 
     } catch (error) {
         console.log(error.message);
         return res.status(400).send({message:error.message});
     }
 }

 export const deleteAdmin=async (req: express.Request, res: express.Response) =>{
    try {
      const {id}=req.params;
      if(!mongoose.isValidObjectId(id)){
        return res.status(400).send({message:"Invalid id"});
      }
      const deletedAdmin=await AdminModel.findOneAndDelete({_id:id});  
      return res.status(200).json(deletedAdmin);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({message:error.message});
    }
} 