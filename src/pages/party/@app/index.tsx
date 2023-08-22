import {Button, Card, Flex, Grid, Title, Divider} from "@mantine/core";
import {useState} from "react";
import {store} from "../../../store/store";
import PartyMembers from "./@members";
import PartyPositions from "./@positions";
import PartyAddMemberModal from "./@members/addModal";
import {CancelToken} from "axios";
import PartyAddPositionModal from "./@positions/addModal";

type TProps = {
	updateCalculator: (token?: CancelToken) => Promise<boolean>;
};

export default function PartyApp(props: TProps) {
	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		if (calculator !== calc) setCalculator(calc);
	});

	const [addMember, setAddMember] = useState(false);
	const closeAddMember = () => setAddMember(false);

	const [addPosition, setAddPosition] = useState(false);
	const closeAddPosition = () => setAddPosition(false);

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
								<Card withBorder p={5}>
										<Grid>
											<Grid.Col>
												<Title order={3} align={`center`}>
													Участники
												</Title>
											</Grid.Col>
											<PartyMembers />
										</Grid>
								</Card>
							</Grid.Col>

							<Grid.Col span={8}>
								<Button fullWidth variant={`outline`} onClick={() => setAddMember(true)}>
									Добавить
								</Button>
							</Grid.Col>

							<Grid.Col span={4}>
								<Button fullWidth color={`red`}>
									Очистить список
								</Button>
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

								<Grid.Col>
									<Button fullWidth variant={`outline`} onClick={() => setAddPosition(true)}>
										Добавить
									</Button>
								</Grid.Col>

								<PartyPositions />
							</Grid>
						</Card>
					</Grid.Col>
				</Grid>
			</Flex>
		</>
	);
}
