import type { ToastData } from '@/types/toasts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState, useRef } from 'react';

interface ToastProps {
	data: ToastData;
	closeToast: (id: string) => void;
}

function Toast({ data, closeToast }: ToastProps) {
	const [progress, setProgress] = useState(100);
	const startTimeRef = useRef<number | null>(null);
	const animationFrameRef = useRef<number | null>(null);
	const isHoveredRef = useRef(false);
	const hoverStartTimeRef = useRef<number | null>(null);
	const pausedDurationRef = useRef(0);

	useEffect(() => {
		startTimeRef.current = Date.now();

		const updateProgress = () => {
			if (isHoveredRef.current) {
				animationFrameRef.current = requestAnimationFrame(updateProgress);
				return;
			}
			if (!startTimeRef.current) return;

			const currentTime = Date.now();
			const elapsed = currentTime - startTimeRef.current - pausedDurationRef.current;
			const remaining = Math.max(0, data.duration - elapsed);
			const newProgress = (remaining / data.duration) * 100;

			setProgress(newProgress);

			if (remaining <= 0) {
				setTimeout(() => {
					closeToast(data.id);
				}, 50);
				return;
			}

			animationFrameRef.current = requestAnimationFrame(updateProgress);
		};

		animationFrameRef.current = requestAnimationFrame(updateProgress);

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [data.duration, data.id, closeToast]);

	const handleMouseEnter = () => {
		hoverStartTimeRef.current = Date.now();
		isHoveredRef.current = true;
	};

	const handleMouseLeave = () => {
		if (hoverStartTimeRef.current !== null) {
			pausedDurationRef.current += Date.now() - hoverStartTimeRef.current;
			hoverStartTimeRef.current = null;
		}
		isHoveredRef.current = false;
		animationFrameRef.current = requestAnimationFrame(
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			typeof updateProgress !== 'undefined' ? updateProgress : () => {}
		);
	};

	return (
		<Alert
			className="max-w-96 pr-8"
			variant={data.destructive ? 'destructive' : 'default'}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{data.icon}
			<AlertTitle>{data.title}</AlertTitle>
			<AlertDescription>
				{data.description}
				<div className="absolute bottom-0 left-0 flex h-full w-full items-end overflow-hidden rounded-lg">
					<Progress value={progress} className={`h-0.5 [&>div]:transition-none ${data.destructive ? '[&>div]:bg-destructive' : ''}`} />
				</div>
			</AlertDescription>
			<div className="absolute top-1 right-1">
				<X onClick={() => closeToast(data.id)} size={15} className="text-neutral-500 transition-all hover:text-white" />
			</div>
		</Alert>
	);
}

export default Toast;
