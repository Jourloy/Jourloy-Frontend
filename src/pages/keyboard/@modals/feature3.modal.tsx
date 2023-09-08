import {Divider, Grid, Modal, Title, Text} from "@mantine/core";

type TProps = {
	opened: boolean;
	onClose: () => void;
};

export default function KeyboardFeature3(props: TProps) {
	const onClose = () => {
		props.onClose();
	};

	return (
		<>
			<Modal opened={props.opened} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title align={`center`}>Компактность</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Text align={`center`}>
							С такой клавиатурой не придется искать место ни на столе, ни у себя в сумке
							или рюкзаке. А весит она совсем не много, можно брать с собой на работу, в
							путешествие или в кафе
						</Text>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}
