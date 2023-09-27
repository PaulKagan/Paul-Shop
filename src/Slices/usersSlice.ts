import { User } from "../Interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action:PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
    },
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
