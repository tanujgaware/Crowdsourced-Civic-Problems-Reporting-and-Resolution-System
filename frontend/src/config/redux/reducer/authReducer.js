import { createSlice } from "@reduxjs/toolkit";
import { getProfile, handleLogIn,handleLogout,handleSignIn } from "../action/authAction";

const initialState={
    isLoading:null,
    isError:null,
    isSuccess:null,
    user:null,
    profile:null,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        builder 
        //SIGN UP
        .addCase(handleSignIn.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(handleSignIn.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
        })
        .addCase(handleSignIn.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
        })

        //LOGIN
        .addCase(handleLogIn.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(handleLogIn.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload;
        })
        .addCase(handleLogIn.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
        })

        //Logout
        .addCase(handleLogout.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(handleLogout.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.user=null;
        })
        
        .addCase(handleLogout.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
        })

        //Get Profile
        .addCase(getProfile.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getProfile.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.profile=action.payload;
        })
        
        .addCase(getProfile.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
        })
    }
})

export default authSlice.reducer