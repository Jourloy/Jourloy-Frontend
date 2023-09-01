import {
	Avatar,
	Button,
	Container,
	Divider,
	Flex,
	Footer,
	Grid,
	Group,
	Header,
	Modal,
	Title,
	UnstyledButton,
	Text,
	Center,
	AppShell,
	Space,
} from "@mantine/core";
import {PropsWithChildren, useState} from "react";
import {store} from "../store/store";
import {userActions} from "../store/features/user.slice";
import LayoutAPI from "./api";
import {toast} from "react-toastify";
import {DOMAIN} from "../context";

export default function LayoutContainer(props: PropsWithChildren) {
	const backend = new LayoutAPI();

	const [avatar, setAvatar] = useState(store.getState().userReducer.avatar);
	store.subscribe(() => {
		const _avatar = store.getState().userReducer.avatar;
		if (avatar !== _avatar) setAvatar(avatar);
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
						<Button color={`red`} fullWidth onClick={logout}>
							Выйти
						</Button>
					</Grid.Col>
				</Grid>
			</Modal>
			<AppShell
				header={
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
				}
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
				{props.children}
			</AppShell>
		</>
	);
}
