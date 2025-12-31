import express from "express";
import dotenv from  "dotenv";
import mongoose from "mongoose";
import { router as issueRoutes } from "./routes/issueRoutes.js";
import { router as userRoutes } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app=express();

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
}
main().then(()=>{
    console.log("Connected");
}).catch((err)=>console.log("Error:",err));

const corsOptions={
    origin:"http://localhost:3000",
    allowedHeaders:"Content-Type,Authorization",
    credentials:true,
    methods:"GET,POST,DELETE,PUT"
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());



app.use(issueRoutes);
app.use(userRoutes);

app.use((err,req,res,next)=>{
    const {status=500,message="Some Error Occured"}=err;
    console.log("Error:",err);
    res.status(status).json(message);
})
app.listen(process.env.PORT,()=>{
    console.log("Listening On port 5000")
});