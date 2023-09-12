import {useState} from "react";
import {store} from "../../../store/store";
import {
	Flex,
	Grid,
	Button,
	Card,
	Title,
	Divider,
	Progress,
	Text,
	Center,
	Pagination,
	TextInput,
} from "@mantine/core";
import {formatter} from "../../../context";
import TrackerLogic from "../logic";
import IncomeModal from "./@modals/income";
import SettingsModal from "./@modals/settings";
import SpendModal from "./@modals/spend";
import HistorySpend from "./@components/spend";
import PlannedSpend from "./@components/plannedSpend";
import {IPlannedSpend, TSpend} from "../../../types";
import {IconSearch} from "@tabler/icons-react";

export default function TrackerAppLoaded() {
	const logic = new TrackerLogic();

	const [tracker, setTracker] = useState(store.getState().trackerReducer.tracker);
	store.subscribe(() => {
		const _tracker = store.getState().trackerReducer.tracker;
		if (tracker !== _tracker) setTracker(_tracker);
	});

	const [plannedPage, setPlannedPage] = useState(1);
	const [plannedSearch, setPlannedSearch] = useState(``);
	const [plannedCategory, setPLannedCategory] = useState(``);

	const [spendPage, setSpendPage] = useState(1);
	const [spendSearch, setSpendSearch] = useState(``);
	const [spendCategory, setSpendCategory] = useState(``);

	const plannedSpendsArray = tracker.spends.filter(s => s.date != null);
	const plannedSpends: TSpend[] = [];
	if (plannedSearch === ``) {
		for (let i = (plannedPage - 1) * 6; i < plannedPage * 6; i++) {
			if (plannedSpendsArray[i]) plannedSpends.push(plannedSpendsArray[i]);
		}
	} else {
		const filtered = plannedSpendsArray.filter(m => {
			if (m.description && plannedSearch)
				return m.description.toLowerCase().includes(plannedSearch.toLowerCase());
			if (m.category && plannedCategory !== ``)
				return m.category.toLowerCase() === plannedCategory.toLowerCase();
			return false;
		});
		for (let i = (plannedPage - 1) * 6; i < plannedPage * 6; i++) {
			if (filtered[i]) plannedSpends.push(plannedSpendsArray[i]);
		}
	}

	const spendsArray = tracker.spends.filter(s => s.date == null).sort(() => -1);
	const spends: TSpend[] = [];
	if (spendSearch === ``) {
		for (let i = (spendPage - 1) * 6; i < spendPage * 6; i++) {
			if (spendsArray[i]) spends.push(spendsArray[i]);
		}
	} else {
		const filtered = spendsArray.filter(m => {
			if (m.description && spendSearch)
				return m.description.toLowerCase().includes(spendSearch.toLowerCase());
			if (m.category && spendCategory !== ``)
				return m.category.toLowerCase() === spendCategory.toLowerCase();
			return false;
		});
		for (let i = (spendPage - 1) * 6; i < spendPage * 6; i++) {
			if (filtered[i]) spends.push(spendsArray[i]);
		}
	}

	const [plannedPages] = useState(Math.ceil(plannedSpends.length / 6));
	const [spendPages] = useState(Math.ceil(spends.length / 6));

	const getSpendsComponents = () => {
		return spends.map(s => <HistorySpend key={s.id} length={spends.length} spend={s} />);
	};

	const getPlannedSpendsComponents = () => {
		return plannedSpends.map(s => (
			<PlannedSpend key={s.id} length={plannedSpends.length} spend={s as IPlannedSpend} />
		));
	};

	return (
		<>
			<Flex justify={`center`} py={20} px={20}>
				<Grid maw={`850px`} w={`100%`}>
					<Grid.Col>
						<Button disabled fullWidth>
							Это твой трекер
						</Button>
					</Grid.Col>

					<Grid.Col>
						<Card p={15} withBorder>
							<Grid columns={1} gutter={3}>
								<Grid.Col>
									<Flex align={`center`} justify={`space-between`}>
										<Title order={2}>{logic.getCalcMode()} бюджет</Title>
										<Title order={2}>
											{formatter.format(logic.getTodayLimit())}
										</Title>
									</Flex>
								</Grid.Col>

								<Grid.Col>
									<Divider my={`10px`} />
								</Grid.Col>

								<Grid.Col>
									<Progress
										h={`15px`}
										value={logic.getProgress()}
										color={logic.getProgressColor()}
									/>
								</Grid.Col>

								<Grid.Col>
									<Flex align={`center`} justify={`space-between`}>
										<Text c={`dimmed`}>Осталось дней: {logic.getDaysCount()}</Text>
										<Text c={`dimmed`}>
											Бюджет: {formatter.format(logic.getTodayBudget())}
										</Text>
									</Flex>
								</Grid.Col>

								<SettingsModal />
							</Grid>
						</Card>
					</Grid.Col>

					<Grid.Col span={4}>
						<IncomeModal />
					</Grid.Col>

					<Grid.Col span={4}>
						<SpendModal />
					</Grid.Col>

					<Grid.Col span={4}>
						<Button fullWidth disabled>
							Не готово
						</Button>
					</Grid.Col>

					<Grid.Col md={8} sm={12}>
						<Card withBorder>
							<Grid columns={2}>
								<Grid.Col span={2}>
									<Title order={3} align={`center`}>
										Статистика за месяц
									</Title>
								</Grid.Col>

								<Grid.Col span={1}>
									<Card withBorder>
										<Title order={3} align={`center`} color={`green`}>
											+{formatter.format(logic.getMonthIncome())}
										</Title>
									</Card>
								</Grid.Col>

								<Grid.Col span={1}>
									<Card withBorder>
										<Title order={3} align={`center`} color={`red`}>
											{formatter.format(logic.getMonthSpend())}
										</Title>
									</Card>
								</Grid.Col>

								<Grid.Col span={2}>
									<Button fullWidth variant={`outline`} disabled>
										Тут скоро будет что-то интересное
									</Button>
								</Grid.Col>
							</Grid>
						</Card>
					</Grid.Col>

					<Grid.Col md={4} sm={12}>
						<Card withBorder h={`100%`}>
							<Flex align={`center`} justify={`center`} h={`100%`} w={`100%`}>
								<Title
									tt={`uppercase`}
									align={`center`}
									color={`dimmed`}
									size={`30px`}
									opacity={`20%`}
								>
									Еще не готово
								</Title>
							</Flex>
						</Card>
					</Grid.Col>

					<Grid.Col>
						<Divider
							label={
								<Text size={`lg`} tt={`uppercase`}>
									Запланированные расходы
								</Text>
							}
							labelPosition={`center`}
							my={`10px`}
						/>
						<Card p={0} bg={`transparent`}>
							<Grid>
								<Grid.Col hidden={plannedSpends.length === 0 && plannedSearch === ``}>
									<TextInput
										icon={<IconSearch stroke={1.3} />}
										placeholder={`Описание`}
										value={plannedSearch}
										onChange={e => setPlannedSearch(e.target.value)}
									/>
								</Grid.Col>

								<Grid.Col hidden={plannedSpends.length > 0}>
									<Title
										align={`center`}
										c={`dimmed`}
										tt={`uppercase`}
										opacity={`20%`}
									>
										Нет запланированных расходов
									</Title>
								</Grid.Col>

								{getPlannedSpendsComponents()}

								<Grid.Col hidden={plannedSearch !== ``}>
									<Center>
										<Pagination
											total={plannedPages}
											value={plannedPage}
											onChange={setPlannedPage}
										/>
									</Center>
								</Grid.Col>
							</Grid>
						</Card>
					</Grid.Col>

					<Grid.Col>
						<Divider
							label={
								<Text size={`lg`} tt={`uppercase`}>
									История
								</Text>
							}
							labelPosition={`center`}
							my={`10px`}
						/>
						<Card p={0} bg={`transparent`}>
							<Grid>
								<Grid.Col hidden={spends.length === 0 && spendSearch === ``}>
									<TextInput
										icon={<IconSearch stroke={1.3} />}
										placeholder={`Описание`}
										value={spendSearch}
										onChange={e => setSpendSearch(e.target.value)}
									/>
								</Grid.Col>

								<Grid.Col hidden={spends.length > 0}>
									<Title
										align={`center`}
										c={`dimmed`}
										tt={`uppercase`}
										opacity={`20%`}
									>
										Нет ни трат, ни доходов
									</Title>
								</Grid.Col>

								{getSpendsComponents()}

								<Grid.Col hidden={spendSearch !== ``}>
									<Center>
										<Pagination
											total={spendPages}
											value={spendPage}
											onChange={setSpendPage}
										/>
									</Center>
								</Grid.Col>
							</Grid>
						</Card>
					</Grid.Col>
				</Grid>
			</Flex>
		</>
	);
}