import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, isLoading: false, error: null },
    reducers: {
      loaduser: (state,action)=>{
        state.user = action.payload
      },
    

    },
    
});

export const {loaduser}=authSlice.actions;
export default authSlice.reducer;