import {Card, Grid, UnstyledButton, Text, Group, ActionIcon, Title, Pagination, Center} from "@mantine/core";
import { IconPencil, IconTrashXFilled } from "@tabler/icons-react";
import { useState } from "react";
import { store } from "../../../../store/store";
import { TMember } from "../../../../types";

const formatter = new Intl.NumberFormat("ru", {
	style: `currency`,
	currency: `RUB`,
	maximumFractionDigits: 0,
});

export default function PartyMembers() {
	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);
	const [memberPages, setMemberPages] = useState(store.getState().partyReducer.memberPages);
	const [memberPage, setMemberPage] = useState(1);
	
	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		const pages = store.getState().partyReducer.memberPages;
		if (calculator !== calc) setCalculator(calc);
		if (memberPages !== pages) setMemberPages(pages);
	});

	if (calculator.members.length === 0) {
		return(
			<Grid.Col>
				<Title align={`center`} tt={`uppercase`} color={`dimmed`} opacity={`20%`}>
					Пока никого нет
				</Title>
			</Grid.Col>
		);
	}

	const getCredit = (memberId: number) => {
		let cost = 0;
		for (const pos of calculator.positions) {
			if (pos.memberIds.length > 0 && pos.memberIds.includes(memberId)) {
				cost += Math.ceil(pos.cost / pos.memberIds.length);
			}
		}
		return cost;
	}

	const members: TMember[] = [];

	for (let i = ((memberPage - 1) * 5); i < memberPage * 5; i ++) {
		if (calculator.members[i]) members.push(calculator.members[i]);
	}

	const membersMap = () => members.map(member => (
		<Grid.Col key={member.id}>
			<UnstyledButton w={`100%`}>
				<Card withBorder w={`100%`} py={5} px={10}>
					<Grid>
						<Grid.Col span={2}>
							<Text mt={`3px`}>{formatter.format(getCredit(member.id))}</Text>
						</Grid.Col>

						<Grid.Col span={8}>
							<Text align={`center`} mt={`3px`} truncate>
								{member.name}
							</Text>
						</Grid.Col>

						<Grid.Col span={2}>
							<Group position={`right`} spacing={0}>
								<ActionIcon color={`dark`} disabled>
									<IconPencil stroke={1.3} />
								</ActionIcon>
								<ActionIcon color={`red`}>
									<IconTrashXFilled stroke={1} />
								</ActionIcon>
							</Group>
						</Grid.Col>
					</Grid>
				</Card>
			</UnstyledButton>
		</Grid.Col>
	));

	return (<>
		{membersMap()}
		<Grid.Col>
			<Center>
				<Pagination total={memberPages} value={memberPage} onChange={setMemberPage} color={`dark`} />
			</Center>
		</Grid.Col>
	</>)
}
