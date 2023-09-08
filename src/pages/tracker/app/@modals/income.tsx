import {Button, Divider, Grid, Modal, NumberInput, Select, Title} from "@mantine/core";
import {useForm} from "@mantine/form";

type TIncomeModalProps = {
	opened: boolean;
	onClose: () => void;
};

const data = [
	{value: `work`, label: `Зарплата`},
	{value: `other`, label: `Другое`},
];

export default function IncomeModal(props: TIncomeModalProps) {
	const form = useForm({
		initialValues: {
			cost: 0,
			category: ``,
		},

		validate: {
			cost: value => (value <= 0 ? `Сумма должна быть больше нуля` : null),
			category: value => (value === `` ? `Выберите категорию` : null),
		},
	});

	const sumbit = (values: React.FormEvent<HTMLFormElement>) => {};

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

					<form onSubmit={values => sumbit(values)} style={{width: `100%`}}>
						<Grid.Col>
							<NumberInput
								label={`Сколько пришло`}
								placeholder={`В рублях`}
								withAsterisk
								min={1}
								{...form.getInputProps(`cost`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<Select
								data={data}
								label={`Какая категория`}
								{...form.getInputProps(`category`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<Divider />
						</Grid.Col>

						<Grid.Col>
							<Button type={`submit`} fullWidth>
								Добавить
							</Button>
						</Grid.Col>
					</form>
				</Grid>
			</Modal>
		</>
	);
}
