import {Button, Card, Container, Divider, Flex, Grid, Loader, PasswordInput, Text, TextInput, Title} from "@mantine/core";
import {IconArrowNarrowLeft} from "@tabler/icons-react";
import LoginAPI from "./api";
import { useEffect, useState } from "react";
import { store } from "../../store/store";
import { userActions } from "../../store/features/user.slice";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const backend = new LoginAPI();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const googleRedirect = () => {
		window.location.href = `${backend.context.getUri()}/google`;
	}

	const toMain = () => {
		navigate(`/`);
	}

	useEffect(() => {
		const source = backend.getToken();

		backend.checkUser(source.token)
			.then(d => {
				if (d.data.user.username) store.dispatch(userActions.changeUsername(d.data.user.username));
				if (d.data.user.avatar) store.dispatch(userActions.changeAvatar(d.data.user.avatar));
				if (d.data.user) navigate(`/party`);
			})
			.catch(() => {
				setLoading(false);	
			});

		return () => source.cancel();
	}, []);

	if (loading) return(<Loader />);

	return (
		<Container
			style={{
				position: `absolute`,
				left: `50%`,
				top: `50%`,
				transform: `translate(-50%, -50%)`,
				display: `flex`,
				justifyContent: `space-between`,
				alignItems: `center`,
				maxWidth: `720px`,
				width: `100%`,
			}}
		>
			<Grid columns={6} maw={`700px`} w={`100%`} p={0} align={`center`}>
				<Button mb={`5px`} ml={`15px`} variant={`subtle`} p={0} compact onClick={toMain}>
					<Flex>
						<IconArrowNarrowLeft stroke={1.3} />
						<Text mt={`2px`}>Вернуться на главную</Text>
					</Flex>
				</Button>

				<Card ml={`15px`} withBorder w={`100%`} h={`100%`}>
					<Grid gutter={10}>
						<Grid.Col>
							<Title align={`center`}>Привет!</Title>
						</Grid.Col>

						<Grid.Col>
							<Text c={`dimmed`} align={`center`} mt={`-10px`}>
								Если аккаунта нет, то автоматически создаться новый
							</Text>
						</Grid.Col>
					
						<Grid.Col>
							<Divider
								label={
									<Text size={`md`} tt={`uppercase`}>
										войти через
									</Text>
								}
								labelPosition={`center`}
							/>
						</Grid.Col>

						<Grid.Col>
							<Button w={`100%`} variant={`outline`} onClick={googleRedirect}>
								Google
							</Button>
						</Grid.Col>
					</Grid>
				</Card>
			</Grid>
		</Container>
	);
}