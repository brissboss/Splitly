import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

import type { detailExpense, personalExpense, sharedExpenses } from '@/types/simulation';

interface ExpenseFieldsProps {
	simulation: sharedExpenses | personalExpense;
	setTotal: (value: number) => void;
	addDetail: (detail: detailExpense) => void;
	updateDetail: (id: string, key: keyof detailExpense, value: string | number) => void;
	removeDetail: (id: string) => void;
}

function ExpenseFields({ simulation, setTotal, addDetail, updateDetail, removeDetail }: ExpenseFieldsProps) {
	const { t } = useTranslation();

	// function getNestedError(
	//     path: string,
	//     obj: FieldErrors<SimulationFormSchema>
	// ): FieldError | undefined {
	//     return path.split('.').reduce<unknown>((acc, key) => {
	//         if (acc && typeof acc === 'object' && key in acc) {
	//             return (acc as Record<string, unknown>)[key];
	//         }
	//         return undefined;
	//     }, obj) as FieldError | undefined;
	// }

	return (
		<div className="flex flex-col gap-6">
			<div className="flex w-full items-end space-x-2">
				<div className="grid gap-2">
					<Label htmlFor="amount">{t('form.section.sharedExpenses.totalExpenses')}</Label>
					<Input
						placeholder={t('form.section.sharedExpenses.amountPlaceholder')}
						type="number"
						step="any"
						id="amount"
						disabled={simulation.details.length > 0}
						value={simulation.total / 100 === 0 ? '' : simulation.total / 100}
						onChange={(e) => setTotal(Number(e.target.value) * 100)}
					/>
				</div>
				{simulation.details.length <= 0 && (
					<Button
						type="button"
						variant="secondary"
						onClick={() =>
							addDetail({
								id: window.crypto?.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).slice(2),
								label: '',
								amount: 0,
							})
						}
					>
						<Plus className="mr-1 h-4 w-4" /> {t('form.section.sharedExpenses.addDetail')}
					</Button>
				)}
			</div>
			{simulation.details.length > 0 && (
				<div className="flex flex-col gap-4">
					<Separator className="mb-2" />
					{simulation.details.map((detail, index) => {
						// const labelError = getNestedError(
						//     `${fieldsName}.details.${index}.label`,
						//     errors
						// );
						// const amountError = getNestedError(
						//     `${fieldsName}.details.${index}.amount`,
						//     errors
						// );

						return (
							<div key={detail.id} className="flex flex-col gap-1">
								<div className={`flex gap-2 ${index === 0 ? 'items-end' : 'items-center'}`}>
									<div className="grid flex-1 gap-2">
										{index === 0 && <Label>{t('form.section.sharedExpenses.labelDetail')}</Label>}
										<Input
											value={detail.label ?? ''}
											onChange={(e) => updateDetail(detail.id, 'label', e.target.value)}
											// className={
											//     labelError &&
											//     'border-destructive focus-visible:border-destructive'
											// }
											placeholder={t('form.section.sharedExpenses.labelPlaceholder')}
										/>
									</div>
									<div className="grid w-28 gap-2">
										{index === 0 && <Label>{t('form.section.sharedExpenses.amountDetail')}</Label>}
										<Input
											value={detail.amount ? detail.amount / 100 : ''}
											onChange={(e) => updateDetail(detail.id, 'amount', Number(e.target.value) * 100)}
											type="number"
											step="any"
											// className={
											//     amountError &&
											//     'border-destructive focus-visible:border-destructive'
											// }
											placeholder={t('form.section.sharedExpenses.amountPlaceholder')}
										/>
									</div>
									<Button type="button" variant="ghost" size="icon" onClick={() => removeDetail(detail.id)}>
										<Minus className="h-4 w-4" />
									</Button>
								</div>
								{/* {labelError && (
                                    <div className="text-destructive text-sm">
                                        {t(labelError.message as string)}
                                    </div>
                                )}
                                {!labelError && amountError && (
                                    <div className="text-destructive text-sm">
                                        {t(amountError.message as string)}
                                    </div>
                                )} */}
							</div>
						);
					})}
					<div>
						<Button
							type="button"
							variant="secondary"
							onClick={() =>
								addDetail({
									id: window.crypto?.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).slice(2),
									label: '',
									amount: 0,
								})
							}
						>
							<Plus className="mr-1 h-4 w-4" /> {t('form.section.sharedExpenses.addDetail')}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default ExpenseFields;
