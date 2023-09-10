import {Badge, Card, Center, Grid, Modal, Text, UnstyledButton} from "@mantine/core";
import {TSpend} from "../../../../types";
import dayjs from "dayjs";
import TrackerLogic from "../../logic";
import {formatter} from "../../../../context";
import {useState} from "react";

type THistorySpendProps = {
	spend: TSpend;
};

export default function HistorySpend(props: THistorySpendProps) {
	const logic = new TrackerLogic();

	const [modalShow, setModalShow] = useState(false);

	const onClose = () => {
		setModalShow(false);
	};

	return (
		<Grid.Col md={6} sm={12}>
			<Modal opened={modalShow} onClose={onClose} centered></Modal>

			<UnstyledButton w={`100%`} onClick={() => setModalShow(true)}>
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
									<Center h={`100%`}>
										<Text>
											{logic.formatCategory(props.spend.category)}
										</Text>
									</Center>
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
