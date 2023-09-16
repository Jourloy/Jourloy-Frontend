import {
	Button,
	Divider,
	Grid,
	Group,
	Modal,
	Switch,
	Title,
	useMantineColorScheme,
	useMantineTheme,
	Text,
	Textarea,
} from "@mantine/core";
import {store} from "../../../store/store";
import {userActions} from "../../../store/features/user.slice";
import LoginAPI from "../../../pages/login/api";
import {toast} from "react-toastify";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IconSun, IconMoonStars} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import * as Sentry from '@sentry/browser';
import * as _ from "lodash";

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

	const form = useForm({
		initialValues: {
			description: ``,
		},
		validate: {
			description: value => (value.length < 10 ? `Минимум 10 символов` : null),
		}
	})

	const onSubmit = (values: {description: string}) => {
		const eventId = Sentry.captureMessage(_.uniqueId(`Profile-FeedBack-`));

		const userFeedBack = {
			event_id: eventId,
			name: store.getState().userReducer.username,
			comments: values.description,
			email: ``,
		}

		Sentry.captureUserFeedback(userFeedBack);

		toast.success(`Спасибо что сообщили об ошибке`);

		onCloseBugMode();
	}

	const login = () => {
		closeModal();
		navigate(`/login`);
	};

	const onCloseBugMode = () => {
		form.reset();
		setBugMode(false);
	}

	const closeModal = () => {
		props.onClose();
		onCloseBugMode();
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
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col hidden={bugMode}>
						<Button fullWidth variant={`outline`} onClick={() => setBugMode(true)}>
							Сообщить о баге
						</Button>
					</Grid.Col>

					<form style={{width: `100%`}} onSubmit={form.onSubmit(onSubmit)}>
						<Grid.Col hidden={!bugMode}>
							<Textarea
								label={`В чем проблема?`}
								placeholder={`Можешь вкратце описать действия`}
								minRows={3}
								maxRows={5}
								{...form.getInputProps(`description`)}
							/>
						</Grid.Col>

						<Grid.Col hidden={!bugMode}>
							<Button fullWidth type={`submit`}>
								Отправить
							</Button>
						</Grid.Col>

						<Grid.Col hidden={!bugMode}>
							<Button fullWidth variant={`outline`} onClick={onCloseBugMode}>
								Отменить
							</Button>
						</Grid.Col>
					</form>

					<Grid.Col hidden={!bugMode}>
						<Divider />
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
