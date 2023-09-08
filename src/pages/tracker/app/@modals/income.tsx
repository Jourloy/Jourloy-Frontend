import {Button, Divider, Grid, Modal, NumberInput, Select, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import TrackerAPI from "../../api";
import { toast } from "react-toastify";
import { useState } from "react";
import TrackerLogic from "../../logic";

type TIncomeModalProps = {
	opened: boolean;
	onClose: () => void;
};

export default function IncomeModal(props: TIncomeModalProps) {
	const backend = new TrackerAPI();
	const logic = new TrackerLogic();

	const data = logic.getIncomeCategory();

	const [addLoading, setAddLoading] = useState(false);

	const form = useForm({
		initialValues: {
			cost: 1,
			category: ``,
		},

		validate: {
			cost: value => (value <= 0 ? `Сумма должна быть больше нуля` : null),
			category: value => (value === `` ? `Выберите категорию` : null),
		},
	});

	const sumbit = (values: {cost: number, category: string}) => {
		setAddLoading(true);

		backend.addSpend({cost: values.cost, category: values.category}).then(() => {
			toast.success(`Доход успешно добавлен`);
			onClose();
		}).catch(() => {
			toast.error(`Произошла ошибка, попробуй еще раз позже`);
		});
	};	

	const onClose = () => {
		form.reset();
		setAddLoading(false);
		backend.autoUpdateTracker();
		props.onClose();
	}

	return (
		<>
			<Modal opened={props.opened} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title order={2} align={`center`}>
							Добавить доход
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<form onSubmit={form.onSubmit(values => sumbit(values))} style={{width: `100%`}}>
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
								withAsterisk
								{...form.getInputProps(`category`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<Divider />
						</Grid.Col>

						<Grid.Col>
							<Button type={`submit`} fullWidth loading={addLoading}>
								Добавить
							</Button>
						</Grid.Col>
					</form>
				</Grid>
			</Modal>
		</>
	);
}
