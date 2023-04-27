import express from "express";
import {SessionModel} from "../models/session";
import mongoose from "mongoose";

export const createSession= async (req: express.Request, res: express.Response)=>{
    try {
        let {name,description,type,maximumAthletes} = req.body;
        //required fields verification
        if(!description||!type||!name){
            return res.status(400).json({msg:"failed to create a new Session:{name,description,type} are required"});
        }
        //check coachs id
        if (req.body?.coaches){
            const coachCount =  await mongoose.model('Coach').find({ _id: { $in: req.body.coaches} });
            if (coachCount.length !== req.body?.coaches?.length) {
                // Throw an error if one or more coaches were not found
                throw new Error('One or more of the specified coaches does not exist.');
              }
        }
        //check admin id
        if (req.body?.admins){
            const adminCount =  await mongoose.model('Admin').find({ _id: { $in: req.body.admins } });
            if (adminCount.length !== req.body?.admins?.length) {
                // Throw an error if one or more admins were not found
                throw new Error('One or more of the specified admins does not exist.');
              }
        }
        //check athletes id
        if (req.body?.athletes){
            const athleteCount=  await mongoose.model('Athlete').find({ _id: { $in: req.body.athletes } });
            if (athleteCount.length !== req.body?.athletes?.length) {
                // Throw an error if one or more athletees were not found
                throw new Error('One or more of the specified athletes does not exist.');
              }
        }
        //existing session verification
        const existingsession=await SessionModel.findOne({description,type,name});
        if(existingsession){
            return res.status(400).json({msg:"failed to create a new Session:sessoin already exists"});
        }
        //check the number of athletes in the session
        if(!maximumAthletes){maximumAthletes=10;}

        if(req.body?.athletes?.length>maximumAthletes){
                return res.status(200).json({msg:`Maximum ${maximumAthletes} athletes are allowed per session.`});       
        }
        //create a new session
       const session=new SessionModel(req.body)
       session.save()
        return res.status(200).json({msg:"success to create a new Session",session});
    } catch (error) {
           return res.status(400).json({msg:"create a new Session controller error",error: error.message});     
    }
}

export const getAllSession = async (req: express.Request, res: express.Response)=>{
    try {
const sessions = await SessionModel.find();

return res.status(200).json(sessions)
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
}

export const updateSession=async (req: express.Request, res: express.Response) =>{
    try {
        const {id}=req.params;
        const {maximumAthletes}=req.body
        console.log(maximumAthletes)
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).send({message:"Invalid id"});
          }
     if (!Object.keys(req.body).length){
        return res.status(400).send({message:"At least one property provided to update"});
     } 
    //check coaches id
    if (req.body?.coaches){
        const coachCount =  await mongoose.model('Coach').find({ _id: { $in: req.body.coaches} });
        if (coachCount.length !== req.body?.coaches?.length) {
            // Throw an error if one or more coaches were not found
            throw new Error('One or more of the specified coaches does not exist.');
            }
    }
    //check admin id
    if (req.body?.admins){
            const adminCount =  await mongoose.model('Admin').find({ _id: { $in: req.body.admins } });
            if (adminCount.length !== req.body?.admins?.length) {
                // Throw an error if one or more admins were not found
                throw new Error('One or more of the specified admins does not exist.');
              }
    }
    //check athletes id
    if (req.body?.athletes){
            const athleteCount=  await mongoose.model('Athlete').find({ _id: { $in: req.body.athletes } });
            if (athleteCount.length !== req.body?.athletes?.length) {
                // Throw an error if one or more athletees were not found
                throw new Error('One or more of the specified athletes does not exist.');
              }
    }
    //check the number of athletes in the session
    //I will check later
    // if(maximumAthletes){
    //     if(req.body?.athletes?.length>maximumAthletes){
    //         return res.status(400).json({msg:`Maximum ${maximumAthletes} athletes are allowed per session.`});
    //     } 
    // }
    // else{
    //     let findsession = await SessionModel.findById({id});
    //     console.log(findsession);
    //     if (findsession){  
    //       if(req.body?.athletes?.length>findsession.maximumAthletes){
    //         return res.status(400).json({msg:`Maximum ${findsession.maximumAthletes} athletes are allowed per session.`});
    //     }}
    // }
    //find and update
     let session = await SessionModel.findByIdAndUpdate(id,req.body,{ new: true });//By default, findByIdAndUpdate returns the original document
     if (!session){
         return res.status(400).send({message:"Session not found"});
     }
     if (!Object.keys(req.body).map(property=>property in session).reduce((acc,curr)=>acc&&curr)){
         return res.status(400).send({message:"One or more properties not found"});
     }


     return res.status(200).json(session);
 
     } catch (error) {
         return res.status(400).send({message:error.message});
     }
 }

 export const deleteSession=async (req: express.Request, res: express.Response) =>{
    try {
      const {id}=req.params;
      let session = await SessionModel.findOne({id});
      if (!session){
          return res.status(400).send({message:"Session not found to delete"});
      }
      if(!mongoose.isValidObjectId(id)){
        return res.status(400).send({message:"Invalid id"});
      }
      const deletedsession=await SessionModel.findOneAndDelete({_id:id});  
      return res.status(200).json(deletedsession);
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
} 