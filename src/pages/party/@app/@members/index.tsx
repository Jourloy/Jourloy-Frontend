import {Grid, Title, Pagination, Center, TextInput} from "@mantine/core";
import {useState} from "react";
import {store} from "../../../../store/store";
import {TMember} from "../../../../types";
import PartyMemberComponent from "./memberComponent";
import {IconSearch} from "@tabler/icons-react";

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

	const [memberSearch, setMemberSearch] = useState(``);

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

	if (memberSearch === ``) {
		for (let i = (memberPage - 1) * 5; i < memberPage * 5; i++) {
			if (calculator.members[i]) members.push(calculator.members[i]);
		}
	} else {
		const filtered = calculator.members.filter(m => m.name.includes(memberSearch));
		for (let i = (memberPage - 1) * 5; i < memberPage * 5; i++) {
			if (filtered[i]) {
				if (memberSearch === ``) members.push(filtered[i]);
				else {
					if (filtered[i].name.includes(memberSearch)) members.push(filtered[i]);
				}
			}
		}
	}

	const membersMap = () => members.map(member => <PartyMemberComponent member={member} />);

	return (
		<>
			<Grid.Col>
				<TextInput
					value={memberSearch}
					onChange={e => setMemberSearch(e.target.value)}
					icon={<IconSearch stroke={1.3} />}
					placeholder={`Имя участника`}
				/>
			</Grid.Col>
			{membersMap()}
			<Grid.Col hidden={memberSearch !== ``}>
				<Center>
					<Pagination 
						total={memberPages} 
						value={memberPage} 
						onChange={setMemberPage} 
						color={`dark`} 
					/>
				</Center>
			</Grid.Col>
		</>
	);
}
