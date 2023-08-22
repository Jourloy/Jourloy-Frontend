import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TCalculator} from "../../types";

type PartyState = {
	calculator: TCalculator;
	memberPages: number;
	positionPages: number;
};

const initialState = {
	memberPages: 1,
	positionPages: 1,
} as PartyState;

export const partySlice = createSlice({
	name: "partySlice",
	initialState,
	reducers: {
		reset: () => initialState,
		updateCalculator: (state, action: PayloadAction<TCalculator>) => {
			state.calculator = action.payload;
		},
		updateMemberPages: (state, action: PayloadAction<number>) => {
			state.memberPages = action.payload;
		},
		updatePositionPages: (state, action: PayloadAction<number>) => {
			state.positionPages = action.payload;
		},
	},
});

export const partyActions = partySlice.actions;
export default partySlice.reducer;
