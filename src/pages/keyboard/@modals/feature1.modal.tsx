import {Divider, Grid, Modal, Title, Text} from "@mantine/core";

type TProps = {
	opened: boolean;
	onClose: () => void;
};

export default function KeyboardFeature1(props: TProps) {
	const onClose = () => {
		props.onClose();
	};

	return (
		<>
			<Modal opened={props.opened} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title align={`center`}>Запуск, 3, 2, 1!</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
							Неважно где ты, использовать клавиатуру всегда легко, достаточно просто
							вставить провод
						</Text>
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
							Все ее настройки перемещаются вместе с ней, а ее компактный дизайн позволяет
							использоваться клавиатуру даже без стола
						</Text>
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
							В качестве подставки можно использовать коленки или клавиатуру ноутбука
						</Text>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}
