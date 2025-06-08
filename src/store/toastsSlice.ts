import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ToastData } from '@/types/toasts';

interface ToastState {
	toasts: ToastData[];
}

const initialState: ToastState = {
	toasts: [],
};

export const toastsSlice = createSlice({
	name: 'toasts',
	initialState,
	reducers: {
		addToast: (state, action: PayloadAction<ToastData>) => {
			const toast = {
				desctructive: false,
				...action.payload,
			};

			if (state.toasts.length >= 5) {
				state.toasts = state.toasts.slice(1, state.toasts.length);
			}
			state.toasts.push(toast);
		},
		removeToast: (state, action: PayloadAction<{ id: string }>) => {
			state.toasts = state.toasts.filter((t) => t.id !== action.payload.id);
		},
	},
});

export const { addToast, removeToast } = toastsSlice.actions;
export default toastsSlice.reducer;
