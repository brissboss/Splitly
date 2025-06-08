import { z } from 'zod';

export const simulationSchema = z.object({
	members: z.array(
		z.object({
			id: z.string().min(10),
			name: z.string().min(1, { message: 'form.errors.nameRequired' }),
			salary: z.number({ message: 'form.errors.salaryRequired' }).min(0, { message: 'form.errors.salaryPositive' }),
		})
	),
	sharedExpenses: z.object({
		prorata: z.boolean(),
		total: z.number().min(0),
		details: z.array(
			z.object({
				label: z.string().min(1, { message: 'form.errors.labelRequired' }),
				amount: z.number({ message: 'form.errors.amountRequired' }).min(0, { message: 'form.errors.amountPositive' }),
			})
		),
	}),
	personalExpenses: z.array(
		z.object({
			memberId: z.string().min(10),
			total: z.number().min(0),
			details: z.array(
				z.object({
					label: z.string().min(1, { message: 'form.errors.labelRequired' }),
					amount: z.number({ message: 'form.errors.amountRequired' }).min(0, { message: 'form.errors.amountPositive' }),
				})
			),
		})
	),
});

export type SimulationFormSchema = z.infer<typeof simulationSchema>;
