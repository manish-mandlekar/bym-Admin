import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: false, error: null },
  reducers: {
    loaduser: (state, action) => {
      state.user = action.payload;
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { loaduser, setloading } = userSlice.actions;
export default userSlice.reducer;
