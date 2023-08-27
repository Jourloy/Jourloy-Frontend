import {Button, Card, Flex, Grid, Text, Title} from "@mantine/core";
import PartyAPI from "../api";
import {toast} from "react-toastify";
import {partyActions} from "../../../store/features/party.slice";
import {store} from "../../../store/store";

export default function PartyCreate() {
	const backend = new PartyAPI();

	const createCalculator = () => {
		backend
			.createCalculator()
			.then(() => {
				toast.success(`Калькулятор создан`);
			})
			.catch(() => {
				toast.error(`Что-то пошло не так, попробуй позже`);
			})
			.finally(() => {
				store.dispatch(partyActions.updateCalculator());
			});
	};

	return (
		<>
			<Flex justify={`center`} py={20} px={20}>
				<Grid maw={`850px`} w={`100%`}>
					<Grid.Col>
						<Card withBorder p={15}>
							<Grid>
								<Grid.Col>
									<Title align={`center`} tt={`uppercase`} order={1}>
										У тебя еще нет Party калькулятора?
									</Title>
								</Grid.Col>

								<Grid.Col>
									<Text align={`center`}>
										А как ты тогда разбиваешь стоимость тусовки между всеми участниками? Теперь
										сделать это будет куда проще, ведь с этим калькулятором все заплятят ровно
										столько, сколько использовали
									</Text>
								</Grid.Col>

								<Grid.Col>
									<Button fullWidth onClick={createCalculator}>
										Создать калькулятор
									</Button>
								</Grid.Col>
							</Grid>
						</Card>
					</Grid.Col>
				</Grid>
			</Flex>
		</>
	);
}
