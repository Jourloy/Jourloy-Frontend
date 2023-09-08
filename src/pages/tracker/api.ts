import {CancelToken} from "axios";
import BackendContext from "../../context/backend.context";
import {TTracker} from "../../types";
import {store} from "../../store/store";
import {trackerActions} from "../../store/features/tracker.slice";

export default class TrackerAPI extends BackendContext {
	constructor() {
		super(`/tracker`);
	}

	/* TRACKER */

	public createTracker(data: TTrackerCreate) {
		return this.context.post(`/`, data);
	}

	public getTracker(token?: CancelToken) {
		return this.context.get<TTracker>(`/`, {cancelToken: token});
	}

	/**
	 * Fetches the tracker data and updates the tracker in the store.
	 *
	 * @param token - Optional cancel token for the request.
	 * @returns The HTTP status code of the request.
	 */
	public async autoUpdateTracker(token?: CancelToken) {
		// Fetch the tracker data
		return this.getTracker(token)
			.then(d => {
				// Dispatch an action to update the tracker in the store
				store.dispatch(trackerActions.forceUpdateTracker(d.data));
				// Return a success status code
				return 200;
			})
			.catch(e => {
				if (e && e.response) {
					// Return the status code from the error response
					return e.response.status;
				}
				// Return a generic error status code
				return 600;
			});
	}

	/* SPENDS */

	public async addSpend(data: TSpend, token?: CancelToken) {
		return await this.context.post(
			`/spend`,
			data,
			{cancelToken: token}
		);
	}
}

type TTrackerCreate = {
	limit: number;
	startLimit: number;
	dayLimit: number;
	months: number;
	calc: string;
};

type TSpend = {
	cost: number;
	category: string;
	description?: string;
	date?: Date | null;
};