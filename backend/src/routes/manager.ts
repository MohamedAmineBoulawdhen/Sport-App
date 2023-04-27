import express from "express";
import {  deleteManager, getAllmanager, register, updateManager } from "../controllers/manager";


export default (router:express.Router)=>{
    router.get('/managers',getAllmanager);
    router.delete("/managers/:id",deleteManager)
    router.patch("/managers/:id",updateManager);
    router.post('/auth/registerManager',register);
}