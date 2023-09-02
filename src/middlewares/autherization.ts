import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: string;
}

const verifyUserToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    
   
    if (!token) {
        const error = new Error('No token provided') as any;
        error.statusCode = 401;
        return next(error);
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY) as any;
        if (decoded) {
             
            req.user = decoded as string;
            next();
        }
    } catch (error) {
        next(error);
    }
};

export default verifyUserToken;
