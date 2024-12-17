import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request interface to include `id`
interface AuthenticatedRequest extends Request {
  id?: string; // Add an optional `id` property
}

const JWT_SECRET = process.env.JWT_SECRET || "Aman1234"; // Use a secure secret key

export const authenticateJWT = (
  req: AuthenticatedRequest, // Use the extended interface
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied, no token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.id = decoded.id; // Store `id` in the extended `req` object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", token: token });
  }
};
