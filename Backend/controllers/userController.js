import User from "../models/userModel.js";
import ExpressError from "../utils/ExpressError.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/utils.js";
import { badgeRules } from "../utils/utils.js";
dotenv.config();

export const signup=async(req ,res,next)=>{
    const {email,username,password,role}=req.body;
    const newUser=new User({
        email,
        password,
        username,
        role,
    });
    await newUser.save();
    res.status(201).json(`New ${newUser.role} created`);
}

export const login=async(req,res,next)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username:username});
    if(!user || (!await user.comparePassword(password))){
        next(new ExpressError(401,"Invalid Credentials"));
    }
    const token=await generateToken(user._id);
    res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite:"Strict",
        maxAge:3*24*60*60*1000
    });
    const {password:pw,...userData}=user._doc;
    res.status(200).json(userData);
}

export const logout=async(req,res,next)=>{
    res.clearCookie("token",{
        httpOnly:true,
        sameSite:"Strict",
        secure:true
    });
    return res.status(200).json("User Logged Out");
}

export const isAuthenticated=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return next(new ExpressError(401,"No Token Provided"))
    }
    const decoded=await jwt.verify(token,process.env.SECRET_CODE);
    const user=await User.findById(decoded.id).select("-password");
    if(!user){
        return next(new ExpressError(404,"User Not Found"));
    }
    req.user=user;
    res.status(200).json(user);
}

export const getProfile=async(req,res,next)=>{
    const user=await User.findById(req.user._id).select("-password");
    const resolutionRate = user.issuesReported > 0
      ? Math.round((user.issuesResolved / user.issuesReported) * 100)
      : 0;
     const allBadges = Object.keys(badgeRules);
    const earned = user.badges;
    const notEarned = allBadges.filter(b => !earned.includes(b));

    res.json({
      username: user.username,
      email: user.email,
      issuesReported: user.issuesReported,
      issuesResolved: user.issuesResolved,
      totalPoints: user.totalPoints,
      badges: {
        earned,
        notEarned,
      },
      communityRank: user.communityRank,
      resolutionRate,
    });
}