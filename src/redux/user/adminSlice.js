import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false, // Initial admin status
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminStatus: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setAdminStatus } = adminSlice.actions;

export default adminSlice.reducer;
