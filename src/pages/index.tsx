import {Button, Card, Container, Divider, Grid, Title} from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Main() {
	const navigate = useNavigate();

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
			<Grid maw={`700px`} w={`100%`} p={0} align={`center`} ml={`0px`}>
				<Grid.Col>
					<Card withBorder w={`100%`} h={`100%`}>
						<Grid>
							<Grid.Col>
								<Title align={`center`}>Инструментики</Title>
							</Grid.Col>

							<Grid.Col>
								<Divider />
							</Grid.Col>

							<Grid.Col span={6}>
								<Button fullWidth onClick={() => navigate(`/party`)}>Party калькулятор</Button>
							</Grid.Col>

							<Grid.Col span={6}>
								<Button fullWidth>Фильмы</Button>
							</Grid.Col>
						</Grid>
					</Card>
				</Grid.Col>

				<Grid.Col>
					<Card withBorder w={`100%`} h={`100%`}>
						<Grid>
							<Grid.Col>
								<Title align={`center`}>Также мои проекты</Title>
							</Grid.Col>

							<Grid.Col>
								<Button fullWidth color={`orange`}>Денежный трекер</Button>
							</Grid.Col>
						</Grid>
					</Card>
				</Grid.Col>

				<Grid.Col span={6}>
					<Button fullWidth variant={`outline`}>
						Связаться
					</Button>
				</Grid.Col>

				<Grid.Col span={6}>
					<Button fullWidth variant={`outline`}>
						Купить кофе
					</Button>
				</Grid.Col>
			</Grid>
		</Container>
	);
}
