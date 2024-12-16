import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_secret_key'; // Use a secure secret key

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Access denied, no token provided' });
    return;
  }

  try{
    const decoded=jwt.verify(token, JWT_SECRET) as { id: string };
    const id=decoded.id;
    //@ts-ignore
    req.id=id;

    next();
  }
  catch(error){
    res.status(500).json({message:"invalid token"});
  }
};
