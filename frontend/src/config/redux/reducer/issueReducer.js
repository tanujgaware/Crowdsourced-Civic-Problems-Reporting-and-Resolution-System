import { addIssue, fetchNearByIssues, getMyIssues, updateStatus } from "../action/issueAction"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: null,
    isError: null,
    isSuccess: null,
    Nearbyissues: [],
    myissues: [],
}

const issueSlice = createSlice({
    name: "issues",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchNearByIssues.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchNearByIssues.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.Nearbyissues = action.payload;
            })
            .addCase(fetchNearByIssues.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            // Add Issues
            .addCase(addIssue.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(addIssue.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.myissues.push(action.payload);
            })

            .addCase(addIssue.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            })

            // Get My issues
            .addCase(getMyIssues.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyIssues.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.myissues = action.payload;
            })

            .addCase(getMyIssues.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.myissues = state.myissues.map(issue =>
                    issue._id === action.payload._id
                        ? { ...issue, status: action.payload.status }
                        : issue
                );
            })
    }
})

export default issueSlice.reducer