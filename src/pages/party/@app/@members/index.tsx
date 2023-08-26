import {Grid, Title, Pagination, Center} from "@mantine/core";
import {useState} from "react";
import {store} from "../../../../store/store";
import {TMember} from "../../../../types";
import PartyMemberComponent from "./memberComponent";

export default function PartyMembers() {
	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);
	const [memberPages, setMemberPages] = useState(store.getState().partyReducer.memberPages);
	const [memberPage, setMemberPage] = useState(1);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		const pages = store.getState().partyReducer.memberPages;
		setCalculator(calc);
		setMemberPages(pages);
	});

	if (calculator.members.length === 0) {
		return (
			<Grid.Col>
				<Title align={`center`} tt={`uppercase`} color={`dimmed`} opacity={`20%`}>
					Пока никого нет
				</Title>
			</Grid.Col>
		);
	}

	const members: TMember[] = [];

	for (let i = (memberPage - 1) * 5; i < memberPage * 5; i++) {
		if (calculator.members[i]) members.push(calculator.members[i]);
	}

	const membersMap = () => members.map(member => <PartyMemberComponent member={member} />);

	return (
		<>
			{membersMap()}
			<Grid.Col>
				<Center>
					<Pagination total={memberPages} value={memberPage} onChange={setMemberPage} color={`dark`} />
				</Center>
			</Grid.Col>
		</>
	);
}
