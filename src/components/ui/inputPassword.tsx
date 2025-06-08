import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

function InputPassword({ className, ...props }: React.ComponentProps<'input'>) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="relative">
			<Input type={showPassword ? 'text' : 'password'} className={cn(className, 'py-2 pr-10 pl-3')} {...props} />
			<Button
				type="button"
				variant="link"
				className="absolute top-0 right-0 text-black dark:text-white"
				onClick={() => setShowPassword(!showPassword)}
			>
				{showPassword ? <EyeOff /> : <Eye />}
			</Button>
		</div>
	);
}

export default InputPassword;
