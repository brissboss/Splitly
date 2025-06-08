import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from 'react-i18next';
import MonthlyIncomeSection from '@/components/simulation/formSections/monthlyIncomeSection';
import SharedExpenses from '@/components/simulation/formSections/sharedExpenseSection';
import PersonalExpenses from '@/components/simulation/formSections/personalExpenses';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { Users, UserPlus } from 'lucide-react';
import EmptyStateMessage from '../common/emptyStateMessage';
import { getSimulation } from '@/lib/api/simulationApi';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { setSimulationState } from '@/store/simulationSlice';

function Form() {
	const { t } = useTranslation();
	const simulation = useSelector((state: RootState) => state.simulation);
	const auth = useAuth();
	const dispatch = useDispatch();

	useEffect(() => {
		async function fetchSimulation() {
			if (!auth.token) return;

			const res = await getSimulation(auth.token);

			dispatch(setSimulationState(res));
		}

		fetchSimulation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth.token]);

	return (
		<form>
			<Card className="py-0">
				<CardContent>
					<Accordion type="multiple" defaultValue={['montly-income', 'shared-expense', 'personal-expenses']}>
						<AccordionItem value="montly-income">
							<AccordionTrigger>{t('form.section.monthlyIncome.title')}</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-2">
								<MonthlyIncomeSection />
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="shared-expense">
							<AccordionTrigger>{t('form.section.sharedExpenses.title')}</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-2">
								{simulation.members.length > 1 ? (
									<SharedExpenses />
								) : (
									<EmptyStateMessage icon={<Users size={30} />} text={t('form.section.sharedExpenses.notEnoughMembers')} />
								)}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="personal-expenses">
							<AccordionTrigger>{t('form.section.personalExpenses.title')}</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-2">
								{simulation.members.length > 0 ? (
									<PersonalExpenses />
								) : (
									<EmptyStateMessage icon={<UserPlus size={30} />} text={t('form.section.personalExpenses.noMembers')} />
								)}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</CardContent>
			</Card>
		</form>
	);
}

export default Form;
