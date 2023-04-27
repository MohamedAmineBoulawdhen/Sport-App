import express from "express";
import { deleteCoach, getAllcoaches, login, register, registerMany, updateCoach } from "../controllers/coach";


export default (router:express.Router)=>{
    router.get('/coaches',getAllcoaches);
    router.delete("/coaches/:id",deleteCoach);
    router.patch("/coaches/:id",updateCoach);
    router.post('/auth/registercoach',register);
    router.post('/auth/login',login);
    router.post('/auth/registerManycoaches',registerMany);
}