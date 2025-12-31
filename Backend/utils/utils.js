import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import ExpressError from "./ExpressError.js";
import User from "../models/userModel.js";
dotenv.config();

export default function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(err => next(err));
    }
}

export const generateToken = async (userId) => {
    const token = await jwt.sign({ id: userId }, process.env.SECRET_CODE, { expiresIn: "7d" });
    return token;
}

export const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET_CODE);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
        return next(new ExpressError(400, "Unauthorized"))
    }
    req.user = user;
    next();
}

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json("Permission Denied");
        }
        next();
    };
};

export const badgeRules = {
    "First Reported": (user) => user.issuesReported >= 1,
    "Eagle Eye": (user) => user.issuesReported >= 10,
    "Community Helper": (user) => user.issuesResolved >= 5,
    "Super Citizen": (user) => user.issuesReported >= 50 && user.issuesResolved >= 20,
     "Photo Expert": (user) => user.submittedPhotosQuality >= 10,
}

export const checkForBadges = (user) => {
    for (let [badge, condition] of Object.entries(badgeRules)) {
        if (condition(user) && !user.badges.includes(badge)) {
            user.badges.push(badge);
            user.totalPoints += 50;
        }
    }
}

export const getUserRank=async(userId)=>{
    const user=await User.findById(userId).select("totalPoints");
    if(!user) return null;
    const higherUsers=await User.countDocuments({
        totalPoints:{$gt:user.totalPoints},
    });
    return higherUsers+1;
}