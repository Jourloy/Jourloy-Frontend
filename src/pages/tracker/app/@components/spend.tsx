import {Badge, Button, Card, Center, Divider, Grid, Modal, NumberInput, Select, Text, TextInput, Title, UnstyledButton} from "@mantine/core";
import {TSpend} from "../../../../types";
import dayjs from "dayjs";
import TrackerLogic from "../../logic";
import {formatter} from "../../../../context";
import {useState} from "react";
import {useForm} from "@mantine/form";

type THistorySpendProps = {
	spend: TSpend;
	length: number;
};

export default function HistorySpend(props: THistorySpendProps) {
	const logic = new TrackerLogic();

	const incomeData = logic.getIncomeCategory();
	const spendData = logic.getSpendCategory();

	const [modalShow, setModalShow] = useState(false);

	const onClose = () => {
		setModalShow(false);
	};

	const form = useForm({
		initialValues: {
			cost: props.spend.cost,
			category: props.spend.category,
			description: props.spend.description,
		},
		validate: {
			cost: value => (value <= 0 ? `Сумма должна быть больше нуля` : null),
			category: value => (value === `` ? `Выберите категорию` : null),
		},
	});

	return (
		<Grid.Col md={props.length === 1 ? 12 : 6} sm={12}>
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

					<form style={{width: `100%`}}>
						<Grid.Col>
							<NumberInput
								label={`Сумма`}
								description={`В рублях`}
								withAsterisk
								{...form.getInputProps(`cost`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<Select
								data={props.spend.cost > 0 ? incomeData : spendData}
								label={`Какая категория`}
								placeholder={`Категория не выбрана`}
								withAsterisk
								{...form.getInputProps(`category`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<TextInput
								label={`Описание`}
								placeholder={`Не обязательно`}
								{...form.getInputProps(`description`)}
							/>
						</Grid.Col>

						<Grid.Col>
							<Button disabled={!form.isDirty()} type={`submit`} fullWidth>
								Сохранить
							</Button>
						</Grid.Col>
					</form>
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
									<Center h={`100%`}>
										<Text>{logic.formatCategory(props.spend.category)}</Text>
									</Center>
								</Badge>
							</Center>
						</Grid.Col>

						<Grid.Col span={4}>
							<Text align={`right`}>
								{dayjs(props.spend.createdAt).format(`DD.MM.YY`)}
							</Text>
						</Grid.Col>
					</Grid>
				</Card>
			</UnstyledButton>
		</Grid.Col>
	);
}
