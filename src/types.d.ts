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
	createdAt: Date;
	updatedAt: Date;
};

export type TPosition = {
	id: number;
	name: string;
	cost: number;
	memberIds: number[];
	calculator: TCalculator;
	calculatorId: number;
};
