import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compresssion from "compression";
import dotenv from "dotenv";
import morgan from "morgan";
import router from "./routes/index";


dotenv.config({ path: __dirname + '/../config/.env' });

const port = process.env.PORT || 8000 ;
const app = express();

//log type request - status - response time - size
app.use(morgan("dev"))
//enables Cross-Origin Resource Sharing (CORS) with credential support
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}));

//enable http response compression
app.use(compresssion());
//enable parsing of http request bodies in JSON format  
app.use(express.json());
//enable parsing of http request cookies and make them available using req.cookies
app.use(cookieParser());

//connect to db
require("../config/connectToDB");


app.listen(port,()=>{
console.log(`Server listening on port http://localhost:${port}`);
})

app.use("/api",router())

//handle end point not found
app.use((req,res,next)=>{
    if (req.path === '/') {
        res.status(200).send('home page backend');
      } else {
        next(Error("end point not found"))
      }
})
// //handle error middleware//just add next(error) in catch in controller 
// app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
// let errorMessage = "An unknown error occurred";
// if(error instanceof Error) errorMessage = error.message;
// res.status(500).json({error:errorMessage})
// })