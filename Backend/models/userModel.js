import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Citizen","Official"],
        default:"Citizen",
        required:true,
    },

    issuesReported:{type:Number,default:0},
    issuesResolved:{type:Number,default:0},
    totalPoints:{type:Number,default:0},
    badges:{type:[String],default:[]},
    communityRank:{type:Number,default:0},
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=await bcrypt.hash(this.password,12);
    next();
});


userSchema.methods.comparePassword=async function(myPassword){
    return bcrypt.compare(myPassword,this.password);
}

const User=mongoose.model("User",userSchema);
export default User;