import {useEffect, useState} from "react";
import {store} from "../../../store/store";
import TrackerAPI from "../api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import DefaultLoading from "../../../components/loading";
import {Flex, Grid, Button, Card, Title, Divider, Progress, Space, Text} from "@mantine/core";
import {IconArrowsSort, IconAdjustments} from "@tabler/icons-react";
import {formatter} from "../../../context";
import TrackerLogic from "../logic";
import IncomeModal from "./@modals/income";
import SettingsModal from "./@modals/settings";
import SpendModal from "./@modals/spend";
import HistorySpend from "./@components/spend";

export default function TrackerApp() {
	const backend = new TrackerAPI();
	const logic = new TrackerLogic();
	const navigate = useNavigate();

	const [tracker, setTracker] = useState(store.getState().trackerReducer.tracker);
	store.subscribe(() => {
		const _tracker = store.getState().trackerReducer.tracker;
		if (tracker !== _tracker) setTracker(_tracker);
	});

	if (!tracker) navigate(`/tracker`);

	const [loading, setLoading] = useState(!tracker);

	const [settingsModal, setSettingsModal] = useState(false);
	const [incomeModal, setIncomeModal] = useState(false);
	const [spendModal, setSpendModal] = useState(false);
	// const [creditModal, setCreditModal] = useState(true);
	const [historyModal, setHistoryModal] = useState(false);

	const closeSettingsModal = () => setSettingsModal(false);
	const closeIncomeModal = () => setIncomeModal(false);
	const closeSpendModal = () => setSpendModal(false);
	// const closeCreditModal = () => setCreditModal(false);
	const closeHistoryModal = () => setHistoryModal(false);

	const spends = tracker.spends.filter(s => s.date == null);
	const plannedSpends = tracker.spends.filter(s => s.date != null);

	const getSpendsComponents = () =>
		spends.map(s => (
			<HistorySpend
				spend={s}
				opened={historyModal}
				onClose={closeHistoryModal}
				onOpen={() => setHistoryModal(true)}
			/>
		));

	useEffect(() => {
		if (!loading) return;

		const source = backend.getSource();
		backend
			.autoUpdateTracker(source.token)
			.then(() => {
				setLoading(false);
			})
			.catch(s => {
				if (s === 403) navigate(`/login`);
				if (s === 404) navigate(`/tracker/create`);
				else {
					toast.error(`Что-то пошло не так`);
					navigate(`/tracker`);
				}
			});

		return () => source.cancel();
	}, []);

	if (loading) return <DefaultLoading />;

	return (
		<>
			<SettingsModal opened={settingsModal} onClose={closeSettingsModal} />
			<IncomeModal opened={incomeModal} onClose={closeIncomeModal} />
			<SpendModal opened={spendModal} onClose={closeSpendModal} />

			<Flex justify={`center`} py={20} px={20}>
				<Grid columns={6} maw={`850px`} w={`100%`}>
					<Grid.Col span={6}>
						<Button disabled fullWidth>
							Это твой трекер
						</Button>
					</Grid.Col>

					<Grid.Col span={6}>
						<Card p={15} withBorder>
							<Grid columns={1} gutter={3}>
								<Grid.Col>
									<Flex align={`center`} justify={`space-between`}>
										<Title order={2}>{logic.getCalcMode()} бюджет</Title>
										<Title order={2}>{formatter.format(tracker.dayLimit)}</Title>
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
										<Text c={`dimmed`}>Осталось дней: {logic.getDays()}</Text>
										<Text c={`dimmed`}>
											Бюджет: {formatter.format(tracker.limit)}
										</Text>
									</Flex>
								</Grid.Col>

								<Grid.Col>
									<Space h={`10px`} />
									<Button
										fullWidth
										variant={`outline`}
										onClick={() => setSettingsModal(true)}
									>
										Настроить
									</Button>
								</Grid.Col>
							</Grid>
						</Card>
					</Grid.Col>

					<Grid.Col span={2}>
						<Button fullWidth onClick={() => setIncomeModal(true)}>
							Доход
						</Button>
					</Grid.Col>

					<Grid.Col span={2}>
						<Button fullWidth onClick={() => setSpendModal(true)}>
							Расход
						</Button>
					</Grid.Col>

					<Grid.Col span={2}>
						<Button fullWidth disabled>
							Долг
						</Button>
					</Grid.Col>

					<Grid.Col md={4} sm={6}>
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
											+{formatter.format(24914)}
										</Title>
									</Card>
								</Grid.Col>

								<Grid.Col span={1}>
									<Card withBorder>
										<Title order={3} align={`center`} color={`red`}>
											-{formatter.format(12323)}
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

					<Grid.Col md={2} sm={6} xs={6}>
						<Card withBorder h={`100%`}>
							<Flex align={`center`} justify={`center`} h={`100%`} w={`100%`}>
								<Title
									tt={`uppercase`}
									align={`center`}
									color={`dimmed`}
									size={`30px`}
									opacity={`20%`}
								>
									Мы работаем над этим
								</Title>
							</Flex>
						</Card>
					</Grid.Col>

					<Grid.Col span={6}>
						<Divider
							label={
								<Text size={`lg`} tt={`uppercase`}>
									Запланированные расходы
								</Text>
							}
							labelPosition={`center`}
							my={`10px`}
						/>
						<Card p={0}>
							<Grid columns={4}>
								<Grid.Col span={2} hidden>
									<Button fullWidth variant={`outline`}>
										<IconArrowsSort stroke={1.3} color={`black`} />
									</Button>
								</Grid.Col>

								<Grid.Col span={2} hidden>
									<Button fullWidth variant={`outline`}>
										<IconAdjustments stroke={1.3} color={`black`} />
									</Button>
								</Grid.Col>

								<Grid.Col mt={`10px`}>
									<Title
										align={`center`}
										c={`dimmed`}
										tt={`uppercase`}
										opacity={`20%`}
									>
										Нет запланированных расходов
									</Title>
								</Grid.Col>
							</Grid>
						</Card>
					</Grid.Col>

					<Grid.Col span={6}>
						<Divider
							label={
								<Text size={`lg`} tt={`uppercase`}>
									История
								</Text>
							}
							labelPosition={`center`}
							my={`10px`}
						/>
						<Card p={0}>
							<Grid columns={4}>
								<Grid.Col span={2} hidden>
									<Button fullWidth variant={`outline`}>
										<IconArrowsSort stroke={1.3} color={`black`} />
									</Button>
								</Grid.Col>

								<Grid.Col span={2} hidden>
									<Button fullWidth variant={`outline`}>
										<IconAdjustments stroke={1.3} color={`black`} />
									</Button>
								</Grid.Col>

								<Grid.Col hidden={tracker.spends !== null && tracker.spends.length > 0}>
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
							</Grid>
						</Card>
					</Grid.Col>
				</Grid>
			</Flex>
		</>
	);
}
