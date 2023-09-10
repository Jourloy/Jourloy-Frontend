import {Button, Divider, Grid, Modal, Switch, Title, useMantineColorScheme, useMantineTheme} from "@mantine/core";
import {store} from "../../../store/store";
import {userActions} from "../../../store/features/user.slice";
import LoginAPI from "../../../pages/login/api";
import {toast} from "react-toastify";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IconSun, IconMoonStars} from "@tabler/icons-react";

type TProps = {
	opened: boolean;
	onClose: () => void;
};

export default function HeaderSettingsModal(props: TProps) {
	const loginBackend = new LoginAPI();
	const navigate = useNavigate();
	const {colorScheme, toggleColorScheme} = useMantineColorScheme();
	const theme = useMantineTheme();

	const [logined, setLogined] = useState(store.getState().userReducer.logined);

	store.subscribe(() => {
		const _logined = store.getState().userReducer.logined;
		if (logined !== _logined) setLogined(_logined);
	});

	const closeModal = () => {
		props.onClose();
	};

	const logout = () => {
		loginBackend
			.logout()
			.then(() => {
				store.dispatch(userActions.reset());
				closeModal();
				navigate(`/`);
			})
			.catch(() => {
				toast.error(`Что-то пошло не так`);
			});
	};

	const login = () => {
		closeModal();
		navigate(`/login`);
	};

	if (!logined) {
		return (
			<>
				<Modal
					opened={props.opened}
					onClose={closeModal}
					centered
					style={{position: `absolute`}}
				>
					<Grid>
						<Grid.Col>
							<Title order={2} align={`center`}>
								Кажется ты не вошел в аккаунт
							</Title>
						</Grid.Col>

						<Grid.Col>
							<Button fullWidth onClick={login}>
								Войти
							</Button>
						</Grid.Col>
					</Grid>
				</Modal>
			</>
		);
	}

	return (
		<>
			<Modal opened={props.opened} onClose={closeModal} centered style={{position: `absolute`}}>
				<Grid>
					<Grid.Col>
						<Title align={`center`}>{store.getState().userReducer.username}</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Switch
							checked={colorScheme === `light`}
							onChange={() => toggleColorScheme()}
							size="lg"
							onLabel={<IconSun color={theme.white} stroke={1.5} />}
							offLabel={
								<IconMoonStars
									color={theme.colors.gray[6]}
									stroke={1.5}
								/>
							}
						/>
					</Grid.Col>

					<Grid.Col>
						<Button color={`red`} fullWidth onClick={logout}>
							Выйти
						</Button>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}
