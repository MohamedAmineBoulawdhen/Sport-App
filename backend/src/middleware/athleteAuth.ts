import jwt, { JwtPayload } from "jsonwebtoken"
import { AthleteModel } from "../models/athlete"
import express from 'express';
import mongoose from "mongoose";

declare global {
    namespace Express {
      interface Request {
        existingAthelete?: AthleteDocument;
      }
    }
  }

interface AthleteDocument extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender?: "male" | "female";
    dateOfBirth?: String;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    weight?: number;
    height?: number;
    session?: mongoose.Types.ObjectId[];
    age?: number;
    level?: "beginner" | "intermediate" | "advanced" | "professional";
    discipline?: string[];
    admin?: mongoose.Types.ObjectId;
    adminType?: "association" | "gym" | "personal trainer";
    coaches?: mongoose.Types.ObjectId[];
  }

export const athleteAuth = async (req:express.Request, res: express.Response, next: express.NextFunction)=>{
try {
    const token = req.headers["authorization"]
    if(!token){
        return res.status(401).send({error:{msg:"Not authorized: token not specified"}})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
    const existingAthelete = await AthleteModel.findById(decoded.id);
    if(!existingAthelete){
        return res.status(401).send({error:{msg:"Not authorized: athlete not found"}})
    }
req.existingAthelete = existingAthelete as AthleteDocument;
next();
} catch (error) {
    return res.status(400).send(error);
}
}