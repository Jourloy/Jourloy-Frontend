import {Divider, Grid, Modal, Title, Text} from "@mantine/core";

type TProps = {
	opened: boolean;
	onClose: () => void;
};

export default function KeyboardFeature5(props: TProps) {
	const onClose = () => {
		props.onClose();
	};

	return (
		<>
			<Modal opened={props.opened} onClose={onClose} centered>
				<Grid>
				<Grid.Col>
						<Title align={`center`}>Удобство</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
						Ортогональное расположение клавиш помогает ускорить печать засчет того, что пальцам нужно преодолевать
				меньшее расстояние между клавишами.
						</Text>
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
						А для тех, кто любит печатать вслепую в комплекте лежат две
				маленькие капельки
						</Text>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}
