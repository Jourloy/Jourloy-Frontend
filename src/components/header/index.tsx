import {Avatar, Center, Container, Flex, Group, Header, Title, UnstyledButton} from "@mantine/core";
import {store} from "../../store/store";
import {useEffect, useState} from "react";
import LoginAPI from "../../pages/login/api";
import HeaderSettingsModal from "./modals/settings.modal";
import {useNavigate} from "react-router-dom";

export default function HeaderComponent() {
	const loginBackend = new LoginAPI();
	const navigate = useNavigate();

	const [avatar, setAvatar] = useState(store.getState().userReducer.avatar);
	const [logined, setLogined] = useState(false);
	store.subscribe(() => {
		const _avatar = store.getState().userReducer.avatar;
		const _logined = store.getState().userReducer.logined;
		if (avatar !== _avatar) setAvatar(_avatar);
		if (logined !== _logined) setLogined(_logined);
	});

	const [userSettings, setUserSettings] = useState(false);

	const toMain = () => {
		navigate(`/`);
	};

	useEffect(() => {
		const source = loginBackend.getSource();
		loginBackend.autoLogin(source.token);
		return () => source.cancel();
	});

	useEffect(() => {
		if (document.location.href.includes(`.online`)) {
			if (!store.getState().userReducer.logined) navigate(`/blocked`);
			if (store.getState().userReducer.username !== `Igor Shaposhnikov`) navigate(`/blocked`);
		}
	});

	return (
		<>
			<HeaderSettingsModal opened={userSettings} onClose={() => setUserSettings(false)} />
			<Header height={45} w={`100%`} bg={`dark`}>
				<Flex h={40} w={`100%`} justify={`center`} align={`center`}>
					<Container maw={`850px`} w={`100%`} p={0}>
						<Center h={`100%`}>
							<Group position={`apart`} w={`100%`} px={8} mt={`5px`}>
								<UnstyledButton onClick={toMain}>
									<Flex>
										<Title color={`white`}>JOU</Title>
										<Title color={`blue`} style={{rotate: `180deg`}}>
											R
										</Title>
										<Title color={`red`}>LOY</Title>
									</Flex>
								</UnstyledButton>
								<UnstyledButton onClick={() => setUserSettings(true)}>
									<Flex>
										<Avatar src={avatar} />
									</Flex>
								</UnstyledButton>
							</Group>
						</Center>
					</Container>
				</Flex>
			</Header>
		</>
	);
}
