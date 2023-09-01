import {Card, Flex, Grid, Title, Text, Button} from "@mantine/core";

export default function FilmsCreate() {
	return (
		<Flex justify={`center`} py={20} px={20}>
			<Grid maw={`850px`} w={`100%`}>
				<Grid.Col>
					<Title align={`center`} tt={`uppercase`} order={1}>
						Что такое Party калькулятор?
					</Title>
				</Grid.Col>

				<Grid.Col>
					<Card withBorder p={15}>
						<Grid>
							<Grid.Col>
								<Text align={`center`}>
									А как ты тогда разбиваешь стоимость тусовки между всеми участниками? Теперь сделать
									это будет куда проще, ведь с этим калькулятором все заплятят ровно столько, сколько
									использовали
								</Text>
							</Grid.Col>

							<Grid.Col>
								<Button fullWidth>Создать калькулятор</Button>
							</Grid.Col>
						</Grid>
					</Card>
				</Grid.Col>
			</Grid>
		</Flex>
	);
}
