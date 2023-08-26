import {Button, Card, Flex, Grid, Title, Divider, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import {store} from "../../../store/store";
import PartyMembers from "./@members";
import PartyPositions from "./@positions";
import PartyAddMemberModal from "./@members/addModal";
import {CancelToken} from "axios";
import PartyAddPositionModal from "./@positions/addModal";
import PartyAPI from "../api";
import {toast} from "react-toastify";
import {partyActions} from "../../../store/features/party.slice";

type TProps = {
	updateCalculator: (token?: CancelToken) => Promise<boolean>;
};

export default function PartyApp(props: TProps) {
	const backend = new PartyAPI();

	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		setCalculator(calc);
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
		backend.removePositions(calculator.id)
			.then(() => {
				toast.success(`Список позиций очищен`);
			})
			.catch(() => {
				toast.error(`Что-то пошло не так`);
			})
			.finally(() => {
				store.dispatch(partyActions.updateCalculator());
				setRemoveAllPositionsLoading(false);
			})
	}

	useEffect(() => {
		if (calculator.members.length <= 1) setClearMembersDisable(true);
		else setClearMembersDisable(false);
		setClearMembersLoading(false);
	}, [calculator.members]);

	useEffect(() => {
		if (calculator.positions.length <= 1) setRemoveAllPositionsDisable(true);
		else setRemoveAllPositionsDisable(false);
		setRemoveAllPositionsLoading(false);
	}, [calculator.positions]);

	return (
		<>
			<PartyAddMemberModal
				opened={addMember}
				onClose={closeAddMember}
				updateCalculator={props.updateCalculator}
			/>

			<PartyAddPositionModal
				opened={addPosition}
				onClose={closeAddPosition}
				updateCalculator={props.updateCalculator}
			/>

			<Flex justify={`center`} py={20} px={20}>
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
										
										<PartyMembers />

										<Grid.Col span={8}>
											<Button fullWidth variant={`outline`} onClick={() => setAddMember(true)}>
												Добавить
											</Button>
										</Grid.Col>

										<Grid.Col span={4}>
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
									</Grid>
								</Card>
							</Grid.Col>
						</Grid>
					</Grid.Col>

					<Grid.Col>
						<Card withBorder>
							<Grid gutter={10}>
								<Grid.Col>
									<Title order={2} align={`center`}>
										Позиции
									</Title>
								</Grid.Col>

								<Grid.Col>
									<Divider />
								</Grid.Col>

								<Grid.Col span={8}>
									<Button fullWidth variant={`outline`} onClick={() => setAddPosition(true)}>
										Добавить
									</Button>
								</Grid.Col>

								<Grid.Col span={4}>
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

								<PartyPositions />
							</Grid>
						</Card>
					</Grid.Col>

					<Grid.Col hidden>
						<Divider />
					</Grid.Col>

					<Grid.Col hidden>
						<Card withBorder>
							<Grid>
								<Grid.Col>
									<Title align={`center`} tt={`uppercase`}>Заметка</Title>
								</Grid.Col>

								<Grid.Col>
									<Text align={`center`}>
										Party Калькулятор находится еще в процессе реализации. Текущее состояние можно
										назвать бета версией. Поэтому если что-то идет не поплану, не отображается или
										не нажимается, то будет круто, если ты нажмешь на кнопку ниже и вкратце опишешь
										ситуацию
									</Text>
								</Grid.Col>

								<Grid.Col>
									<Button fullWidth>У меня не работает!</Button>
								</Grid.Col>
							</Grid>
						</Card>
					</Grid.Col>
				</Grid>
			</Flex>
		</>
	);
}
