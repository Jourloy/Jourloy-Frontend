import {Card, Grid, UnstyledButton, Text, Group, ActionIcon} from "@mantine/core";
import {TMember} from "../../../../types";
import {IconTrashXFilled} from "@tabler/icons-react";
import {formatter} from "../../../../context";
import {store} from "../../../../store/store";
import {useState} from "react";
import PartyAPI from "../../api";
import {toast} from "react-toastify";
import {partyActions} from "../../../../store/features/party.slice";

type TProps = {
	member: TMember;
};

export default function PartyMemberComponent(props: TProps) {
	const member = props.member;
	const backend = new PartyAPI();

	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		setCalculator(calc);
	});

	// const [changeLoading, setChangeLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	// TODO: Move to logic file
	const getCredit = (memberId: number) => {
		let cost = 0;
		for (const pos of calculator.positions) {
			if (pos.memberIds.length > 0 && pos.memberIds.includes(memberId)) {
				cost += Math.ceil(pos.cost / pos.memberIds.length);
			}
		}
		return cost;
	};

	const onRemove = () => {
		setDeleteLoading(true);
		backend
			.removeMember(member.id)
			.then(() => {
				toast.success(`Участник удален`);
			})
			.catch(() => {
				toast.error(`Что-то пошло не так`);
			})
			.finally(() => {
				store.dispatch(partyActions.updateCalculator());
				setDeleteLoading(false);
			});
	};

	return (
		<Grid.Col key={member.id}>
			<UnstyledButton w={`100%`}>
				<Card withBorder w={`100%`} py={5} px={10}>
					<Grid w={`100%`} m={0}>
						<Grid.Col span={2}>
							<Text align={`left`} mt={`3px`}>
								{formatter.format(getCredit(member.id))}
							</Text>
						</Grid.Col>

						<Grid.Col span={8}>
							<Text align={`center`} mt={`3px`} truncate>
								{member.name}
							</Text>
						</Grid.Col>

						<Grid.Col span={2}>
							<Group position={`right`} w={`100%`}>
								<ActionIcon color={`red`} onClick={onRemove} loading={deleteLoading}>
									<IconTrashXFilled stroke={1} />
								</ActionIcon>
							</Group>
						</Grid.Col>
					</Grid>
				</Card>
			</UnstyledButton>
		</Grid.Col>
	);
}
