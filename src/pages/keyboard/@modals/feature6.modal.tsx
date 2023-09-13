import {Divider, Grid, Modal, Title, Text} from "@mantine/core";

type TProps = {
	opened: boolean;
	onClose: () => void;
};

export default function KeyboardFeature6(props: TProps) {
	const onClose = () => {
		props.onClose();
	};

	return (
		<>
			<Modal opened={props.opened} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title align={`center`}>Подходит каждому</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
							Не важно какой операционной системой ты пользуешься, клавиатура везде
							работает одинаково
						</Text>
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
							Если есть предпочтения в маркировке раскладки на клавишах, то мы подготовили
							такие клавиши для MacOS и Windows, а если ты пользуешься Linux или постоянно
							меняешь ОС, то у нас есть универсальная раскладка
						</Text>
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
							Ну а для тех, кто любит минимализм, мы готовы оставить клавиши абсолютно
							пустые
						</Text>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}
