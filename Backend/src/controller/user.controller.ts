import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model";
import dotenv from "dotenv";
dotenv.config();

type BodyTypes = {
  name: string;
  email: string;
  password: string;
};

type LoginBodyTypes = {
  email: string;
  password: string;
};

class User {
  // Register handler
  async register(req: Request, res: Response) {
    console.log(req, "request to register user");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password }: BodyTypes = req.body;

    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already taken" });
      }

      // Hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Creating user
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
      });

      console.log("new user " , newUser);
      

      try {
        const result = await newUser.save();
        console.log(result, "result from new user")
        
      }catch(err) {
        console.log(
          "error craeting user"
        );
        
      }
      newUser.password = "";

      return res.status(201).json({
        message: "Your account has been created successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Login handler
  async login(req: Request, res: Response) {
    console.log("Incoming login request", req.body);
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { email, password }: LoginBodyTypes = req.body;
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log("Incorrect password attempt");
        return res.status(400).json({ error: "Incorrect password" });
      }
  
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET missing");
        return res.status(500).json({ error: "Internal server error" });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      console.log("Generated token:", token);
  
      res.cookie("chatUser", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
  
      return res.status(200).json({ message: "Login successful", token });
  
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}  

export default new User();
