import express from "express";
import {  deleteAdmin, getAllAdmin, register, updateAdmin } from "../controllers/admin";


export default (router:express.Router)=>{
    router.get('/admins',getAllAdmin);
    router.delete("/admins/:id",deleteAdmin)
    router.patch("/admins/:id",updateAdmin);
    router.post('/auth/registerAdmin',register);
}