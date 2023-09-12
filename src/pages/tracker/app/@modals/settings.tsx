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
import TrackerAPI from "../../api";
import {toast} from "react-toastify";
import {trackerActions} from "../../../../store/features/tracker.slice";
import {useNavigate} from "react-router-dom";
import DeleteButton from "../../../../components/deleteButton";

export default function SettingsModal() {
	const backend = new TrackerAPI();
	const navigate = useNavigate();

	const [tracker, setTracker] = useState(store.getState().trackerReducer.tracker);
	store.subscribe(() => {
		const _tracker = store.getState().trackerReducer.tracker;
		if (tracker !== _tracker) setTracker(_tracker);
	});

	const [modalShow, setModalShow] = useState(false);
	const [deleteMode, setDeleteMode] = useState(false);
	const [changeLoading, setChangeLoading] = useState(false);

	const form = useForm({
		initialValues: {
			dayLimit: tracker.dayLimit,
			calc: tracker.calc,
			startDate: new Date(tracker.createdAt).toDateString(),
			limit: tracker.limit,
		},
		validate: {
			dayLimit: value => (value <= 0 ? `Сумма должна быть больше нуля` : null),
			calc: value => (value === `` ? `Выбери режим` : null),
			startDate: value => (value === null ? `Выбери дату` : null),
		},
	});

	const onClose = () => {
		store.dispatch(trackerActions.updateTracker());
		setModalShow(false);
	};

	const onSubmit = (values: {dayLimit: number; calc: string; startDate: string; limit: number}) => {
		setChangeLoading(true);
		backend
			.updateTracker(values)
			.then(() => {
				toast.success(`Настройки успешно сохранены`);
				onClose();
			})
			.catch(() => {
				toast.error(`Что-то пошло не так`);
			})
			.finally(() => setChangeLoading(false));
	};

	const onRemove = () => {
		return backend
			.removeTracker(tracker.id)
			.then(() => {
				toast.success(`Трекер удален`);
				onClose();
				navigate(`/tracker`);
			})
			.catch(() => {
				toast.error(`Что-то пошло не так`);
			});
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
								withAsterisk
								{...form.getInputProps(`dayLimit`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<NumberInput
								label={`Бюджет`}
								min={1}
								description={`Подробнее об этой настройке можно прочесть под трекером`}
								withAsterisk
								{...form.getInputProps(`limit`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<DatePickerInput
								label={`Дата начала отсчета`}
								valueFormat={`DD.MM.YY`}
								withAsterisk
								value={new Date(form.values.startDate)}
								onChange={value => {
									if (!value) {
										form.setFieldError(`startDate`, `Выбери дату`);
										return;
									}
									form.setFieldValue(`startDate`, new Date(value).toDateString());
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
											disabled
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
								loading={changeLoading}
							>
								Сохранить
							</Button>
						</Grid.Col>
					</form>

					<Grid.Col>
						<Divider />
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

					<Grid.Col span={6} hidden={!deleteMode}>
						<DeleteButton onEnd={onRemove} />
					</Grid.Col>

					<Grid.Col span={6} hidden={!deleteMode}>
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
