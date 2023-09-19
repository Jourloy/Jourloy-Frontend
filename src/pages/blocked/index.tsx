import {Container, Grid, Card, Title, Text} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";

export default function Blocked() {
	useDocumentTitle(`Нет доступа`);

	return (
		<>
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
					<Card ml={`15px`} withBorder w={`100%`} h={`100%`}>
						<Grid gutter={10}>
							<Grid.Col>
								<Title align={`center`}>Упс</Title>
							</Grid.Col>

							<Grid.Col>
								<Text c={`dimmed`} align={`center`} mt={`-10px`}>
									Кажется у тебя нет доступа к страницам. Войди в свой аккаунт, чтобы
									получить его
								</Text>
							</Grid.Col>
						</Grid>
					</Card>
				</Grid>
			</Container>
		</>
	);
}
