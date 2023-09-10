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
	Paper,
} from "@mantine/core";
import {useEffect, useState} from "react";
import {store} from "../../../../store/store";
import {useForm} from "@mantine/form";
import {DatePickerInput} from "@mantine/dates";
import TrackerAPI from "../../api";
import {toast} from "react-toastify";
import {trackerActions} from "../../../../store/features/tracker.slice";
import {useNavigate} from "react-router-dom";

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
	const [deleteLoading, setDeleteLoading] = useState(false);

	/**
	 * Progress for animation
	 * 
	 * Used as width of progress bar
	 */
	const [progress, setProgress] = useState(0);

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

	/**
	 * When mouse down or touch start set width to max
	 */
	const onRemoveStart = () => {
		setProgress(100);
	};

	/**
	 * When mouse up or touch end set width to min
	 */
	const onRemoveEnd = () => {
		setProgress(0);
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
		setDeleteLoading(true);
		backend
			.removeTracker(tracker.id)
			.then(() => {
				toast.success(`Трекер удален`);
				onClose();
				navigate(`/tracker`);
			})
			.catch(() => {
				toast.error(`Что-то пошло не так`);
			})
			.finally(() => setDeleteLoading(false));
	};

	/**
	 * Animation of delete button
	 */
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (progress === 100) {
				setProgress(0);
				onRemove();
			}
		}, 2000);

		return () => {
			clearTimeout(timeout);
		};
	}, [progress]);

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
						<Button
							fullWidth
							color={`red`}
							variant={`outline`}
							loading={deleteLoading}
							onMouseDown={onRemoveStart}
							onMouseUp={onRemoveEnd}
							onTouchStart={onRemoveStart}
							onTouchEnd={onRemoveEnd}
							style={{
							}}
						>
							<Paper
								radius={`sm`}
								style={{
									position: `absolute`,
									width: `${progress}%`,
									backgroundColor: `#fa5252`,
									height: `100%`,
									marginLeft: `-45.5%`,
									zIndex: 50,
									transition: `all 2s ease-in-out`,
								}}
							/>
							<Text style={{zIndex: 51, color: `black`}}>Да</Text>
						</Button>
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
