import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
    user: null,
    isAuthenticated: null,
  }

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;