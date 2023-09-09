import {Badge, Card, Center, Grid, Modal, Text, UnstyledButton} from "@mantine/core";
import {TSpend} from "../../../../types";
import dayjs from "dayjs";
import TrackerLogic from "../../logic";
import {formatter} from "../../../../context";

type TPlannedSpendProps = {
	spend: TSpend;
	opened: boolean;
	onClose: () => void;
	onOpen: () => void;
};

export default function PlannedSpend(props: TPlannedSpendProps) {
	const logic = new TrackerLogic();

	return (
		<Grid.Col md={6} sm={12} key={props.spend.id}>
			<Modal opened={props.opened} onClose={props.onClose} centered></Modal>

			<UnstyledButton w={`100%`} onClick={props.onOpen}>
				<Card withBorder py={`sm`} px={`md`}>
					<Grid>
						<Grid.Col span={4}>
							<Text align={`left`}>{formatter.format(props.spend.cost)}</Text>
						</Grid.Col>

						<Grid.Col span={4}>
							<Center h={`100%`} w={`100%`}>
								<Badge
									color={logic.getBadgeColor(props.spend)}
									radius={`sm`}
									variant={`outline`}
								>
									{logic.formatCategory(props.spend.category)}
								</Badge>
							</Center>
						</Grid.Col>

						<Grid.Col span={4}>
							<Text align={`right`}>
								{dayjs(props.spend.createdAt).format(`DD.MM.YY`)}
							</Text>
						</Grid.Col>
					</Grid>
				</Card>
			</UnstyledButton>
		</Grid.Col>
	);
}
