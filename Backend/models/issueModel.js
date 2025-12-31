import mongoose from "mongoose";
const Schema=mongoose.Schema;
const issueSchema=new Schema({
    reporter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    images:[{
        type:String,
    }],
    category:{
        type:String,
        required:true,
        default:"Others",
        enum:["Roads","Streetlights","Trash","Water"]
    },
    location:{
        type:{
            type:String,
            enum:['Point'],
            default:"Point"
        },
        coordinates:{
            type: [Number],
            required:true
        }
    },
    status:{
        type:String,
        enum:["Pending","Acknowledged","In Progress","Resolved"],
        default:"Pending"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});
issueSchema.index({ location: "2dsphere" });

issueSchema.pre("save",function(next){
    this.updatedAt=Date.now();
    next();
});

const Issue=mongoose.model("Issue",issueSchema);
export default Issue