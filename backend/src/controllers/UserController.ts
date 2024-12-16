import { Request,Response } from "express";
import client from "../db/Client";
import jwt from "jsonwebtoken";


const JWT_SECRET=process.env.JWT_SECRET || "Aman1234";

export const createUser=async(req:Request,res:Response)=>{
    const {name,email,password}=req.body;

    try{
        const user=await client.candidate.create({
            data:{
                name,
                email,
                password
            }
        });
        var token=jwt.sign({id:user.id},JWT_SECRET,{expiresIn:'10d'});
        res.status(201).json({token:token});
    }
    catch(error){
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const getUsers=async (req:Request,res:Response)=>{
    try{
        const users=await client.candidate.findMany();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const signin=async (req:Request,res:Response)=>{
    const {email,password}=req.body;

    const user=await client.candidate.findFirst({
        where:{
            email:email,
            password:password
        }
    })
    if(user){
        var token=jwt.sign({id:user.id},JWT_SECRET,{expiresIn:'10d'});
        res.status(201).json({token:token});
    }
    else{
        res.status(500).json({message:"user doesn't exist"});
    }
}