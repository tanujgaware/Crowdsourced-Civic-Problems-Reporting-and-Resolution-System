import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchNearByIssues=createAsyncThunk(
    "/api/getIssue",
    async({latitude,longitude},thunkAPI)=>{
        try{
            const response=await clientServer.get(`/api/issues/nearme?lat=${latitude}&long=${longitude}`);
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)
export const getMyIssues=createAsyncThunk(
    "/api/getMyIssues",
    async(__ ,thunkAPI)=>{
        try{
            const response=await clientServer.get("/api/issues");
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const addIssue=createAsyncThunk(
    "/api/postIssue",
    async({title,location,description,files},thunkAPI)=>{
        try{
            const formData=new FormData();
            formData.append("description",description);
            formData.append("lat",parseFloat(location.lat));
            formData.append("long",parseFloat(location.long));
            formData.append("title",title);
            Array.from(files).forEach(file=>{
                formData.append("files",file)
            });
            const response = await clientServer.post("/api/issue", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const updateStatus=createAsyncThunk(
    "/api/updateIssue",
    async({id,status})=>{
        try{
            const response=await clientServer.put("/api/issue",{id,status});
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)