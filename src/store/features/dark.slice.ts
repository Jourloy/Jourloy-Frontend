import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TDarkClass } from "../../types";
import DarkAPI from "../../pages/dark/api";

type DarkState = {
	classes: TDarkClass[];
};

const initialState = {
	classes: [],
} as DarkState;

const backend = new DarkAPI();

export const darkSlice = createSlice({
	name: "partySlice",
	initialState,
	reducers: {
		reset: () => initialState,
		updateClasses: () => {
			backend.getAllClassesInStore();
		},
		updateClassesForce: (state, action: PayloadAction<TDarkClass[]>) => {
			state.classes = action.payload;
		}
	},
});

export const darkActions = darkSlice.actions;
export default darkSlice.reducer;
