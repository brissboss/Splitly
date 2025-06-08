import ExpenseFields from '@/components/forms/expenseFields';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTotalPersonalExpense, addPersonalExpense, updateDetailPersonalExpense, removeDetailPersonalExpense } from '@/store/simulationSlice';
import type { RootState } from '@/store';
import type { detailExpense } from '@/types/simulation';
import { useTranslation } from 'react-i18next';

function PersonalExpenses() {
	const { t } = useTranslation();
	const simulation = useSelector((state: RootState) => state.simulation);
	const dispatch = useDispatch();

	return (
		<div className="flex flex-col gap-4 p-2">
			{simulation.personalExpenses.length > 0 && (
				<Tabs defaultValue={simulation.personalExpenses[0].memberId}>
					<TabsList>
						{simulation.members.map((member, index) => (
							<TabsTrigger key={member.id} value={member.id}>
								{member.name.length > 0 ? member.name : t('result.member', { count: index + 1 })}
							</TabsTrigger>
						))}
					</TabsList>
					{simulation.personalExpenses.map((member, index) => (
						<TabsContent key={member.memberId} value={member.memberId} className="mt-4">
							<ExpenseFields
								simulation={simulation.personalExpenses[index]}
								setTotal={(value: number) =>
									dispatch(
										setTotalPersonalExpense({
											memberId: member.memberId,
											value: value,
										})
									)
								}
								addDetail={(detail: detailExpense) =>
									dispatch(
										addPersonalExpense({
											memberId: member.memberId,
											detailExpense: detail,
										})
									)
								}
								updateDetail={(id: string, key: keyof detailExpense, value: string | number) =>
									dispatch(
										updateDetailPersonalExpense({
											memberId: member.memberId,
											id: id,
											key: key,
											value: value,
										})
									)
								}
								removeDetail={(id: string) =>
									dispatch(
										removeDetailPersonalExpense({
											memberId: member.memberId,
											id: id,
										})
									)
								}
							/>
						</TabsContent>
					))}
				</Tabs>
			)}
		</div>
	);
}

export default PersonalExpenses;
