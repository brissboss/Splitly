import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import type { member } from '@/types/simulation';
import { GradientPicker } from '../ui/gradien-picker';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Minus } from 'lucide-react';

interface MemberFieldsProps {
	member: member;
	index: number;
	updateMember: (id: string, key: keyof member, value: string | number) => void;
	removeMember: (id: string) => void;
}

function MemberFields({ member, index, updateMember, removeMember }: MemberFieldsProps) {
	const { t } = useTranslation();
	const [color, setColor] = useState('');

	useEffect(() => {
		if (member.color) {
			setColor(member.color);
		}
	}, [member.color]);

	useEffect(() => {
		updateMember(member.id, 'color', color);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [color]);

	return (
		<div key={member.id} className="flex flex-col gap-1">
			<div className="flex items-end gap-2">
				<div className="grid w-fit items-center gap-2">
					<GradientPicker background={color} setBackground={setColor} />
				</div>
				<div className="grid flex-1 items-center gap-2">
					{index === 0 && <Label htmlFor="name">{t('form.section.monthlyIncome.labelName')}</Label>}
					<Input placeholder="John Doe" id="name" value={member.name} onChange={(e) => updateMember(member.id, 'name', e.target.value)} />
				</div>
				<div className="grid w-24 items-center gap-2 sm:w-32">
					{index === 0 && <Label htmlFor="salary">{t('form.section.monthlyIncome.labelSalary')}</Label>}
					<Input
						placeholder={t('form.section.monthlyIncome.labelSalary')}
						type="number"
						step="any"
						id="salary"
						value={member.salary ? member.salary / 100 : ''}
						onChange={(e) => updateMember(member.id, 'salary', Number(e.target.value) * 100)}
					/>
				</div>
				<Button type="button" variant="ghost" size="icon" onClick={() => removeMember(member.id)}>
					<Minus className="h-4 w-5" />
				</Button>
			</div>
		</div>
	);
}

export default MemberFields;
