import {AppShell} from "@mantine/core";
import {useEffect, useState} from "react";
import HeaderComponent from "../components/header";
import {store} from "../store/store";
import Blocked from "../pages/blocked";
import FooterComponent from "../components/footer";
import DefaultLoading from "../components/loading";
import LayoutAPI from "./api";

type TProps = {
	needAuth?: boolean;
	ignoreAppShell?: boolean;
	isForAdmin?: boolean;
	children: React.ReactNode;
};

export default function LayoutContainer(props: TProps) {

	const [logined, setLogined] = useState(store.getState().userReducer.logined);
	store.subscribe(() => {
		const _logined = store.getState().userReducer.logined;
		if (logined !== _logined) setLogined(_logined);
	});

	const [show, setShow] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const backend = new LayoutAPI();

		setLoading(true);

		const source = backend.getSource();

		if (props.isForAdmin) {
			backend.isAdmin(source.token)
				.then(r => {
					if (r.data.isAdmin) {
						setAdmin(r.data.isAdmin);
						setShow(true);
					} else {
						setAdmin(false);
						setShow(false);
					}
				})
				.catch(() => setAdmin(false))
				.finally(() => setLoading(false));
		} else if (props.needAuth) {
			if (!logined) setShow(false);
			else setShow(true);
			setLoading(false);
		} else {
			setShow(true);
			setLoading(false);
		}
	}, [logined, props.isForAdmin, props.needAuth]);

	if (props.ignoreAppShell) {
		return (
			<>
				{show && props.children}
				{!show && <Blocked />}
			</>
		);
	}

	if (loading) return <DefaultLoading />

	return (
		<>
			<AppShell header={<HeaderComponent />} footer={<FooterComponent />}>
				{(!show || (props.isForAdmin && !admin)) && <Blocked />}
				{show && props.children}
			</AppShell>
		</>
	);
}
