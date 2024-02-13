import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
const usersSlice = createSlice({
  name: "users",
  initialState: {
    isAuthenticated: false,
    token: "",
    email: "",
  },
  reducers: {
    authenticateUser: (state, action) => {
      AsyncStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    logUserOut: (state, action) => {
      state.token = null;
      state.email = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem("token");
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      console.log(state.token);
    },
  },
});

export const authenticateUser = usersSlice.actions.authenticateUser;
export const logUserOut = usersSlice.actions.logUserOut;
export const setToken = usersSlice.actions.setToken;
export default usersSlice.reducer;
