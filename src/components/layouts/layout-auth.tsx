import LanguageToggle from '@/components/layouts/language-toggle';
import ModeToggle from '@/components/layouts/mode-toggle';

function LayoutAuth({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-dvh items-center justify-center">
			<div className="absolute top-2 right-2">
				<LanguageToggle />
				<ModeToggle />
			</div>
			<main>{children}</main>
		</div>
	);
}

export default LayoutAuth;
