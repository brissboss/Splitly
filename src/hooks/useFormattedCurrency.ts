import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { formatCurrency } from '@/lib/utils/format';
import { useTranslation } from 'react-i18next';

function useFormattedCurrency() {
	const currency = useSelector((state: RootState) => state.currency.value);
	const { i18n } = useTranslation();

	return (value: number) => formatCurrency(value, currency, i18n.language);
}

export default useFormattedCurrency;
