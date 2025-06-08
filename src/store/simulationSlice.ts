import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { member, detailExpense, simulationState } from '@/types/simulation';

const initialState: simulationState = {
	members: [],
	sharedExpenses: {
		prorata: true,
		total: 0,
		details: [],
	},
	personalExpenses: [],
};

export const simulationSlice = createSlice({
	name: 'simulation',
	initialState,
	reducers: {
		addMember: (state, action: PayloadAction<member>) => {
			state.members.push(action.payload);
			state.personalExpenses.push({
				memberId: action.payload.id,
				total: 0,
				details: [],
			});
		},
		updateMember: (
			state,
			action: PayloadAction<{
				id: string;
				key: keyof member;
				value: string | number;
			}>
		) => {
			const memberToUpdate = state.members.find((m) => m.id === action.payload.id);
			if (memberToUpdate) {
				(memberToUpdate[action.payload.key] as typeof action.payload.value) = action.payload.value;
			}
		},
		removeMember: (state, action: PayloadAction<{ id: string }>) => {
			const memberToRemove = state.members.find((m) => m.id === action.payload.id);
			if (memberToRemove) {
				state.members = state.members.filter((member) => member.id !== memberToRemove.id);
				state.personalExpenses = state.personalExpenses.filter((exp) => exp.memberId !== memberToRemove.id);
			}
		},
		setProrata: (state, action: PayloadAction<{ value: boolean }>) => {
			state.sharedExpenses.prorata = action.payload.value;
		},
		setTotalSharedExpenses: (state, action: PayloadAction<{ value: number }>) => {
			state.sharedExpenses.total = action.payload.value;
		},
		addDetailSharedExpenses: (state, action: PayloadAction<detailExpense>) => {
			state.sharedExpenses.details.push(action.payload);
		},
		updateDetailSharedExpenses: (
			state,
			action: PayloadAction<{
				id: string;
				key: keyof detailExpense;
				value: string | number;
			}>
		) => {
			const detailToUpdate = state.sharedExpenses.details.find((d) => d.id === action.payload.id);
			if (detailToUpdate) {
				(detailToUpdate[action.payload.key] as typeof action.payload.value) = action.payload.value;
				if (action.payload.key === 'amount') {
					state.sharedExpenses.total = state.sharedExpenses.details.reduce((acc, d) => acc + d.amount, 0);
				}
			}
		},
		removeDetailSharedExpenses: (state, action: PayloadAction<{ id: string }>) => {
			const detailToDelete = state.sharedExpenses.details.find((d) => d.id === action.payload.id);
			if (detailToDelete) {
				state.sharedExpenses.details = state.sharedExpenses.details.filter((d) => d.id !== detailToDelete.id);
				state.sharedExpenses.total = state.sharedExpenses.details.reduce((acc, d) => acc + d.amount, 0);
			}
		},
		setTotalPersonalExpense: (state, action: PayloadAction<{ memberId: string; value: number }>) => {
			const memberToAdd = state.personalExpenses.find((m) => m.memberId === action.payload.memberId);
			if (memberToAdd) {
				memberToAdd.total = action.payload.value;
			}
		},
		addPersonalExpense: (
			state,
			action: PayloadAction<{
				memberId: string;
				detailExpense: detailExpense;
			}>
		) => {
			const memberToAdd = state.personalExpenses.find((m) => m.memberId === action.payload.memberId);
			if (memberToAdd) {
				memberToAdd.details.push(action.payload.detailExpense);
			}
		},
		updateDetailPersonalExpense: (
			state,
			action: PayloadAction<{
				memberId: string;
				id: string;
				key: keyof detailExpense;
				value: string | number;
			}>
		) => {
			const memberToUpdate = state.personalExpenses.find((m) => m.memberId === action.payload.memberId);
			if (memberToUpdate) {
				const detailToUpdate = memberToUpdate.details.find((d) => d.id === action.payload.id);
				if (detailToUpdate) {
					(detailToUpdate[action.payload.key] as typeof action.payload.value) = action.payload.value;
					if (action.payload.key === 'amount') {
						memberToUpdate.total = memberToUpdate.details.reduce((acc, d) => acc + d.amount, 0);
					}
				}
			}
		},
		removeDetailPersonalExpense: (state, action: PayloadAction<{ memberId: string; id: string }>) => {
			const memberToUpdate = state.personalExpenses.find((m) => m.memberId === action.payload.memberId);
			if (memberToUpdate) {
				const detailToDelete = memberToUpdate.details.find((d) => d.id === action.payload.id);
				if (detailToDelete) {
					memberToUpdate.details = memberToUpdate.details.filter((d) => d.id !== action.payload.id);
					memberToUpdate.total = memberToUpdate.details.reduce((acc, d) => acc + d.amount, 0);
				}
			}
		},
		setSimulationState: (_state, action: PayloadAction<simulationState>) => {
			return action.payload;
		},
		resetSimulationState: (state) => {
			state.members = [];
			state.sharedExpenses = {
				prorata: true,
				total: 0,
				details: [],
			};
			state.personalExpenses = [];
		},
	},
});

export const {
	addMember,
	updateMember,
	removeMember,
	setProrata,
	setTotalSharedExpenses,
	addDetailSharedExpenses,
	updateDetailSharedExpenses,
	removeDetailSharedExpenses,
	setTotalPersonalExpense,
	addPersonalExpense,
	updateDetailPersonalExpense,
	removeDetailPersonalExpense,
	setSimulationState,
	resetSimulationState,
} = simulationSlice.actions;
export default simulationSlice.reducer;
