import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  userType: 0,
  userId: 0,
  userName: "",
  userPassword: "",
  userIsLogged: false,
};


export const userSlice = createSlice({

  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.type = action.payload.type;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.userPassword = action.payload.userPassword;
      state.userIsLogged = action.payload.userIsLogged;
      state.isLogged = action.payload.userIsLogged;
    },
  },
});

export const  {setUserInfo} = userSlice.actions;
export default userSlice.reducer;