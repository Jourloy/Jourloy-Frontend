import {store} from "../../store/store";
import {TSpend} from "../../types";

export default class TrackerLogic {
	private tracker = store.getState().trackerReducer.tracker;

	/**
	 * Returns the calculation mode.
	 * @returns {string} The calculation mode ('Недельный' or 'Дневной').
	 */
	public getCalcMode() {
		// If the calculation mode is 'weekCalc', return 'Недельный'
		if (this.tracker.calc === "weekCalc") {
			return "Недельный";
		}
		// Otherwise, return 'Дневной'
		return "Дневной";
	}

	/**
	 * Returns the number of days based on the limit and dayLimit properties of the tracker object.
	 * @returns {number} The number of days.
	 */
	public getDays() {
		// Calculate the number of days by dividing the limit by the dayLimit and rounding down.
		return Math.floor(this.tracker.limit / this.tracker.dayLimit);
	}

	/**
	 * Calculates the progress based on the number of days elapsed.
	 * @returns {number} The progress percentage.
	 */
	public getProgress() {
		// Number of months to consider. If no months are set, default to 2.
		const _months = this.tracker.months === 0 ? 2 : this.tracker.months;

		// Maximum number of days based on the number of months.
		const max = _months * 30;

		// If the number of days is greater than the maximum, return 100% progress.
		if (this.getDays() > max) return 100;

		// If the number of days is negative, return 0% progress.
		if (this.getDays() < 0) return 0;

		// Calculate and return the progress percentage.
		return (this.getDays() / max) * 100;
	}

	/**
	 * Returns the color for the progress based on the current progress value and the number of months.
	 * @returns {string} The color for the progress.
	 */
	public getProgressColor() {
		// Get the current progress
		const progress = this.getProgress();

		// Check if the number of months is 0
		if (this.tracker.months === 0) {
			// Return red if progress is less than 30
			if (progress < 30) return `red`;
			// Return orange if progress is less than 40
			if (progress < 40) return `orange`;
			// Return green for all other cases
			return `green`;
		} else {
			// Calculate the threshold values based on the number of months
			const threshold1 = (this.tracker.months * 30) / 4;
			const threshold2 = (this.tracker.months * 30) / 2;

			// Return red if progress is less than threshold1
			if (progress < threshold1) return `red`;
			// Return orange if progress is less than threshold2
			if (progress < threshold2) return `orange`;
			// Return green for all other cases
			return `green`;
		}
	}

	/**
	 * Checks if a given value is a valid number.
	 * @param num The value to check.
	 * @param opt Optional configuration options.
	 * @returns An object with the result of the check.
	 * @deprecated Move all validates to form
	 */
	public checkNumber(num: number | "", opt?: TCheckNumberOpts) {
		// Check if the value is not a number
		if (isNaN(Number(num))) {
			return {error: true, desc: `Это должно быть числом`};
		}

		// Check if the value is less than or equal to 0 when the 'zero' option is disabled
		if (!opt?.zero && Number(num) <= 0) {
			return {error: true, desc: `Число должно быть больше нуля`};
		}

		// Return the result as a valid number
		return {error: false, result: Number(num)};
	}

	/**
	 * Returns the mode based on the given calculation mode.
	 * @param calcMode - The calculation mode.
	 * @returns The corresponding mode string.
	 */
	public getMode(calcMode: string | null | undefined) {
		// If the calculation mode is not provided, return 'XXX'
		if (!calcMode) return `XXX`;

		// If the calculation mode is 'dayCalc', return 'день'
		if (calcMode === `dayCalc`) return `день`;

		// If the calculation mode is 'weekCalc', return 'неделю'
		if (calcMode === `weekCalc`) return `неделю`;

		// If the calculation mode is not recognized, return 'XXXX'
		return `XXXX`;
	}

	/**
	 * Returns the day limit based on the calculation mode and budget.
	 *
	 * @param calcMode - The calculation mode ('dayCalc' or 'weekCalc').
	 * @param budget - The budget amount.
	 * @returns The day limit as a string.
	 */
	public getDayLimit(calcMode: string | null | undefined, budget: number | null | undefined) {
		// If calculation mode is not provided, return 0.
		if (!calcMode) return `0`;

		// If budget is not provided, return 0.
		if (!budget) return `0`;

		// If calculation mode is 'dayCalc', calculate and return the day limit.
		if (calcMode === `dayCalc`) return `около ${Math.round(budget / 30)} рублей в день`;

		// If calculation mode is 'weekCalc', calculate and return the week limit.
		if (calcMode === `weekCalc`) return `около ${Math.round(budget / 4)} рублей в неделю`;

		// Default case: return 0.
		return `0`;
	}

	/**
	 * Retrieves the income categories.
	 *
	 * @returns An array of income categories.
	 */
	public getIncomeCategory() {
		return [
			{value: `work`, label: `Зарплата`}, // Represents income from work
			{value: `other`, label: `Другое`}, // Represents other income sources
		];
	}

