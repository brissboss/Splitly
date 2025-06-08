import type { ReactNode } from 'react';

export interface ToastData {
	id: string;
	icon?: ReactNode;
	title: string;
	description?: string;
	duration: number;
	destructive?: boolean;
}
