import { store } from "../../store/store";

export default class TrackerLogic {
	private tracker = store.getState().trackerReducer.tracker;

	public getCalcMode() {
		if (this.tracker.calc === `weekCalc`) return `Недельный`;
		return `Дневной`;
	}

	public getDays() {
		return Math.floor(this.tracker.limit / this.tracker.dayLimit);
	}

	public getProgress() {
		const _months = this.tracker.months === 0 ? 2 : this.tracker.months;
		const max = _months * 30;

		if (this.getDays() > max) return 100;
		if (this.getDays() < 0) return 0;

		return (this.getDays() / max) * 100;
	}

	public getProgressColor() {
		const progress = this.getProgress();
		if (this.tracker.months === 0) {
			if (progress < 30) return `red`;
			if (progress < 40) return `orange`;
			return `green`;
		} else {
			if (progress < (this.tracker.months * 30) / 4) return `red`;
			if (progress < (this.tracker.months * 30) / 2) return `orange`;
			return `green`;
		}
	}

	public checkNumber(num: number | "", opt?: TCheckNumberOpts) {
		if (isNaN(Number(num))) return {error: true, desc: `Это должно быть числом`};
		if (!opt?.zero && (Number(num) <= 0)) return {error: true, desc: `Число должно быть больше нуля`};

		return {error: false, result: Number(num)};
	}

	public getMode(calcMode: string | null | undefined) {
		if (!calcMode) return `XXX`;
		if (calcMode === `dayCalc`) return `день`;
		if (calcMode === `weekCalc`) return `неделю`;
		return `XXXX`;
	}

	public getDayLimit(calcMode: string | null | undefined, budget: number | null | undefined) {
		if (!calcMode) return `0`;
		if (!budget) return `0`;

		if (calcMode === `dayCalc`) return `около ${Math.round(budget / 30)} рублей в день`;
		if (calcMode === `weekCalc`) return `около ${Math.round(budget / 4)} рублей в неделю`;

		return `0`;
	}
}

type TCheckNumberOpts = {
	zero?: boolean;
	min?: number;
	max?: number;
}