import {Button, Divider, Grid, Modal, NumberInput, Select, Title} from "@mantine/core";

type TIncomeModalProps = {
	opened: boolean;
	onClose: () => void;
};

const data = [
	{value: `work`, label: `Зарплата`},
	{value: `other`, label: `Другое`},
];

export default function IncomeModal(props: TIncomeModalProps) {
	return (
		<>
			<Modal opened={props.opened} onClose={props.onClose} centered>
				<Grid>
					<Grid.Col>
						<Title order={2} align={`center`}>
							Добавить доход
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<NumberInput label={`Сколько пришло`} placeholder={`В рублях`} />
					</Grid.Col>

					<Grid.Col>
						<Select data={data} label={`Какая категория`} />
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Button fullWidth>Добавить</Button>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}
