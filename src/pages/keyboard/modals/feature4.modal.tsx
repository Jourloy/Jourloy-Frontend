import {Divider, Grid, Modal, Title, Text} from "@mantine/core";

type TProps = {
	opened: boolean;
	onClose: () => void;
};

export default function KeyboardFeature4(props: TProps) {
	const onClose = () => {
		props.onClose();
	};

	return (
		<>
			<Modal opened={props.opened} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title align={`center`}>Механика</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
							Все клавиши - механические. Поэтому приятный отклик и звук присутствует
						</Text>
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
							При желании заменить свитч не нужно ничего паять, можешь просто достать его и
							вставить новый, ведь клавиатура HotSwap
						</Text>
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
							А клавиши еще проще, их можно легко достать даже рукой. Но в любом случае мы
							кладем в комплект принадлежности для клавиатуры
						</Text>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}
