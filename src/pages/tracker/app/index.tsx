import {useEffect, useState} from "react";
import {store} from "../../../store/store";
import TrackerAPI from "../api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import DefaultLoading from "../../../components/loading";
import TrackerAppLoaded from "./loaded";

export default function TrackerApp() {
	const backend = new TrackerAPI();
	const navigate = useNavigate();

	const [tracker, setTracker] = useState(store.getState().trackerReducer.tracker);
	store.subscribe(() => {
		const _tracker = store.getState().trackerReducer.tracker;
		if (tracker !== _tracker) setTracker(_tracker);
	});

	const [loading, setLoading] = useState(!tracker);

	useEffect(() => {
		if (!loading) return;

		const source = backend.getSource();
		backend
			.autoUpdateTracker(source.token)
			.then(() => {
				setLoading(false);
			})
			.catch(s => {
				if (s === 403) navigate(`/login`);
				if (s === 404) navigate(`/tracker/create`);
				else {
					toast.error(`Что-то пошло не так`);
					navigate(`/tracker`);
				}
			});

		return () => source.cancel();
	});

	if (loading) return <DefaultLoading />;

	return (<TrackerAppLoaded />);
}
