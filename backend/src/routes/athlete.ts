import express from "express";
import { deleteAthlete, getAllAthletes, login, register, registerMany, updateAthlete } from "../controllers/athlete";
import {registerValidation, validator} from "../middleware/athletevalidator";
import { athleteAuth } from "../middleware/athleteAuth";

export default (router:express.Router)=>{
    router.get('/athletes',getAllAthletes);
    router.delete("/athletes/:id",deleteAthlete)
    router.patch("/athletes/:id",updateAthlete)
    router.post('/auth/registerAthlete',registerValidation(),validator,register);//registerValidation adds any errors to the request object, The validator middleware checks for any validation errors added to the request object using validationResult 
    router.post('/auth/login',login);
    router.post('/auth/registerManyAthletes',registerMany);
    router.get("/auth/currentAthlete",athleteAuth,(req,res)=>{res.send(req.existingAthelete)})
}