import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addMember, updateMember, removeMember } from '@/store/simulationSlice';
import type { RootState } from '@/store';
import MemberFields from '@/components/forms/memberFields';
import type { member } from '@/types/simulation';
import { Plus } from 'lucide-react';
import { gradientsPreset } from '@/lib/utils/gradient';

function MonthlyIncomeSection() {
	const { t } = useTranslation();
	const simulation = useSelector((state: RootState) => state.simulation.members);
	const dispatch = useDispatch();

	function handleUpdate(id: string, key: keyof member, value: string | number) {
		dispatch(
			updateMember({
				id: id,
				key: key,
				value: value,
			})
		);
	}

	function handleRemoveMember(id: string) {
		dispatch(removeMember({ id: id }));
	}

	return (
		<div className="flex flex-col gap-4 p-2">
			{simulation.map((member, index) => (
				<MemberFields key={member.id} member={member} index={index} updateMember={handleUpdate} removeMember={handleRemoveMember} />
			))}
			<Button
				type="button"
				variant="secondary"
				onClick={() =>
					dispatch(
						addMember({
							id: window.crypto?.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).slice(2),
							color: gradientsPreset[Math.floor(Math.random() * (gradientsPreset.length - 1))],
							name: '',
							salary: 0,
						})
					)
				}
				className="self-start"
			>
				<Plus className="mr-1 h-4 w-4" /> {t('form.section.monthlyIncome.addMember')}
			</Button>
		</div>
	);
}

export default MonthlyIncomeSection;
