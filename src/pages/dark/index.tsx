import {Button, Card, Divider, Flex, Grid, Stack, Title} from "@mantine/core";
import AttributeList from "./components/attributeList.components";
import BuyCoffeButton from "../../components/actions/buyCoffeButton";
import ClassList from "./components/classList.component";
import BugButton from "./components/bugButton";

export default function DarkIndex() {
	return (
		<Flex justify={`center`} py={20} px={20}>
			<Grid maw={`850px`} w={`100%`}>
				<Grid.Col>
					<Card withBorder>
						<Stack>
							<Title order={2} align={`center`}>
								Поиск по атрибутам
							</Title>

							<AttributeList />
						</Stack>
					</Card>
				</Grid.Col>

				<Grid.Col>
					<Card withBorder>
						<Stack>
							<Title order={2} align={`center`}>
								Классы
							</Title>

							<ClassList />
						</Stack>
					</Card>
				</Grid.Col>

				<Grid.Col>
					<Divider />
				</Grid.Col>

				<Grid.Col md={6} sm={12}>
					<Button fullWidth variant={`outline`}>
						API
					</Button>
				</Grid.Col>

				<Grid.Col md={6} sm={12}>
					<BugButton />
				</Grid.Col>
				<Grid.Col>
					<BuyCoffeButton />
				</Grid.Col>
			</Grid>
		</Flex>
	);
}
