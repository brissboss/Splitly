import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currencySlice';
import simulationReducer from './simulationSlice';
import toastReducer from './toastsSlice';

export const store = configureStore({
	reducer: {
		currency: currencyReducer,
		simulation: simulationReducer,
		toasts: toastReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
