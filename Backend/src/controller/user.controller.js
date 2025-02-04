"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../model/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class User {
    // Register handler
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req, "request to register user");
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { name, email, password } = req.body;
            try {
                const existingUser = yield user_model_1.default.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ error: "Email is already taken" });
                }
                // Hashing password
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                // Creating user
                const newUser = new user_model_1.default({
                    name,
                    email,
                    password: hashedPassword,
                });
                console.log("new user ", newUser);
                try {
                    const result = yield newUser.save();
                    console.log(result, "result from new user");
                }
                catch (err) {
                    console.log("error craeting user");
                }
                newUser.password = "";
                return res.status(201).json({
                    message: "Your account has been created successfully",
                    user: newUser,
                });
            }
            catch (error) {
                console.error("Registration error:", error);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    // Login handler
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Incoming login request", req.body);
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { email, password } = req.body;
                const user = yield user_model_1.default.findOne({ email });
                if (!user) {
                    console.log("User not found");
                    return res.status(404).json({ error: "User not found" });
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    console.log("Incorrect password attempt");
                    return res.status(400).json({ error: "Incorrect password" });
                }
                if (!process.env.JWT_SECRET) {
                    console.error("JWT_SECRET missing");
                    return res.status(500).json({ error: "Internal server error" });
                }
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                });
                console.log("Generated token:", token);
                res.cookie("chatUser", token, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    httpOnly: true,
                });
                return res.status(200).json({ message: "Login successful", token });
            }
            catch (error) {
                console.error("Login error:", error);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.default = new User();
