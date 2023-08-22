import {Button, Divider, Grid, Modal, TextInput, Title} from "@mantine/core";
import {useState} from "react";
import PartyAPI from "../../api";
import { toast } from "react-toastify";
import { CancelToken } from "axios";
import { store } from "../../../../store/store";

type TProps = {
	opened: boolean;
	onClose: () => void;
	updateCalculator: (token?: CancelToken) => Promise<boolean>;
};

export default function PartyAddMemberModal(props: TProps) {
	const backend = new PartyAPI();

	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);
	
	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		if (calculator !== calc) setCalculator(calc);
	});

	const [memberName, setMemberName] = useState(``);

	const submit = () => {
		backend.createMember(calculator.id, memberName)
			.then(() => {
				props.updateCalculator();
				setMemberName(``);
				toast.success(`Участник добавлен 🎉`);
				props.onClose();
			})
			.catch(() => {
				toast.error(`Что-то пошло не так 😰`);
			});
	}

	return (
		<>
			<Modal opened={props.opened} onClose={props.onClose} centered>
				<Grid>
					<Grid.Col>
						<Title tt={`uppercase`} order={3} align={`center`}>
							Добавить участника
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<TextInput 
							placeholder={`Как зовут участника?`} 
							onChange={e => setMemberName(e.target.value)}
						/>
					</Grid.Col>

					<Grid.Col>
						<Button fullWidth variant={`outline`} disabled={memberName === ``} onClick={submit}>
							Добавить
						</Button>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}
