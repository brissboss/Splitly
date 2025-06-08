type member = {
	id: string;
	color: string;
	name: string;
	salary: number;
};

type detailExpense = {
	id: string;
	label: string;
	amount: number;
};

type sharedExpenses = {
	prorata: boolean;
	total: number;
	details: detailExpense[];
};

type personalExpense = {
	memberId: string;
	total: number;
	details: detailExpense[];
};

type simulationState = {
	members: member[];
	sharedExpenses: sharedExpenses;
	personalExpenses: personalExpense[];
};

export type { member, detailExpense, sharedExpenses, personalExpense, simulationState };
