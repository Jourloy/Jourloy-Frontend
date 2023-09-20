import {
	Button,
	Divider,
	Group,
	Modal,
	Switch,
	Title,
	useMantineColorScheme,
	useMantineTheme,
	Text,
	Stack,
} from "@mantine/core";
import {store} from "../../../store/store";
import {userActions} from "../../../store/features/user.slice";
import LoginAPI from "../../../pages/login/api";
import {toast} from "react-toastify";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IconSun, IconMoonStars} from "@tabler/icons-react";
import BugForm from "../../bugForm";

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

	const [bugMode, setBugMode] = useState(false);

	store.subscribe(() => {
		const _logined = store.getState().userReducer.logined;
		if (logined !== _logined) setLogined(_logined);
	});

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

	const onCloseBugMode = () => {
		setBugMode(false);
	};

	const closeModal = () => {
		props.onClose();
		onCloseBugMode();
	};

	if (!logined) {
		return (
			<Modal opened={props.opened} onClose={closeModal} centered style={{position: `absolute`}}>
				<Stack>
					<Title order={2} align={`center`}>
						Кажется ты не вошел в аккаунт
					</Title>

					<Button fullWidth onClick={login}>
						Войти
					</Button>
				</Stack>
			</Modal>
		);
	}

	return (
		<Modal opened={props.opened} onClose={closeModal} centered style={{position: `absolute`}}>
			<Stack>
				<Title align={`center`}>{store.getState().userReducer.username}</Title>

				<Divider />

				<Group w={`100%`} position={`center`}>
					<Text>Изменить тему сайта</Text>
					<Switch
						checked={colorScheme === `light`}
						onChange={() => toggleColorScheme()}
						radius={`md`}
						size={`md`}
						onLabel={
							<IconSun
								color={theme.white}
								stroke={1.3}
								size={`20px`}
								style={{
									marginRight: `5px`,
								}}
							/>
						}
						offLabel={
							<IconMoonStars
								color={theme.colors.gray[6]}
								stroke={1.3}
								size={`20px`}
								style={{
									marginLeft: `5px`,
								}}
							/>
						}
					/>
				</Group>

				<Divider />

				{!bugMode && (
					<Button fullWidth variant={`outline`} onClick={() => setBugMode(true)}>
						Сообщить о баге
					</Button>
				)}

				{bugMode && <BugForm onClose={onCloseBugMode} />}
				
				{bugMode && <Divider />}

				<Button color={`red`} fullWidth onClick={logout}>
					Выйти
				</Button>
			</Stack>
		</Modal>
	);
}