	// Returns an array of spend categories with their corresponding values and labels
	public getSpendCategory() {
		return [
			{value: `food`, label: `Еда`}, // Represents the category for food expenses
			{value: `entertainment`, label: `Развлечения`}, // Represents the category for entertainment expenses
			{value: `health`, label: `Здоровье`}, // Represents the category for health expenses
			{value: `other`, label: `Другое`}, // Represents the category for other expenses
		];
	}

	/**
	 * Formats the given category value.
	 * @param {string} value - The category value to format.
	 * @returns {string|null} - The formatted category label, or null if not found.
	 */
	public formatCategory(value: string) {
		// Check income categories
		for (const cat of this.getIncomeCategory()) {
			if (cat.value === value) return cat.label;
		}

		// Check spend categories
		for (const cat of this.getSpendCategory()) {
			if (cat.value === value) return cat.label;
		}

		// Category not found
		return null;
	}

	/**
	 * Calculates and returns the total income.
	 *
	 * @returns {number} The total income.
	 */
	public getTotalIncome() {
		// Filter out spends that have no date and a positive cost
		const spends = this.tracker.spends.filter(s => !s.date && s.cost > 0);

		// Get an array of costs from the filtered spends
		const sums = spends.map(s => s.cost);

		// Calculate the sum of the costs using reduce
		return sums.reduce((a, b) => a + b, 0);
	}

	/**
	 * Returns the total spend.
	 * This function calculates the total spend by filtering out spends with no date and a negative cost,
	 * then summing up the costs of the remaining spends.
	 * @returns {number} The total spend.
	 */
	public getTotalSpend() {
		// Filter spends with no date and negative cost
		const spends = this.tracker.spends.filter(s => !s.date && s.cost < 0);
		// Get the costs of the remaining spends
		const sums = spends.map(s => s.cost);
		// Reduce the costs to calculate the total spend
		return sums.reduce((a, b) => a + b, 0);
	}

	/**
	 * Returns the color for a badge based on the cost of a spend.
	 * @param spend - The spend object containing the cost.
	 * @returns The color string for the badge.
	 */
	public getBadgeColor(spend: TSpend) {
		// If the cost is greater than or equal to 0, return green.
		if (spend.cost >= 0) {
			return `green`;
		} else {
			// If the cost is less than 0, return red.
			return `red`;
		}
	}

	/**
	 * Returns the number of days based on the budget and day limit.
	 * @returns {number} The number of days.
	 */
	public getDaysCount() {
		// Get the budget for today
		const budget = this.getTodayBudget();

		// Calculate the number of days based on the budget and day limit
		return Math.floor(budget / this.tracker.dayLimit);
	}

	/**
	 * Retrieves the budget for today.
	 * @returns The budget for today.
	 */
	public getTodayBudget() {
		// Filter out spends that have a date
		const spends = this.tracker.spends.filter(s => {
			if (s.date) return false;
			return true;
		});

		// Calculate the sum of costs
		const sums = spends.reduce((a, b) => a + b.cost, 0);

		// Return the budget for today
		return this.tracker.limit + sums;
	}

	/**
	 * Calculates the spending limit for today, based on the day limit and the total cost of the spends made today.
	 * @returns {number} The spending limit for today.
	 */
	public getTodayLimit() {
		// Filter the spends made today
		const spends = this.tracker.spends.filter(s => {
			// Ignore spends with a date (not made today)
			if (s.date) return false;

			// Get today's day, year, and month
			const todayDay = new Date().getDate();
			const todayYear = new Date().getFullYear();
			const todayMonth = new Date().getMonth();

			// Check if the spend was made today
			if (
				new Date(s.createdAt).getDate() === todayDay &&
				new Date(s.createdAt).getFullYear() === todayYear &&
				new Date(s.createdAt).getMonth() === todayMonth
			)
				return true;
			return false;
		});

		// Calculate the total cost of the spends made today
		const sums = spends.reduce((a, b) => a + b.cost, 0);

		// Return the spending limit for today (day limit + total cost of spends made today)
		return this.tracker.dayLimit + sums;
	}

	public getMonthSpend() {
		const spends = this.tracker.spends.filter(s => {
			if (s.date || s.cost > 0) return false;

			const todayYear = new Date().getFullYear();
			const todayMonth = new Date().getMonth();

			if (
				new Date(s.createdAt).getFullYear() === todayYear &&
				new Date(s.createdAt).getMonth() === todayMonth
			)
				return true;
			return false;
		});

		return spends.reduce((a, b) => a + b.cost, 0);
	}

	public getMonthIncome() {
		const spends = this.tracker.spends.filter(s => {
			if (s.date || s.cost < 0) return false;

			const todayYear = new Date().getFullYear();
			const todayMonth = new Date().getMonth();

			if (
				new Date(s.createdAt).getFullYear() === todayYear &&
				new Date(s.createdAt).getMonth() === todayMonth
			)
				return true;
			return false;
		});

		return spends.reduce((a, b) => a + b.cost, 0);
	}
}

type TCheckNumberOpts = {
	zero?: boolean;
	min?: number;
	max?: number;
};
