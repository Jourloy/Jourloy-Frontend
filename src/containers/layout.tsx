import {Footer, Text, Center, AppShell} from "@mantine/core";
import {PropsWithChildren, useEffect, useState} from "react";
import HeaderComponent from "../components/header";
import {store} from "../store/store";
import Blocked from "../pages/blocked";

type TProps = {
	needAuth?: boolean;
	ignoreDomainCheck?: boolean;
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
			else if (
				document.location.host.includes(`.online`) &&
				store.getState().userReducer.username !== `Igor Shaposhnikov` &&
				!props.ignoreDomainCheck
			) {
				setShow(false);
			} else setShow(true);
		} else {
			if (
				document.location.host.includes(`.online`) &&
				store.getState().userReducer.username !== `Igor Shaposhnikov` &&
				!props.ignoreDomainCheck
			) {
				setShow(false);
			} else setShow(true);
		}
	});

	return (
		<>
			<AppShell
				header={<HeaderComponent />}
				footer={
					<Footer height={45}>
						<Center h={`100%`} w={`100%`}>
							<Text align={`center`} size={`sm`}>
								Developed with ❤️ by Jourloy
							</Text>
						</Center>
					</Footer>
				}
			>
				{show && props.children}
				{!show && <Blocked />}
			</AppShell>
		</>
	);
}
