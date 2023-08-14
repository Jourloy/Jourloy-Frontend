import {Button, Card, Container, Divider, Flex, Grid, PasswordInput, Text, TextInput, Title} from "@mantine/core";
import {IconArrowNarrowLeft} from "@tabler/icons-react";
import LoginAPI from "./api";

export default function Login() {
	const backend = new LoginAPI();

	const googleRedirect = () => {
		window.location.href = `${backend.context.getUri()}/google`;
	}

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
				<Button mb={`5px`} ml={`15px`} variant={`subtle`} p={0} compact>
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
								Если аккаунта нет, то вводи новые данные, а мы автоматически создадим аккаунт у себя в
								системе
							</Text>
						</Grid.Col>

						<Grid.Col>
							<Divider />
						</Grid.Col>

						<Grid.Col>
							<TextInput w={`100%`} label={`Имя`} placeholder={`Twyxify`} disabled />
						</Grid.Col>

						<Grid.Col>
							<PasswordInput w={`100%`} label={`Пароль`} placeholder={`Password`} disabled />
						</Grid.Col>

						<Grid.Col>
							<Button w={`100%`} mt={`15px`} fullWidth disabled>
								Войти
							</Button>
						</Grid.Col>

						<Grid.Col>
							<Text align={`center`} color={`red`} size={`sm`} mt={`-5px`}>Это тестовая версия и на данный момент вход доступен только через Google</Text>
						</Grid.Col>
					
						<Grid.Col>
							<Divider
								label={
									<Text size={`md`} tt={`uppercase`}>
										или войти через
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
