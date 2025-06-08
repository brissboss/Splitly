import { Badge } from '@/components/ui/badge';
import useFormattedCurrency from '@/hooks/useFormattedCurrency';

type ResultLineProps = {
	label: string;
	value: number;
	noIcon?: boolean;
	color?: string;
};

function ResultLine({ label, value, noIcon, color }: ResultLineProps) {
	const format = useFormattedCurrency();

	return (
		<div className="flex w-full items-center justify-between gap-2">
			<div className={`${noIcon ? '' : 'ml-2'} flex w-full min-w-0 items-center gap-2`}>
				{!noIcon && <span className="h-3 w-3 rounded-full" style={{ background: color ?? '' }}></span>}
				<span className="max-w-[90%] truncate overflow-hidden text-sm whitespace-nowrap">{label}</span>
			</div>
			<Badge variant="default" style={{ background: color ?? '', borderWidth: 0 }}>
				{format(value)}
			</Badge>
		</div>
	);
}

export default ResultLine;
