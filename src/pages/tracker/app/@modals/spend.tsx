import {
	Button,
	Divider,
	Grid,
	Modal,
	NumberInput,
	Select,
	Switch,
	TextInput,
	Title,
} from "@mantine/core";
import {DateInput} from "@mantine/dates";
import {useState} from "react";
import TrackerAPI from "../../api";
import {toast} from "react-toastify";
import TrackerLogic from "../../logic";
import {useForm} from "@mantine/form";

type TSpendModalProps = {
	opened: boolean;
	onClose: () => void;
};

export default function SpendModal(props: TSpendModalProps) {
	const backend = new TrackerAPI();
	const logic = new TrackerLogic();

	const data = logic.getSpendCategory();
	const repeatData = [
		{value: `never`, label: `Никогда`},
		{value: `week`, label: `Каждую неделю`},
		{value: `month`, label: `Каждый месяц`},
		{value: `year`, label: `Каждый год`},
	];

	const [planned, setPlanned] = useState(false);
	const [addLoading, setAddLoading] = useState(false);

	const form = useForm({
		initialValues: {
			cost: -1,
			category: ``,
			description: ``,
		},
		validate: {
			cost: value => (value >= 0 ? `Сумма должна быть меньше нуля` : null),
			category: value => (value === `` ? `Выберите категорию` : null),
		},
	});

	const onSubmit = (values: {
		cost: number;
		category: string;
		description: string;
		date?: Date;
		repeat?: string;
	}) => {
		setAddLoading(true);
		const source = backend.getSource();
		backend
			.addSpend(values, source.token)
			.then(() => {
				toast.success(`Расход успешно добавлен`);
				onClose();
			})
			.catch(() => {
				toast.error(`Произошла ошибка, попробуй еще раз позже`);
			});
	};

	const onClose = () => {
		form.reset();
		setAddLoading(false);
		setPlanned(false);
		props.onClose();
		backend.autoUpdateTracker();
	};

	return (
		<>
			<Modal opened={props.opened} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title order={2} align={`center`}>
							Добавить расход
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<form onSubmit={form.onSubmit(values => onSubmit(values))} style={{width: `100%`}}>
						<Grid.Col>
							<NumberInput
								label={`Сколько потрачено`}
								placeholder={`В рублях`}
								withAsterisk
								max={-1}
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
							<TextInput
								label={`Описание`}
								placeholder={`Необязательно`}
								{...form.getInputProps(`description`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<Switch
								radius={`sm`}
								label={`Запланировать`}
								checked={planned}
								onChange={e => setPlanned(e.currentTarget.checked)}
								color={`orange`}
							/>
						</Grid.Col>

						<Grid.Col hidden={!planned}>
							<Divider />
						</Grid.Col>

						<Grid.Col hidden={!planned}>
							<DateInput
								label={`Выбери дату`}
								withAsterisk
								minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
								{...form.getInputProps(`date`)}
							/>
						</Grid.Col>

						<Grid.Col hidden={!planned}>
							<Select
								data={repeatData}
								label={`Повторяется?`}
								withAsterisk
								{...form.getInputProps(`repeat`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<Divider />
						</Grid.Col>

						<Grid.Col>
							<Button fullWidth type={`submit`} loading={addLoading}>
								Добавить
							</Button>
						</Grid.Col>
					</form>
				</Grid>
			</Modal>
		</>
	);
}
