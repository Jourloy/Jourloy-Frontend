import {Card, Divider, Grid, Modal, Title, UnstyledButton, Text} from "@mantine/core";
import {formatter} from "../../../context";

type TProps = {
	opened: boolean;
	onClose: () => void;
};

export default function KeyboardBuyModal(props: TProps) {
	const toTelegram = () => {
		window.location.href = `https://t.me/jourloy/`;
	};

	const onClose = () => {
		props.onClose();
	};

	return (
		<>
			<Modal opened={props.opened} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title align={`center`}>Заказать клавиатуру</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Text>Стоимость клавиатуры: {formatter.format(10000)}</Text>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Text>
							Временно принимаем заказы только через Telegram. Чтобы написать - нажми на
							кнопку ниже или найди нас в поиске
						</Text>
					</Grid.Col>

					<Grid.Col>
						<UnstyledButton onClick={toTelegram} w={`100%`}>
							<Card withBorder>
								<Text align={`center`}>@jourloy</Text>
							</Card>
						</UnstyledButton>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}
