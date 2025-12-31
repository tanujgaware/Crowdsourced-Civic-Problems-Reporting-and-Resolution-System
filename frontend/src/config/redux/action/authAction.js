import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const handleSignIn=createAsyncThunk(
    "/auth/signup",
    async(formData,thunkAPI)=>{
        try{
            const response=await clientServer.post("/signup",formData);
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const handleLogIn=createAsyncThunk(
    "/auth/login",
    async(formData,thunkAPI)=>{
        try{
            const response=await clientServer.post("/login",formData);
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const handleLogout=createAsyncThunk(
    "/auth/logout",
    async(__,thunkAPI)=>{
        try{
            const response=await clientServer.post("/logout");
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const getProfile=createAsyncThunk(
    "/me/profile",
    async(__,thunkAPI)=>{
        try{
            const response=await clientServer.get("/me");
            return response.data
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)