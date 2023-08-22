import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./features/user.slice";
import partyReducer from "./features/party.slice";

export const store = configureStore({
	reducer: {
		userReducer,
		partyReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;