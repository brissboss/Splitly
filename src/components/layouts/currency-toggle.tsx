import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '@/store/currencySlice';
import type { RootState } from '@/store';
import { Euro, DollarSign } from 'lucide-react';

type Currency = 'EUR' | 'USD';

function CurrencyToggle() {
	const currency = useSelector((state: RootState) => state.currency.value);
	const dispatch = useDispatch();

	function handleSetCurrency(currency: Currency) {
		dispatch(setCurrency(currency));
	}

	function getCurrencySymbol() {
		switch (currency) {
			case 'EUR':
				return <Euro />;
			case 'USD':
				return <DollarSign />;
			default:
				return <DollarSign />;
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					{getCurrencySymbol()}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => handleSetCurrency('EUR')}>€ EUR</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleSetCurrency('USD')}>$ USD</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default CurrencyToggle;
