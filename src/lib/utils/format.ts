export function formatCurrency(value: number, currency: 'EUR' | 'USD', locale: string = 'fr-FR'): string {
	return (value / 100).toLocaleString(locale, {
		style: 'currency',
		currency,
		minimumFractionDigits: value % 100 ? 2 : 0,
		maximumFractionDigits: 2,
	});
}
