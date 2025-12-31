import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer.js"
import issueReducer from "./reducer/issueReducer.js"


const store=configureStore({
    reducer:{
        auth:authReducer,
        issue:issueReducer
    }
})

export default store