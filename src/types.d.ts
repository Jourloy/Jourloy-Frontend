export type TUser = {
	id: number;
	username: string;
	lowercaseUsername: string;
	avatar: string;
	createdAt: Date;
	updatedAt: Date;
};

export type TCalculator = {
	id: number;
	name: number;
	positions: TPosition[];
	members: TMember[];
	ownerId: number;
	createdAt: Date;
	updatedAt: Date;
};

export type TMember = {
	id: number;
	name: string;
	avatar: string;
	calculator: TCalculator;
	calculatorId: number;
	payer?: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type TPosition = {
	id: number;
	name: string;
	cost: number;
	memberIds: number[];
	payerId?: number;
	calculator: TCalculator;
	calculatorId: number;
};

export type TTracker = {
	id: number;
	name: string;
	limit: number;
	startLimit: number;
	dayLimit: number;
	months: number;
	calc: string;
	spends: TSpend[];
	createdAt: Date;
	updatedAt: Date;
}

export type TSpend = {
	id: number;
	cost: number;
	category: string;
	description?: string;
	date?: Date;
	createdAt: Date;
	updatedAt: Date;
}