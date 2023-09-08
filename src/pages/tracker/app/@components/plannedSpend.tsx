import {Card, Grid, Modal, Text} from "@mantine/core";
import {TSpend} from "../../../../types";
import dayjs from "dayjs";
import TrackerLogic from "../../logic";

type TPlannedSpendProps = {
	spend: TSpend;
	opened: boolean;
	onClose: () => void;
	onOpen: () => void;
};

export default function PlannedSpend(props: TPlannedSpendProps) {
	const logic = new TrackerLogic();

	return (
		<>
			<Modal opened={props.opened} onClose={props.onClose} centered>

			</Modal>

			<Grid.Col key={props.spend.id}>
				<Card withBorder onClick={props.onOpen}>
					<Grid>
						<Grid.Col span={4}>{props.spend.cost}</Grid.Col>

						<Grid.Col span={4}>
							<Text align={`center`}>{logic.formatCategory(props.spend.category)}</Text>
						</Grid.Col>

						<Grid.Col span={4}>
							<Text align={`right`}>{dayjs(props.spend.createdAt).format(`DD.MM.YY`)}</Text>
						</Grid.Col>
					</Grid>
				</Card>
			</Grid.Col>
		</>
	);
}
