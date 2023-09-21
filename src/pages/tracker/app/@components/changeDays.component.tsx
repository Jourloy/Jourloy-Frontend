import LongPressButton from "../../../../components/actions/longPressButton";
import {useState} from "react";
import TrackerLogic from "../../logic";
import TrackerAPI from "../../api";
import {toast} from "react-toastify";

type TProps = {
	add?: boolean;
};

export default function ChangeDays(props: TProps) {
	const logic = new TrackerLogic();
	const api = new TrackerAPI();

	const [loading, setLoading] = useState(false);

	const onPressed = () => {
		setLoading(true);

		if (props.add) {
			logic
				.addDay()
				.then(() => {
					toast.success(`День успешно добавлен`);
					api.autoUpdateTracker();
				})
				.catch(() => {
					toast.error(`Что-то пошло не так`);
				})
				.finally(() => setLoading(false));
		} else {
			logic
				.removeDay()
				.then(() => {
					toast.success(`День успешно убран`);
					api.autoUpdateTracker();
				})
				.catch(() => {
					toast.error(`Что-то пошло не так`);
				})
				.finally(() => setLoading(false));
		}
	};

	return (
		<LongPressButton
			loading={loading}
			onPressed={onPressed}
			label={props.add ? `Добавить день` : `Убрать день`}
			variant={`outline`}
			fullWidth
			seconds={0.8}
		/>
	);
}
