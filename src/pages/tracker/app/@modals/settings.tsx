import {Button, Center, Divider, Grid, Modal, NumberInput, Radio, Text, Title, Group} from "@mantine/core";
import { useState } from "react";
import { store } from "../../../../store/store";

type TSettingsModalProps = {
	opened: boolean;
	onClose: () => void;
};

export default function SettingsModal(props: TSettingsModalProps) {
	const [tracker, setTracker] = useState(store.getState().trackerReducer.tracker);
	store.subscribe(() => {
		const _tracker = store.getState().trackerReducer.tracker;
		if (tracker !== _tracker) setTracker(_tracker);
	});
	
	const [calc, setCalc] = useState(tracker.calc);

	const onClose = () => {
		setCalc(tracker.calc);
		props.onClose();
	};

	return (
		<>
			<Modal opened={props.opened} onClose={onClose} centered>
				<Grid>
					<Grid.Col>
						<Title order={2} align={`center`}>
							Настройки трекера
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col span={6}>
						<NumberInput label={`Лимит на период`} defaultValue={tracker.dayLimit} />
					</Grid.Col>

					<Grid.Col span={6}>
						<NumberInput label={`Бюджет`} defaultValue={tracker.limit} />
					</Grid.Col>

					<Grid.Col>
						<Center>
							<Radio.Group
								name={`calc`}
								label={<Text size={`md`}>Как рассчитывать лимит денег</Text>}
								value={calc}
								onChange={e => setCalc(e)}
							>
								<Group position={`apart`}>
									<Radio label={`По дням`} value={`dayCalc`} color={`orange`} />
									<Radio label={`По неделям`} value={`weekCalc`} color={`orange`} />
								</Group>
							</Radio.Group>
						</Center>
					</Grid.Col>

					<Grid.Col>
						<Button fullWidth variant={`outline`}>
							Сохранить
						</Button>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<Button fullWidth disabled>
							Поделиться
						</Button>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}
