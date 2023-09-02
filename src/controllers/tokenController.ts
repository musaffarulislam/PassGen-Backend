import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const generateAccessToken = (userId: string, expireDate: string) =>{
    try{
        return jwt.sign({ userId: userId }, accessTokenSecret, { expiresIn: expireDate });
    }catch (error){
        throw new Error("Errror : generate access token")
    }
} 

export const verifyAccessToken = (token: string) =>{
    try{
        return jwt.verify(token, accessTokenSecret);
    }catch (error){
        throw new Error("Errror : generate access token")
    }
} 