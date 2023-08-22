import {
	Card,
	Grid,
	UnstyledButton,
	Text,
	Group,
	Title,
	Avatar,
	Modal,
	Divider,
	NumberInput,
	TextInput,
	MultiSelect,
	Button,
	Center,
	Pagination,
} from "@mantine/core";
import {store} from "../../../../store/store";
import {useState} from "react";
import {TMember, TPosition} from "../../../../types";

const formatter = new Intl.NumberFormat("ru", {
	style: `currency`,
	currency: `RUB`,
	maximumFractionDigits: 0,
});

export default function PartyPositions() {
	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);
	const [positionPages, setPositionPages] = useState(store.getState().partyReducer.positionPages);
	const [positionPage, setPositionPage] = useState(1);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		const pages = store.getState().partyReducer.positionPages;
		if (calculator !== calc) setCalculator(calc);
		if (positionPages !== pages) setPositionPages(pages);
	});

	const [currentPosition, setCurrentPosition] = useState<TPosition | null>(null);
	const [positionModal, setPositionModal] = useState(false);

	const openPosition = (pos: TPosition) => {
		setCurrentPosition(pos);
		setPositionModal(true);
	};

	const closePosition = () => {
		setCurrentPosition(null);
		setPositionModal(false);
	};

	if (calculator.positions.length === 0) {
		return (
			<Grid.Col>
				<Title align={`center`} tt={`uppercase`} color={`dimmed`} opacity={`20%`}>
					Скучная Party, ведь ничего нет
				</Title>
			</Grid.Col>
		);
	}

	const getInitials = (name: string) => {
		const split = name.split(` `);
		if (split.length === 1) return split[0][0].toUpperCase();
		return `${split[0][0].toUpperCase()}${split[1][0].toUpperCase()}`;
	};

	const getMembersAvatars = (memberIds: number[]) => {
		const filtered = calculator.members.filter(m => memberIds.includes(m.id));
		const members: TMember[] = [];
		for (let i = 0; i !== 4; i++) {
			if (filtered[i]) members.push(filtered[i]);
		}

		return members.map(m => <Avatar key={m.id}>{getInitials(m.name)}</Avatar>);
	};

	const getMemberOver = (memberIds: number[]) => {
		const filtered = calculator.members.filter(m => memberIds.includes(m.id));
		const members: TMember[] = [];
		for (let i = 0; i !== 4; i++) {
			if (filtered[i]) members.push(filtered[i]);
		}

		const amount = filtered.length - members.length;
		if (amount > 0) return <Avatar>+{amount}</Avatar>;
		return <></>;
	};

	const getData = () => {
		const data = [];
		for (const member of calculator.members) {
			data.push({value: member.id.toString(), label: member.name, image: member.avatar});
		}
		return data;
	};

	const getMembersAsString = () => {
		const arr: string[] = [];
		for (const member of calculator.members) {
			arr.push(member.id.toString());
		}
		return arr;
	};

	const positions: TPosition[] = [];

	for (let i = (positionPage - 1) * 5; i < positionPage * 5; i++) {
		if (calculator.positions[i]) positions.push(calculator.positions[i]);
	}

	const getMap = () =>
		positions.map(position => (
			<Grid.Col key={position.id}>
				<UnstyledButton w={`100%`} mah={`50px`} h={`100%`} onClick={() => openPosition(position)}>
					<Card withBorder px={10} py={5} h={`50px`}>
						<Grid>
							<Grid.Col span={4}>
								<Text mt={8}>{position.name}</Text>
							</Grid.Col>

							<Grid.Col span={4}>
								<Text align={`center`} mt={8}>
									{formatter.format(position.cost)}
								</Text>
							</Grid.Col>

							<Grid.Col span={4}>
								<Group position={`right`}>
									<Avatar.Group>
										{getMembersAvatars(position.memberIds)}
										{getMemberOver(position.memberIds)}
									</Avatar.Group>
								</Group>
							</Grid.Col>
						</Grid>
					</Card>
				</UnstyledButton>
			</Grid.Col>
		));

	return (
		<>
			<Modal opened={positionModal} onClose={closePosition} centered>
				<Grid>
					<Grid.Col>
						<Title align={`center`} order={3} tt={`uppercase`}>
							Позиция
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col span={6}>
						<NumberInput label={`Стоимость`} defaultValue={currentPosition?.cost} />
					</Grid.Col>

					<Grid.Col span={6}>
						<TextInput label={`Название`} defaultValue={currentPosition?.name} />
					</Grid.Col>

					<Grid.Col>
						<MultiSelect label={`Прикреплены`} data={getData()} defaultValue={getMembersAsString()} />
					</Grid.Col>

					<Grid.Col mt={`15px`}>
						<Button fullWidth>Изменить</Button>
					</Grid.Col>
				</Grid>
			</Modal>
			{getMap()}
			<Grid.Col>
				<Center>
					<Pagination total={positionPages} value={positionPage} onChange={setPositionPage} color={`dark`} />
				</Center>
			</Grid.Col>
		</>
	);
}
