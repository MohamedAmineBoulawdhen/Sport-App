import express from "express";
import {  deleteSession, getAllSession, createSession, updateSession } from "../controllers/session";


export default (router:express.Router)=>{
    router.get('/sessions',getAllSession);
    router.delete("/sessions/:id",deleteSession)
    router.patch("/sessions/:id",updateSession);
    router.post('/sessions/createSession',createSession);
}