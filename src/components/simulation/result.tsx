import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ResultLine from '@/components/simulation/resultLine';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import EmptyStateMessage from '../common/emptyStateMessage';
import { CloudAlert, CloudCheck, CloudUpload, Loader2, LogIn, Users } from 'lucide-react';
import type { simulationState } from '@/types/simulation';
import { saveSimulation } from '@/lib/api/simulationApi';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import useToast from '@/hooks/useToast';
import { Link } from 'react-router-dom';

function Result() {
	const { t } = useTranslation();
	const auth = useAuth();
	const toast = useToast();
	const simulation = useSelector((state: RootState) => state.simulation);
	const [isLoading, setIsLoading] = useState(false);

	async function onSubmit(data: simulationState) {
		setIsLoading(true);
		try {
			await saveSimulation(data, auth.token);
			toast({
				id: window.crypto?.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).slice(2),
				icon: <CloudCheck />,
				title: t('toasts.saveSuccessTitle'),
				description: t('toasts.saveSuccessDescription'),
				duration: 3000,
			});
		} catch {
			toast({
				id: window.crypto?.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).slice(2),
				icon: <CloudAlert />,
				title: t('toasts.saveErrorTitle'),
				description: t('toasts.saveErrorDescription'),
				duration: 5000,
				destructive: true,
			});
		} finally {
			setIsLoading(false);
		}
	}

	function calcMemberPayShared(id: string): number {
		const salaryMember = simulation.members.find((m) => m.id === id)?.salary || 0;
		const sharedExpensesAmount = simulation.sharedExpenses.total;

		if (simulation.sharedExpenses.prorata) {
			const totalSalary = simulation.members.reduce((acc, m) => acc + m.salary, 0);
			const sharedExpensesPart = (salaryMember / totalSalary) * sharedExpensesAmount;
			return sharedExpensesPart;
		} else {
			const sharedExpensesPart = sharedExpensesAmount / simulation.members.length;
			return sharedExpensesPart;
		}
	}

	function calcMemberRestSalary(id: string): number {
		const salaryMember = simulation.members.find((m) => m.id === id)?.salary || 0;
		const sharedExpensesAmount = simulation.sharedExpenses.total;
		const personalExpenses = simulation.personalExpenses.find((m) => m.memberId === id)?.total || 0;

		if (simulation.sharedExpenses.prorata) {
			const totalSalary = simulation.members.reduce((acc, m) => acc + m.salary, 0);
			const sharedExpensesPart = (salaryMember / totalSalary) * sharedExpensesAmount;
			return salaryMember - (sharedExpensesPart + personalExpenses);
		} else {
			const sharedExpensesPart = sharedExpensesAmount / simulation.members.length;

			return salaryMember - (sharedExpensesPart + personalExpenses);
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t('result.title')}</CardTitle>
			</CardHeader>
			<Separator />
			<CardContent>
				{simulation.members.length > 0 ? (
					<Accordion type="multiple" defaultValue={['monthly-income', 'shared-expense', 'personal-expenses', 'savings-summary']}>
						<AccordionItem value="monthly-income">
							<AccordionTrigger noChevron={simulation.members.length > 0 ? false : true}>{t('result.monthlyIncome')}</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-2">
								{simulation.members.map((member, index) => (
									<ResultLine
										key={member.id}
										label={member.name.length > 0 ? member.name : t('result.member', { count: index + 1 })}
										value={member.salary}
										color={member.color}
									/>
								))}
							</AccordionContent>
						</AccordionItem>
						{simulation.members.length > 1 && (
							<AccordionItem value="shared-expense">
								<AccordionTrigger>
									<ResultLine label={t('result.sharedExpenses')} value={simulation.sharedExpenses.total} noIcon />
								</AccordionTrigger>
								<AccordionContent className="flex flex-col gap-2">
									{simulation.members.map((member, index) => (
										<ResultLine
											key={member.id}
											label={member.name.length > 0 ? member.name : t('result.member', { count: index + 1 })}
											value={calcMemberPayShared(member.id)}
											color={member.color}
										/>
									))}
								</AccordionContent>
							</AccordionItem>
						)}
						<AccordionItem value="personal-expenses">
							<AccordionTrigger noChevron={simulation.members.length > 0 ? false : true}>
								{t('result.personalExpenses')}
							</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-2">
								{simulation.personalExpenses.map((line, index) => {
									const member = simulation.members.find((m) => m.id === line.memberId);
									const name = member?.name;
									return (
										<ResultLine
											key={line.memberId}
											label={name && name.length > 0 ? name : t('result.member', { count: index + 1 })}
											value={line.total}
											color={member?.color}
										/>
									);
								})}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="savings-summary">
							<AccordionTrigger noChevron={simulation.members.length > 0 ? false : true}>{t('result.savingsSummary')}</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-2">
								{simulation.members.map((line, index) => {
									return (
										<ResultLine
											key={line.id}
											label={line.name.length > 0 ? line.name : t('result.member', { count: index + 1 })}
											value={!Number.isNaN(calcMemberRestSalary(line.id)) ? calcMemberRestSalary(line.id) : 0}
											color={line.color}
										/>
									);
								})}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				) : (
					<EmptyStateMessage icon={<Users size={30} />} text={t('result.noMember')} />
				)}
			</CardContent>
			<CardFooter>
				{auth.user ? (
					<div className="mt-10 flex w-full justify-end">
						<Button type="button" onClick={() => onSubmit(simulation)}>
							{isLoading ? <Loader2 className="animate-spin" /> : <CloudUpload />}
							{t('form.save')}
						</Button>
					</div>
				) : (
					<div className="flex w-full flex-col items-center gap-2">
						<p className="text-center text-xs text-neutral-500 dark:text-neutral-400">{t('auth.signupHint')}</p>
						<Link to="/signup">
							<Button size="sm">
								<LogIn />
								{t('auth.signup')}
							</Button>
						</Link>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}

export default Result;
