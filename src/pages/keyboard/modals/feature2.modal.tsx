import {Divider, Grid, Modal, Title, Text} from "@mantine/core";

type TProps = {
	opened: boolean;
	onClose: () => void;
};

export default function KeyboardFeature2(props: TProps) {
	const onClose = () => {
		props.onClose();
	};

	return (
		<>
			<Modal opened={props.opened} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title align={`center`}>Все при себе</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
							Благодаря слоям, все, что ты используешь, точно вместится на клавиатуру
						</Text>
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
							Мы постарались сделать удобную раскладку за которой и сами работаем, но ты
							всегда можешь изменить ее
						</Text>
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
							Для этого не нужно уметь программировать, все делается в простой программе
						</Text>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}
