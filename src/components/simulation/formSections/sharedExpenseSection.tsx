import { useTranslation } from 'react-i18next';
// import type { SimulationFormSchema } from '@/lib/formSchemas/simulationSchema';
import ExpenseFields from '@/components/forms/expenseFields';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { useDispatch, useSelector } from 'react-redux';
import {
	setProrata,
	setTotalSharedExpenses,
	addDetailSharedExpenses,
	updateDetailSharedExpenses,
	removeDetailSharedExpenses,
} from '@/store/simulationSlice';
import type { RootState } from '@/store';
import type { detailExpense } from '@/types/simulation';

function SharedExpenses() {
	const { t } = useTranslation();
	const simulation = useSelector((state: RootState) => state.simulation.sharedExpenses);
	const dispatch = useDispatch();

	return (
		<div className="flex flex-col gap-4 p-2">
			<ExpenseFields
				simulation={simulation}
				setTotal={(value: number) => dispatch(setTotalSharedExpenses({ value }))}
				addDetail={(detail: detailExpense) => dispatch(addDetailSharedExpenses(detail))}
				updateDetail={(id: string, key: keyof detailExpense, value: string | number) =>
					dispatch(updateDetailSharedExpenses({ id, key, value }))
				}
				removeDetail={(id: string) => dispatch(removeDetailSharedExpenses({ id }))}
			/>
			<div className="mt-4 flex flex-1 items-center justify-between">
				<Label htmlFor="prorata" className="max-w-3/4 text-sm font-normal">
					{t('form.section.sharedExpenses.prorataText')}
				</Label>
				<Switch id="prorata" checked={simulation.prorata} onCheckedChange={(e) => dispatch(setProrata({ value: e }))} />
			</div>
		</div>
	);
}

export default SharedExpenses;
