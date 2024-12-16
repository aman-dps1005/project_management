import express from "express";
import projectRouter from "./routes/ProjectRouter";
import userRouter from "./routes/userRouter";
import dotenv from 'dotenv';
import cors from 'cors';

const app=express();
const port=3000;

dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/api', projectRouter);
app.use('/api',userRouter);



app.get("/hello",(req,res)=>{
    res.json("hi from the server")
});

app.listen(port,()=>{
    console.log("listening from port:"+port);
})