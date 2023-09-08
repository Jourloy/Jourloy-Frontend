import {Button, Divider, Grid, Modal, NumberInput, Select, Switch, TextInput, Title} from "@mantine/core";
import {DateInput} from "@mantine/dates";
import {useState} from "react";
import TrackerAPI from "../../api";
import TrackerModalsLogic from "./logic";
import {toast} from "react-toastify";

type TSpendModalProps = {
	opened: boolean;
	onClose: () => void;
};

const categoryData = [
	{value: `work`, label: `Зарплата`},
	{value: `other`, label: `Другое`},
];

const repeatData = [
	{value: `never`, label: `Никогда`},
	{value: `week`, label: `Каждую неделю`},
	{value: `month`, label: `Каждый месяц`},
	{value: `year`, label: `Каждый год`},
];

export default function SpendModal(props: TSpendModalProps) {
	const backend = new TrackerAPI();

	const [cost, setCost] = useState<number | undefined>();
	const [costError, setCostError] = useState<string | null>();

	const [category, setCategory] = useState<string | null>();
	const [categoryError, setCategoryError] = useState<string | null>();

	const [description, setDescription] = useState(``);

	const [planned, setPlanned] = useState(false);

	const [value, setValue] = useState<Date | null>(null);
	const [valueError, setValueError] = useState<string | null>();

	const [repeat, setRepeat] = useState<string | null>();
	const [repeatError, setRepeatError] = useState<string | null>();

	const checkCost = (num: number | "") => {
		const checked = TrackerModalsLogic.checkNumber(num);

		if (checked.error) {
			setCostError(checked.desc);
			return;
		}

		setCostError(null);
		setCost(checked.result);
	};

	const checkFields = () => {
		if (!cost) setCostError(`Нужно ввести число`);
		else if (cost <= 0) setCostError(`Число должно быть больше нуля`);
		else setCostError(null);

		if (!category) setCategoryError(`Нужно выбрать категорию`);
		else setCategoryError(null);

		if (!planned) {
			setValue(null);
			setValueError(null);
			setRepeat(null);
			setRepeatError(null);
			return;
		}

		if (!value) setValueError(`Нужно выбрать дату`);
		else setValueError(null);

		if (!repeat) setRepeatError(`Нужно выбрать частоту повторения`);
		else setRepeatError(null);
	};

	const onSubmit = () => {
		checkFields();

		if (costError || categoryError || valueError || repeatError) return;
		if (!cost || !category) return;

		const source = backend.getSource();
		backend
			.addSpend({cost: -cost, category: category, description: description, date: value}, source.token)
			.then(() => {
				toast.success(`Расход успешно добавлен`);
				onClose();
			})
			.catch(() => {
				toast.error(`Произошла ошибка, попробуй еще раз позже`);
			});
	};

	const onClose = () => {
		setCost(undefined);
		setCostError(null);
		setCategory(null);
		setCategoryError(null);
		setDescription(``);
		setPlanned(false);
		setValue(null);
		setValueError(null);
		setRepeat(null);
		setRepeatError(null);

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

					<Grid.Col>
						<NumberInput
							label={`Сколько потрачено`}
							placeholder={`В рублях`}
							error={costError}
							onChange={e => checkCost(e)}
						/>
					</Grid.Col>

					<Grid.Col>
						<Select
							data={categoryData}
							label={`Какая категория`}
							error={categoryError}
							onChange={e => setCategory(e)}
						/>
					</Grid.Col>

					<Grid.Col>
						<TextInput label={`Описание`} placeholder={`Необязательно`} />
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
						<DateInput value={value} onChange={setValue} label={`Выбери дату`} error={valueError} />
					</Grid.Col>

					<Grid.Col hidden={!planned}>
						<Select
							data={repeatData}
							label={`Повторяется?`}
							onChange={e => setRepeat(e)}
							error={repeatError}
						/>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Button fullWidth onClick={onSubmit}>Добавить</Button>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}
