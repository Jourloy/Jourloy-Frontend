import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type UserState = {
	username: string;
	avatar: string;
};

const initialState = {} as UserState;

export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		reset: () => initialState,
		changeUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		changeAvatar: (state, action: PayloadAction<string>) => {
			state.avatar = action.payload;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;