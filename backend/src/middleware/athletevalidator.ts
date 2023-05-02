import {check,validationResult} from "express-validator";
import express from "express";

export const registerValidation = () => [ 
    check("email","Please enter a valid email address").isEmail(),
    check("password","Password should be at least 6 characters long").isLength({ min: 6 }),
    check("firstName","First name is required").notEmpty(),
]
export const validator=(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    const errors= validationResult(req);
    errors.isEmpty()? next() : res.status(400).send(errors.array())
}