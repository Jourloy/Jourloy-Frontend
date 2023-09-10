import {
	Button,
	Center,
	Divider,
	Grid,
	Modal,
	NumberInput,
	Radio,
	Title,
	Group,
	Space,
	Text,
} from "@mantine/core";
import {useState} from "react";
import {store} from "../../../../store/store";
import {useForm} from "@mantine/form";
import {DatePickerInput} from "@mantine/dates";

export default function SettingsModal() {
	const [tracker, setTracker] = useState(store.getState().trackerReducer.tracker);
	store.subscribe(() => {
		const _tracker = store.getState().trackerReducer.tracker;
		if (tracker !== _tracker) setTracker(_tracker);
	});

	const [modalShow, setModalShow] = useState(false);
	const [deleteMode, setDeleteMode] = useState(false);

	const form = useForm({
		initialValues: {
			dayLimit: tracker.dayLimit,
			calc: tracker.calc,
			startDate: new Date(tracker.createdAt),
		},
		validate: {
			dayLimit: value => (value <= 0 ? `Сумма должна быть больше нуля` : null),
			calc: value => (value === `` ? `Выбери режим` : null),
			startDate: value => (value === null ? `Выбери дату` : null),
		},
	});

	const onClose = () => {
		form.reset();
		setModalShow(false);
	};

	const onSubmit = (values: {dayLimit: number; calc: string}) => {
		console.log(values);
	};

	return (
		<>
			<Modal opened={modalShow} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title order={2} align={`center`}>
							Настройки трекера
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<form onSubmit={form.onSubmit(values => onSubmit(values))} style={{width: `100%`}}>
						<Grid.Col>
							<NumberInput
								label={`Лимит на период`}
								min={1}
								required
								{...form.getInputProps(`dayLimit`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<DatePickerInput
								label={`Дата начала отсчета`}
								valueFormat={`DD.MM.YY`}
								required
								value={form.values.startDate}
								onChange={value => {
									if (!value) {
										form.setFieldError(`startDate`, `Выбери дату`);
										return;
									}
									form.setFieldValue(`startDate`, value);
								}}
								autoFocus={false}
								popoverProps={{
									withinPortal: true,
								}}
							/>
						</Grid.Col>

						<Grid.Col>
							<Center>
								<Radio.Group
									name={`calc`}
									label={`Как рассчитывать лимит денег`}
									withAsterisk
									{...form.getInputProps(`calc`)}
								>
									<Group position={`apart`}>
										<Radio label={`По дням`} value={`dayCalc`} color={`orange`} />
										<Radio
											label={`По неделям`}
											value={`weekCalc`}
											color={`orange`}
										/>
									</Group>
								</Radio.Group>
							</Center>
						</Grid.Col>

						<Grid.Col>
							<Button
								fullWidth
								variant={`outline`}
								type={`submit`}
								disabled={!form.isDirty()}
							>
								Сохранить
							</Button>
						</Grid.Col>
					</form>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col hidden={deleteMode}>
						<Title order={3} align={`center`} tt={`uppercase`} color={`red`}>
							Опасная зона
						</Title>
					</Grid.Col>

					<Grid.Col hidden={deleteMode}>
						<Button fullWidth color={`red`} onClick={() => setDeleteMode(true)}>
							Удалить
						</Button>
					</Grid.Col>

					<Grid.Col hidden={!deleteMode}>
						<Title order={3} align={`center`} tt={`uppercase`}>
							Точно удалить?
						</Title>
					</Grid.Col>

					<Grid.Col hidden={!deleteMode}>
						<Text align={`center`} color={`dimmed`} mt={`-15px`}>
							Это действие нельзя будет отменить
						</Text>
					</Grid.Col>

					<Grid.Col md={6} sm={12} orderMd={1} orderSm={2} hidden={!deleteMode}>
						<Button fullWidth color={`red`} variant={`outline`}>
							Да
						</Button>
					</Grid.Col>

					<Grid.Col md={6} sm={12} orderMd={2} orderSm={1} hidden={!deleteMode}>
						<Button fullWidth color={`green`} onClick={() => setDeleteMode(false)}>
							Нет
						</Button>
					</Grid.Col>
				</Grid>
			</Modal>

			<Grid.Col>
				<Space h={`10px`} />
				<Button fullWidth variant={`outline`} onClick={() => setModalShow(true)}>
					Настроить
				</Button>
			</Grid.Col>
		</>
	);
}
