import {Button, Card, Divider, Flex, Grid, Stack, Title} from "@mantine/core";
import AttributeList from "./components/attributeList.components";
import BuyCoffeButton from "../../components/actions/buyCoffeButton";
import ClassList from "./components/classList.component";
import BugButton from "./components/bugButton";
import { useState } from "react";
import { store } from "../../store/store";
import AddClassButton from "./components/addClassButton.component";

export default function DarkIndex() {
	const [logined, setLogined] = useState(store.getState().userReducer.logined);
	const [admin, setAdmin] = useState(store.getState().userReducer.role === `admin`);
	store.subscribe(() => {
		const _logined = store.getState().userReducer.logined;
		const _admin = store.getState().userReducer.role === `admin`;
		if (logined !== _logined) setLogined(_logined);
		if (admin !== _admin) setAdmin(_admin);
	});
	
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

				<div hidden={!admin} style={{width: `100%`}}>
					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Title order={2} align={`center`}>Раздел администратора</Title>
					</Grid.Col>

					<Grid.Col md={6} sm={12}>
						<AddClassButton />
					</Grid.Col>
				</div>

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
