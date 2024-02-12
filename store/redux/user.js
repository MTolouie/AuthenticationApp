import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isAuthenticated: false,
    token: "",
    email: "",
  },
  reducers: {
    authenticate: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      console.log(state.isAuthenticated);
    },
    logout: (state, action) => {
      state.token = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
});

export const authenticateUser = usersSlice.actions.authenticate;
export const logUserOut = usersSlice.actions.logout;
export default usersSlice.reducer;
