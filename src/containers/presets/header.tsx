import { Avatar, Button, Container, Divider, Flex, Grid, Group, Header, Modal, Text, Title, UnstyledButton } from "@mantine/core";
import { store } from "../../store/store";
import LayoutAPI from "../api";
import { useEffect, useState } from "react";
import { userActions } from "../../store/features/user.slice";
import { toast } from "react-toastify";
import { DOMAIN } from "../../context";
import LoginAPI from "../../pages/login/api";


export default function HeaderPreset() {
	const backend = new LayoutAPI();
	const loginBackend = new LoginAPI();

	const [avatar, setAvatar] = useState(store.getState().userReducer.avatar);
	store.subscribe(() => {
		const _avatar = store.getState().userReducer.avatar;
		if (avatar !== _avatar) setAvatar(_avatar);
	});

	const [userSettings, setUserSettings] = useState(false);

	const toMain = () => {
		window.location.href = `https://${DOMAIN}`;
	};

	const logout = () => {
		store.dispatch(userActions.reset());
		backend
			.logout()
			.then(() => {
				store.dispatch(userActions.logout());
				window.location.href = `https://${DOMAIN}`;
			})
			.catch(() => {
				toast.error(`Что-то пошло не так`);
			});
	};

	useEffect(() => {
		const source = backend.getToken();

		loginBackend
			.checkUser(source.token)
			.then(d => {
				if (d.data.user.username) store.dispatch(userActions.changeUsername(d.data.user.username));
				if (d.data.user.avatar) store.dispatch(userActions.changeAvatar(d.data.user.avatar));
			})
			.catch(() => null);

		return () => source.cancel();
	}, []);
	
	return (
		<>
		<Modal opened={userSettings} onClose={() => setUserSettings(false)} centered style={{position: `absolute`}}>
				<Grid>
					<Grid.Col>
						<Title align={`center`}>Настройки</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Text>Имя: {store.getState().userReducer.username}</Text>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Button color={`red`} fullWidth onClick={logout}>
							Выйти
						</Button>
					</Grid.Col>
				</Grid>
			</Modal>
		<Header height={45} w={`100%`} bg={`dark`}>
			<Flex h={40} w={`100%`} justify={`center`} align={`center`}>
				<Container maw={`850px`} w={`100%`} p={0}>
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
				</Container>
			</Flex>
		</Header>
		</>
	);
	
}