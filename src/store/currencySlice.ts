import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Currency = 'EUR' | 'USD';

interface CurrencyState {
	value: Currency;
}

const initialState: CurrencyState = {
	value: (localStorage.getItem('currency') as Currency) ?? 'USD',
};

export const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setCurrency: (state, action: PayloadAction<Currency>) => {
			state.value = action.payload;
			localStorage.setItem('currency', action.payload);
		},
	},
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
