import {useEffect, useState} from "react";
import PartyCreate from "./@create";
import {store} from "../../store/store";
import {useNavigate} from "react-router-dom";
import PartyAPI from "./api";
import PartyApp from "./@app";
import {CancelToken} from "axios";
import {partyActions} from "../../store/features/party.slice";

export default function PartyIndex() {
	document.title = `Party-Калькулятор`;
	
	const navigate = useNavigate();
	const backend = new PartyAPI();

	const [loading, setLoading] = useState(true);
	const [checked, setChecked] = useState(store.getState().partyReducer.calculator != null);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator != null;
		if (checked !== calc) setChecked(calc);
	});

	const getCalculator = async (token?: CancelToken) => {
		return await backend
			.getCalculator(token)
			.then(d => {
				if (d && d.data && d.data.id) {
					store.dispatch(partyActions.forceUpdateCalculator(d.data));

					const memberPages = Math.ceil(d.data.members.length / 5);
					store.dispatch(partyActions.updateMemberPages(memberPages));

					const positionPages = Math.ceil(d.data.positions.length / 10);
					store.dispatch(partyActions.updatePositionPages(positionPages));

					return true;
				}
				return false;
			})
			.catch(() => false);
	};

	useEffect(() => {
		if (!store.getState().userReducer.username) navigate(`/login`);
		const source = backend.getToken();

		getCalculator(source.token).then(() => {
			setLoading(false);
		});

		return () => source.cancel();
	}, [checked]);

	if (!checked) return <PartyCreate />;

	return <PartyApp updateCalculator={getCalculator}/>;
}
