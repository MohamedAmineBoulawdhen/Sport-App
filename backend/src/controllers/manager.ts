import express from "express";
import {ManagerModel} from "../models/manager";
import mongoose from "mongoose";

export const register= async (req: express.Request, res: express.Response)=>{
    try {
        const {email,password,name} = req.body;
        //required fields verification
        if(!email||!password||!name){
            return res.status(400).json({msg:"failed to register:{email,password,name} are required"});
        }
        //email verification
        const existingmanager=await ManagerModel.findOne({email});
        if(existingmanager){
            return res.status(400).json({msg:"failed to register:email already exists"});
        }
        //create a new athelete
       const manager=new ManagerModel(req.body)
       manager.save()
        return res.status(200).json({msg:"success to register",manager});
    } catch (error) {
        //    console.log(error);
           return res.status(400).json({msg:"register controller error",error: error.message});     
    }
}

export const getAllmanager = async (req: express.Request, res: express.Response)=>{
    try {
const managers = await ManagerModel.find();

return res.status(200).json(managers)
    } catch (error) {
        // console.log(error.message);
        return res.status(400).send({message:error.message});
    }
}

export const updateManager=async (req: express.Request, res: express.Response) =>{
    try {
        const {id}=req.params;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).send({message:"Invalid id"});
          }
          //  console.log(Object.keys(req.body).length);
          if (!Object.keys(req.body).length){
              return res.status(400).send({message:"At least one property provided to update"});
            } 
            
        //  if (!Object.keys(req.body).map(property=>property in manager).reduce((acc,curr)=>acc&&curr)){
        //      return res.status(400).send({message:"One or more properties not found"});
        //  }
        let manager = await ManagerModel.findByIdAndUpdate(id,req.body,{ new: true });//By default, findByIdAndUpdate returns the original document
        if (!manager){
            return res.status(400).send({message:"manager not found"});
        }
        return res.status(200).json(manager);
 
     } catch (error) {
        //  console.log(error.message);
         return res.status(400).send({message:error.message});
     }
 }

 export const deleteManager=async (req: express.Request, res: express.Response) =>{
    try {
      const {id}=req.params;
      if(!mongoose.isValidObjectId(id)){
        return res.status(400).send({message:"Invalid id"});
      }
      const deletedmanager=await ManagerModel.findOneAndDelete({_id:id});  
      return res.status(200).json(deletedmanager);
    } catch (error) {
        // console.log(error.message);
        return res.status(400).send({message:error.message});
    }
} 