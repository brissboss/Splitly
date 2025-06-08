'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { solidsPreset, gradientsPreset } from '@/lib/utils/gradient';
import { Paintbrush } from 'lucide-react';
import { useMemo, useState } from 'react';

export function PickerExample() {
	const [background, setBackground] = useState('#B4D455');

	return (
		<div
			className="preview flex h-full min-h-[350px] w-full items-center justify-center rounded !bg-cover !bg-center p-10 transition-all"
			style={{ background }}
		>
			<GradientPicker background={background} setBackground={setBackground} />
		</div>
	);
}

export function GradientPicker({
	background,
	setBackground,
	className,
}: {
	background: string;
	setBackground: (background: string) => void;
	className?: string;
}) {
	const solids = solidsPreset;
	const gradients = gradientsPreset;

	const defaultTab = useMemo(() => {
		if (background.includes('url')) return 'image';
		if (background.includes('gradient')) return 'gradient';
		return 'solid';
	}, [background]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className={cn('p-2 font-normal', !background && 'text-muted-foreground', className)}>
					<div className="flex items-center gap-2">
						{background ? (
							<div className="h-6 w-6 rounded-lg !bg-cover !bg-center transition-all" style={{ background }}></div>
						) : (
							<div className="flex h-6 w-6 items-center justify-center">
								<Paintbrush className="h-8 w-8" />
							</div>
						)}
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-64">
				<Tabs defaultValue={defaultTab} className="w-full">
					<TabsList className="mb-4 w-full">
						<TabsTrigger className="flex-1" value="solid">
							Solid
						</TabsTrigger>
						<TabsTrigger className="flex-1" value="gradient">
							Gradient
						</TabsTrigger>
					</TabsList>

					<TabsContent value="solid" className="mt-0 flex flex-wrap gap-1">
						<div className="ring-offset-background focus-visible:ring-ring mt-0 flex max-h-32 flex-wrap gap-1 overflow-y-auto focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
							{solids.map((s, index) => (
								<div
									key={`${s}-${index}`}
									style={{ background: s }}
									className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
									onClick={() => setBackground(s)}
								/>
							))}
						</div>
					</TabsContent>

					<TabsContent value="gradient" className="mt-0">
						<div className="ring-offset-background focus-visible:ring-ring mt-0 flex max-h-32 flex-wrap gap-1 overflow-y-auto focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
							{gradients.map((s, index) => (
								<div
									key={`${s}-${index}`}
									style={{ background: s }}
									className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
									onClick={() => setBackground(s)}
								/>
							))}
						</div>
					</TabsContent>

					<TabsContent value="password">Change your password here.</TabsContent>
				</Tabs>

				<Input id="custom" value={background} className="col-span-2 mt-4 h-8" onChange={(e) => setBackground(e.currentTarget.value)} />
			</PopoverContent>
		</Popover>
	);
}
