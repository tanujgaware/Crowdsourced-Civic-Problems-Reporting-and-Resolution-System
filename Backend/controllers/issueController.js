import Issue from "../models/issueModel.js";
import User from "../models/userModel.js";
import ExpressError from "../utils/ExpressError.js";
import { checkForBadges } from "../utils/utils.js";

function autoTag(title, description) {
  const categories = {
    Roads: ["pothole", "hole", "road damage", "crater"],
    Streetlights: ["light", "lamp", "streetlight", "bulb"],
    Trash: ["garbage", "trash", "overflowing", "bin"],
    Water: ["water", "leakage", "drainage"]
  };

  const text = (title + " " + description).toLowerCase();
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(word => text.includes(word))) {
      return category;
    }
  }
  return "Others";
}


export const getMyIssues = async (req, res, next) => {
  const issues=await Issue.find({reporter:req.user._id});
  res.status(200).json(issues);
}

export const postIssue = async (req, res, next) => {
  const userId=req.user._id;
  const files = req.files?.length ? req.files.map((file) => { return file.path }) : []

  const { title, description, lat, long } = req.body;
  const category = autoTag(title, description);
  const newIssue = new Issue({
    title,
    description,
    category,
    images: files,
    location: { type: "Point",  coordinates: [parseFloat(long), parseFloat(lat)] },
    reporter: req.user._id
  });
  const user=await User.findById(userId);
  user.issuesReported+=1;
  user.totalPoints+=10;
  checkForBadges(user);
  await user.save();
  await newIssue.save();
  res.status(201).json(newIssue);
}

export const getNearbyIssue = async (req, res, next) => {
  const { lat, long } = req.query;
  if (!lat || !long) {
    return res.status(400).json("Latitude and Longitude are required");
  }
  const maxDistance = 5000;
  const issues = await Issue.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [parseFloat(long), parseFloat(lat)] },
        $maxDistance: maxDistance
      }
    }
  }).sort({ createdAt: -1 });
  res.status(200).json(issues);
}

export const updateStatus=async(req,res,next)=>{
  const {id,status}=req.body;
  const updated=await Issue.findByIdAndUpdate(id,{
    $set:{status:status}
  },{new:true});
  res.status(200).json(updated);
}
    
export const deleteIssue=async(req,res,next)=>{
  const {issueId}=req.params;
  if(req.user.role==="Official"){
    const tobeDeleted=await Issue.findByIdAndDelete(issueId);
    return res.status(200).json(tobeDeleted);
  }
  const tobeDeleted=await Issue.findById(issueId);
  if(req.user._id.toString()!==tobeDeleted.reporter.toString()){
    return next(new ExpressError(401,"You cannot delete This Issue"))
  }
  await tobeDeleted.deleteOne();
  res.status(200).json(tobeDeleted);
}