import express from "express";
import { AthleteModel } from "../models/athlete";
import {AdminModel} from "../models/admin";
import  bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const register= async (req: express.Request, res: express.Response)=>{
    try {
        const {email,password,lastName,firstName,adminType,admin} = req.body;
        //required fields verification
        if(!email||!password||!firstName||!lastName){
            return res.status(400).json({msg:"failed to register:{email,password,firestName,lastName} are required"});
        }
       //admin verification
        if (adminType && adminType!=="personal trainer" && admin==null){
            return res.status(400).json({msg:"failed to register:admin is required"});
        }
        if(admin){
        let  existingadmin = await AdminModel.findById(req.body.admin);
        if (!existingadmin) {
            return res.status(400).json({msg:"Invalid admin ID"});
                        }
        }
        //email verification
        const existingAthlete=await AthleteModel.findOne({email});
        if(existingAthlete){
            return res.status(400).json({msg:"failed to register:email already exists"});
        }
        //create a new athelete
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
       const athlete=new AthleteModel(req.body);
       athlete.password = hashedPassword;
       athlete.save()
       const token = jwt.sign({
        id:athlete._id,
       },process.env.SECRET_KEY)
        return res.status(200).json({msg:"success to register",athlete,token});
    } catch (error) {
        //    console.log(error);
           return res.status(400).json({msg:"register controller error",error: error.message});     
    }
}

export const registerMany= async (req: express.Request, res: express.Response)=>{
    try {
    const verifier=req.body.map(async (athlete)=>{
        const {email,password,firstname,adminType,admin} = athlete;
        //required fields verification
        if(!email||!password||!firstname){
            return false;
        }
       //admin verification
        if (adminType && adminType!=="personal trainer" && admin==null){
            return false;
        }
        if(admin){
        let  existingadmin = await AdminModel.findById(athlete.admin);
        if (!existingadmin) {
            return false;
                        }
        }
        //email verification
        const existingAthlete=await AthleteModel.findOne({email});
        if(existingAthlete){
            return false;
        }
        return true;
    })
if (!verifier.reduce((acc,curr)=> acc&&curr)){return res.status(400).json({
    msg:"failed to register many: possible error {email,password,firstname} are required || admin is required if adminType is not perosonel trainer || Invalid admin ID || email already exists"});}
const athletes = await AthleteModel.create(req.body);
return res.status(200).json(athletes)
    } catch (error) {
        // console.log(error.message);
        return res.status(400).send({message:error.message});
    }
}

export const login= async (req: express.Request, res: express.Response)=>{
    try {
        const {email,password} = req.body;
        //email verification
        const existingAthlete = await AthleteModel.findOne({email});
        if(!existingAthlete){
            return res.status(400).json({msg:"bad credentials"});
        }
        const comparePasswords = await bcrypt.compare(password, existingAthlete.password);
        if(!comparePasswords){
            return res.status(400).json({msg:"bad credentials"});
        }
        const token = jwt.sign({
            id:existingAthlete._id,
           },process.env.SECRET_KEY)
        res.status(200).json({msg:"login successful",existingAthlete,token});
    } catch (error) {
        //    console.log(error);
           return res.status(400).json({msg:"login controller error",error: error.message});     
    }
}



export const getAllAthletes = async (req: express.Request, res: express.Response)=>{
    try {
const athletes = await AthleteModel.find();

return res.status(200).json(athletes)
    } catch (error) {
        // console.log(error.message);
        return res.status(400).send({message:error.message});
    }
}


export const deleteAthlete=async (req: express.Request, res: express.Response) =>{
    try {
      const {id}=req.params;
      if(!mongoose.isValidObjectId(id)){
        return res.status(400).send({message:"Invalid id"});
      }
      const deletedAthlete=await AthleteModel.findOneAndDelete({_id:id});  
      return res.status(200).json(deletedAthlete);
    } catch (error) {
        // console.log(error.message);
        return res.status(400).send({message:error.message});
    }
}

export const updateAthlete=async (req: express.Request, res: express.Response) =>{
    try {
        const {id}=req.params;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).send({message:"Invalid id"});
          }
    //  console.log(Object.keys(req.body).length);
     if (!Object.keys(req.body).length){
        return res.status(400).send({message:"At least one property provided to update"});
     }
     // if (!Object.keys(req.body).map(property=>property in athlete).reduce((acc,curr)=>acc&&curr)){
     //     return res.status(400).send({message:"One or more properties not found"});
     // }

    let athlete = await AthleteModel.findByIdAndUpdate(id,req.body,{ new: true });//By default, findByIdAndUpdate returns the original document
    if (!athlete){
        return res.status(400).send({message:"Athlete not found"});
    }
    return res.status(200).json(athlete);

    } catch (error) {
        // console.log(error.message);
        return res.status(400).send({message:error.message});
    }
}
