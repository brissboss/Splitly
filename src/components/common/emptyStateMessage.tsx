interface EmptyStateMessageProps {
	icon: React.ReactNode;
	text: string;
}

function EmptyStateMessage({ icon, text }: EmptyStateMessageProps) {
	return (
		<div className="mx-auto my-5 flex max-w-xs flex-col items-center justify-center gap-2 text-center text-neutral-500 dark:text-neutral-400">
			{icon}
			<p className="text-xs">{text}</p>
		</div>
	);
}

export default EmptyStateMessage;
