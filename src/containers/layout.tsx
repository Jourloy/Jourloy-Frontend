import {AppShell} from "@mantine/core";
import {PropsWithChildren, useEffect, useState} from "react";
import HeaderComponent from "../components/header";
import {store} from "../store/store";
import Blocked from "../pages/blocked";
import FooterComponent from "../components/footer";

type TProps = {
	needAuth?: boolean;
	ignoreDomainCheck?: boolean;
	ignoreAppShell?: boolean;
};

export default function LayoutContainer(props: PropsWithChildren<TProps>) {
	const [logined, setLogined] = useState(store.getState().userReducer.logined);
	store.subscribe(() => {
		const _logined = store.getState().userReducer.logined;
		if (logined !== _logined) setLogined(_logined);
	});

	const [show, setShow] = useState(false);

	useEffect(() => {
		if (props.needAuth) {
			if (!logined) setShow(false);
			else setShow(true);
		} else {
			setShow(true);
		}
	});

	if (props.ignoreAppShell) {
		return (
			<>
				{show && props.children}
				{!show && <Blocked />}
			</>
		);
	}

	return (
		<>
			<AppShell
				header={<HeaderComponent />}
				footer={<FooterComponent />}
			>
				{show && props.children}
				{!show && <Blocked />}
			</AppShell>
		</>
	);
}
