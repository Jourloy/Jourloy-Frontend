import {
	Badge,
	Button,
	Card,
	Center,
	Divider,
	Grid,
	Modal,
	NumberInput,
	Select,
	Text,
	Textarea,
	Title,
	UnstyledButton,
} from "@mantine/core";
import {IPlannedSpend} from "../../../../types";
import dayjs from "dayjs";
import TrackerLogic from "../../logic";
import {formatter} from "../../../../context";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {DatePickerInput} from "@mantine/dates";
import TrackerAPI from "../../api";
import {toast} from "react-toastify";
import LongPressButton from "../../../../components/longPressButton";

type TPlannedSpendProps = {
	spend: IPlannedSpend;
	length: number;
	index: number;
};

export default function PlannedSpend(props: TPlannedSpendProps) {
	const backend = new TrackerAPI();
	const logic = new TrackerLogic();
	const spendData = logic.getSpendCategory();

	const [modalShow, setModalShow] = useState(false);

	const [changeLoading, setChangeLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const form = useForm({
		initialValues: {
			cost: props.spend.cost,
			category: props.spend.category,
			description: props.spend.description,
			date: new Date(props.spend.date),
		},
		validate: {
			cost: value => (value >= 0 ? `Сумма должна быть меньше нуля` : null),
			category: value => (value === `` ? `Выберите категорию` : null),
		},
	});

	const onChange = (values: {cost: number; category: string; description?: string; date: Date}) => {
		setChangeLoading(true);
		backend
			.updateSpend(props.spend.id, {...values, createdAt: props.spend.createdAt})
			.then(() => {
				toast.success(`Расход успешно изменен`);
				backend.autoUpdateTracker();
				onClose();
			})
			.catch(() => {
				toast.error(`Произошла ошибка, попробуй еще раз позже`);
			})
			.finally(() => setChangeLoading(false));
	};

	const onMove = async (values: {
		cost: number;
		category: string;
		description?: string;
		date: Date;
	}) => {
		setDeleteLoading(true);
		backend
			.updateSpend(props.spend.id, {...values, date: null, createdAt: new Date().toString()})
			.then(() => {
				toast.success(`Расход успешно оплачен`);
				backend.autoUpdateTracker();
				onClose();
			})
			.catch(() => {
				toast.error(`Произошла ошибка, попробуй еще раз позже`);
			})
			.finally(() => setDeleteLoading(false));
	};

	const calculateSpan = () => {
		if (props.length === 1) {
			return 12;
		}
		if (props.length - 1 === props.index && props.length % 2 !== 0) {
			return 12;
		}
		return 6;
	};

	const onClose = () => {
		setModalShow(false);
		setDeleteLoading(false);
		setChangeLoading(false);
	};

	return (
		<Grid.Col md={calculateSpan()} sm={12}>
			<Modal opened={modalShow} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title order={2} align={`center`}>
							Настройка
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<form style={{width: `100%`}} onSubmit={form.onSubmit(onChange)}>
						<Grid.Col>
							<NumberInput
								label={`Сумма`}
								description={`В рублях`}
								withAsterisk
								formatter={value =>
									!Number.isNaN(parseInt(value)) ? formatter.format(+value) : value
								}
								max={-1}
								{...form.getInputProps(`cost`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<Select
								data={spendData}
								label={`Какая категория`}
								placeholder={`Категория не выбрана`}
								withAsterisk
								{...form.getInputProps(`category`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<DatePickerInput
								label={`Выбери дату`}
								withAsterisk
								valueFormat={`DD.MM.YY`}
								minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
								{...form.getInputProps(`date`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<Textarea
								label={`Описание`}
								placeholder={`Не обязательно`}
								{...form.getInputProps(`description`)}
								maxLength={200}
								minRows={2}
								maxRows={2}
							/>
						</Grid.Col>

						<Grid.Col>
							<Button
								disabled={!form.isDirty()}
								type={`submit`}
								fullWidth
								loading={changeLoading}
							>
								Сохранить
							</Button>
						</Grid.Col>
					</form>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<LongPressButton
							label={`Оплатить`}
							seconds={1}
							color={`orange`}
							variant={`outline`}
							loading={deleteLoading}
							onPressed={() => onMove(form.values)}
							fullWidth
						/>
					</Grid.Col>
				</Grid>
			</Modal>

			<UnstyledButton w={`100%`} onClick={() => setModalShow(true)}>
				<Card withBorder py={`sm`} px={`md`}>
					<Grid>
						<Grid.Col span={4}>
							<Text align={`left`}>{formatter.format(props.spend.cost)}</Text>
						</Grid.Col>

						<Grid.Col span={4}>
							<Center h={`100%`} w={`100%`}>
								<Badge
									color={logic.getBadgeColor(props.spend)}
									radius={`sm`}
									variant={`outline`}
								>
									{logic.formatCategory(props.spend.category)}
								</Badge>
							</Center>
						</Grid.Col>

						<Grid.Col span={4}>
							<Text align={`right`}>{dayjs(props.spend.date).format(`DD.MM.YY`)}</Text>
						</Grid.Col>
					</Grid>
				</Card>
			</UnstyledButton>
		</Grid.Col>
	);
}
