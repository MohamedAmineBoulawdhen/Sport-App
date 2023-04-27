import express from "express";
import athlete from "./athlete";
import admin from "./admin";
import manager from "./manager";
import session from "./session";
import coach from "./coach";

const router = express.Router();

export default ():express.Router=>{
  admin(router)
  athlete(router);
  manager(router);
  session(router);
  coach(router);
  router.get('/',(req: express.Request, res: express.Response)=>{res.status(200).send("home page api")});
  return router;
}
