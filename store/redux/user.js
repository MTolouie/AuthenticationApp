import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isAuthenticated: false,
    token: "",
    email: "",
  },
  reducers: {
    authenticateUser: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAuthenticated = true;

    },
    logUserOut: (state, action) => {
      state.token = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
});

export const authenticateUser = usersSlice.actions.authenticateUser;
export const logUserOut = usersSlice.actions.logUserOut;
export default usersSlice.reducer;
