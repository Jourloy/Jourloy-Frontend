import {Button, Card, Grid, Title, Divider, Container, Center} from "@mantine/core";
import {useEffect, useState} from "react";
import {store} from "../../../store/store";
import PartyMembers from "./@members";
import PartyPositions from "./@positions";
import PartyAddMemberModal from "./@members/addModal";
import PartyAddPositionModal from "./@positions/modals/add.modal";
import PartyAPI from "../api";
import {toast} from "react-toastify";
import {partyActions} from "../../../store/features/party.slice";
import {useNavigate} from "react-router-dom";
import LoginAPI from "../../login/api";
import {userActions} from "../../../store/features/user.slice";

export default function PartyApp() {
	const backend = new PartyAPI();
	const loginBackend = new LoginAPI();
	const navigate = useNavigate();

	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);
	const [logined, setLogined] = useState(store.getState().userReducer.logined);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		const login = store.getState().userReducer.logined;
		if (calc !== calculator) setCalculator(calc);
		if (login !== logined) setLogined(login);
	});

	const [addMember, setAddMember] = useState(false);
	const closeAddMember = () => setAddMember(false);

	const [addPosition, setAddPosition] = useState(false);
	const closeAddPosition = () => setAddPosition(false);

	const [clearMembersDisable, setClearMembersDisable] = useState(true);
	const [clearMembersLoading, setClearMembersLoading] = useState(true);

	const [removeAllPositionsLoading, setRemoveAllPositionsLoading] = useState(false);
	const [removeAllPositionsDisable, setRemoveAllPositionsDisable] = useState(true);

	const removeAllMembers = () => {
		setClearMembersLoading(true);
		backend
			.removeMembers(calculator.id)
			.then(() => {
				toast.success(`Все участники удалены `);
			})
			.catch(() => {
				toast.error(`Что-то пошло не так`);
			})
			.finally(() => {
				store.dispatch(partyActions.updateCalculator());
			});
	};

	const removeAllPositions = () => {
		setRemoveAllPositionsLoading(true);
		backend
			.removePositions(calculator.id)
			.then(() => {
				toast.success(`Список позиций очищен`);
			})
			.catch(() => {
				toast.error(`Что-то пошло не так`);
			})
			.finally(() => {
				store.dispatch(partyActions.updateCalculator());
				setRemoveAllPositionsLoading(false);
			});
	};

	useEffect(() => {
		if (!calculator) return;

		if (calculator.members.length <= 0) setClearMembersDisable(true);
		else setClearMembersDisable(false);
		setClearMembersLoading(false);
	}, [calculator]);

	useEffect(() => {
		if (!calculator) return;

		if (calculator.positions.length <= 0) setRemoveAllPositionsDisable(true);
		else setRemoveAllPositionsDisable(false);
		setRemoveAllPositionsLoading(false);
	}, [calculator]);

	useEffect(() => {
		const source = loginBackend.getToken();

		if (!logined) {
			loginBackend
				.checkUser(source.token)
				.then(d => {
					if (d.data.user.username) store.dispatch(userActions.changeUsername(d.data.user.username));
					if (d.data.user.avatar) store.dispatch(userActions.changeAvatar(d.data.user.avatar));
					if (d.data.user) store.dispatch(userActions.login());
				})
				.catch(() => {
					navigate(`/login`);
				});
		}
		if (!calculator) {
			backend
				.getCalculator(source.token)
				.then(d => {
					if (d && d.data && d.data.id) {
						store.dispatch(partyActions.forceUpdateCalculator(d.data));

						const memberPages = Math.ceil(d.data.members.length / 5);
						store.dispatch(partyActions.updateMemberPages(memberPages));

						const positionPages = Math.ceil(d.data.positions.length / 10);
						store.dispatch(partyActions.updatePositionPages(positionPages));
					}
				})
				.catch(() => {
					toast.error(`Не нашли калькулятор`);
					navigate(`/party`);
				});
		}
		return () => source.cancel();
	}, []);

	if (!logined || !calculator) return <></>;

	return (
		<>
			<PartyAddMemberModal opened={addMember} onClose={closeAddMember} />

			<PartyAddPositionModal opened={addPosition} onClose={closeAddPosition} />

			<Container py={20} px={20}>
				<Center w={`100%`}>
					<Grid maw={`850px`} w={`100%`}>
						<Grid.Col>
							<Button disabled fullWidth>
								Калькулятор 1
							</Button>
						</Grid.Col>

						<Grid.Col span={6}>
							<Card withBorder>
								<Grid gutter={1}>
									<Grid.Col>
										<Title order={3} align={`center`}>
											Участников
										</Title>
									</Grid.Col>

									<Grid.Col>
										<Title align={`center`}>{calculator.members.length}</Title>
									</Grid.Col>
								</Grid>
							</Card>
						</Grid.Col>

						<Grid.Col span={6}>
							<Card withBorder>
								<Grid gutter={1}>
									<Grid.Col>
										<Title order={3} align={`center`}>
											Позиций
										</Title>
									</Grid.Col>

									<Grid.Col>
										<Title align={`center`}>{calculator.positions.length}</Title>
									</Grid.Col>
								</Grid>
							</Card>
						</Grid.Col>

						<Grid.Col>
							<Button variant={`outline`} fullWidth disabled>
								Настроить
							</Button>
						</Grid.Col>

						<Grid.Col>
							<Grid>
								<Grid.Col>
									<Card withBorder>
										<Grid>
											<Grid.Col>
												<Title order={3} align={`center`}>
													Участники
												</Title>
											</Grid.Col>

											<Grid.Col sm={8} xs={12}>
												<Button
													fullWidth
													variant={`outline`}
													onClick={() => setAddMember(true)}
												>
													Добавить
												</Button>
											</Grid.Col>

											<Grid.Col sm={4} xs={12}>
												<Button
													fullWidth
													color={`red`}
													variant={`outline`}
													disabled={clearMembersDisable}
													loading={clearMembersLoading}
													onClick={removeAllMembers}
												>
													Очистить список
												</Button>
											</Grid.Col>

											<Grid.Col>
												<Divider />
											</Grid.Col>

											<PartyMembers />
										</Grid>
									</Card>
								</Grid.Col>
							</Grid>
						</Grid.Col>

						<Grid.Col>
							<Card withBorder>
								<Grid>
									<Grid.Col>
										<Title order={3} align={`center`}>
											Позиции
										</Title>
									</Grid.Col>

									<Grid.Col sm={8} xs={12}>
										<Button fullWidth variant={`outline`} onClick={() => setAddPosition(true)}>
											Добавить
										</Button>
									</Grid.Col>

									<Grid.Col sm={4} xs={12}>
										<Button
											fullWidth
											variant={`outline`}
											color={`red`}
											disabled={removeAllPositionsDisable}
											loading={removeAllPositionsLoading}
											onClick={removeAllPositions}
										>
											Очистить список
										</Button>
									</Grid.Col>

									<Grid.Col>
										<Divider />
									</Grid.Col>

									<PartyPositions />
								</Grid>
							</Card>
						</Grid.Col>
					</Grid>
				</Center>
			</Container>
		</>
	);
}
