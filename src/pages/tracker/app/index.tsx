import {useEffect, useState} from "react";
import {store} from "../../../store/store";
import {Flex, Grid, Button, Card, Title, Divider, Progress, Text} from "@mantine/core";
import {formatter} from "../../../context";
import TrackerLogic from "../logic";
import IncomeModal from "./@modals/income";
import SettingsModal from "./@modals/settings";
import SpendModal from "./@modals/spend";
import SpendList from "./@components/spendList.component";
import PlannedList from "./@components/plannedList.component";
import TrackerAPI from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultLoading from "../../../components/loading";

export default function TrackerApp() {
	const backend = new TrackerAPI();
	const logic = new TrackerLogic();
	const navigate = useNavigate();

	const [tracker, setTracker] = useState(store.getState().trackerReducer.tracker);
	store.subscribe(() => {
		const _tracker = store.getState().trackerReducer.tracker;
		if (tracker !== _tracker) setTracker(_tracker);
	});

	const [loading, setLoading] = useState(true);

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
	});

	if (loading) return <DefaultLoading />;

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

						<PlannedList />
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

						<SpendList />
					</Grid.Col>
				</Grid>
			</Flex>
		</>
	);
}
