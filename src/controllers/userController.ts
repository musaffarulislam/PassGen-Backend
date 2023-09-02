import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateAccessToken, verifyAccessToken } from "./tokenController";
import {
  create,
  findOne,
  UserFindById as findUserById,
  savePassword,
  findPasswordsByUserId
} from "../repositories/userRepositories";
import { IUser } from "../models/userSchema";




export const registerUser = async (req: Request, res: Response) => {
  const { userName, email, password }: IUser = req.body;
  try {
    const existingUser = await findOne(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData: any = { userName, email, password: hashedPassword };
    const newUser = await create(userData);

    const token = generateAccessToken(newUser._id, "7d")

    res.status(201).json({ user: newUser.userName,  token: `Bearer ${token}`});
  } catch (error) { 
    res.status(500).json({ error: "Failed to register user" });
  }
};




export const userLogin = async (req: Request, res: Response) => { 
  const { email, password }: IUser = req.body;
  try {
    const existingUser = await findOne(email);
    console.log(existingUser)
    if (!existingUser) {
      return res.status(400).json({ error: "Email does not exist" });
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = generateAccessToken(existingUser._id, "7d")

    res.status(200).json({ user: existingUser.userName,  token: `Bearer ${token}`});
  } catch (error) {
    res.status(500).json({ error: "Failed to login User" });
  }
};




export const savedPassword = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const { appName, userName, password } = req.body;

    const user = await findUserById(userId);
    console.log(1)
    if(!user){
      res.status(400).json({error:"No User Found"})
    }
    const savedPasswordData:any = {
      appName,
      userName,
      password,
    };

    await savePassword(userId, savedPasswordData);

    res.status(201).json({ message: 'Saved password successfully' });
  } catch (error) { 
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const fetchSavedData = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;

    const savedPasswords = await findPasswordsByUserId(userId);

    const savedPass = savedPasswords ? savedPasswords.savedPassword.map((item: any) => ({
      userName: item.userName,
      appName: item.appName,
      password: item.password,
    })) : [];

    return res.status(200).json(savedPass);
  } catch (error) { 
    return res.status(500).json({ error: "Internal server error" });
  }
};
