import {Button, Divider, Grid, Modal, MultiSelect, NumberInput, TextInput, Title} from "@mantine/core";
import {CancelToken} from "axios";
import {useState} from "react";
import {store} from "../../../../../store/store";
import PartyAPI from "../../../api";
import {toast} from "react-toastify";
import PartyPositionLogic from "../logic";

type TProps = {
	opened: boolean;
	onClose: () => void;
	updateCalculator: (token?: CancelToken) => Promise<boolean>;
};

export default function PartyAddPositionModal(props: TProps) {
	const [calculator, setCalculator] = useState(store.getState().partyReducer.calculator);

	store.subscribe(() => {
		const calc = store.getState().partyReducer.calculator;
		setCalculator(calc);
	});

	const backend = new PartyAPI();
	const logic = new PartyPositionLogic(calculator);

	const [positionName, setPositionName] = useState(``);
	const [positonCost, setPositionCost] = useState<number>();
	const [positionCostError, setPositionCostError] = useState<undefined | string>(undefined);
	const [positionMembers, setPositionMembers] = useState<string[]>([]);

	const getData = () => {
		const data = [];
		for (const member of calculator.members) {
			data.push({value: member.id.toString(), label: member.name, image: member.avatar});
		}
		return data;
	};

	const checkName = (str: string) => {
		setPositionName(str);
	};

	const checkCost = (num: number | "") => {
		const checked = logic.checkNumber(num);

		if (checked.error) {
			setPositionCostError(checked.desc);
			return;
		}

		setPositionCostError(undefined);
		setPositionCost(checked.result);
	};

	const submit = () => {
		if (positionName === `` || positonCost == undefined) return;

		const members: number[] = [];
		positionMembers.forEach(v => members.push(+v));

		backend
			.createPosition({
				name: positionName,
				cost: positonCost,
				memberIds: members,
				calculatorId: calculator.id,
			})
			.then(() => {
				toast.success(`Позиция добавлена ✅`);
				props.updateCalculator();
				closeModal();
			})
			.catch(() => {
				toast.error(`Что-то пошло не так ❌`);
			});
	};

	const closeModal = () => {
		setPositionName(``);
		setPositionCost(undefined);
		setPositionCostError(undefined);
		setPositionMembers([]);
		props.onClose();
	};

	return (
		<>
			<Modal opened={props.opened} onClose={closeModal} centered>
				<Grid>
					<Grid.Col>
						<Title tt={`uppercase`} order={3} align={`center`}>
							Добавить позицию
						</Title>
					</Grid.Col>

					<Grid.Col>
						<Divider />
					</Grid.Col>

					<Grid.Col>
						<TextInput placeholder={`Что это?`} onChange={e => checkName(e.target.value)} />
					</Grid.Col>

					<Grid.Col>
						<NumberInput
							placeholder={`Сколько это стоит?`}
							onChange={e => checkCost(e)}
							error={positionCostError}
						/>
					</Grid.Col>

					<Grid.Col>
						<MultiSelect
							data={getData()}
							placeholder={`Прикрепи участников`}
							searchable
							nothingFound={`Никого не нашли`}
							onChange={v => setPositionMembers(v)}
						/>
					</Grid.Col>

					<Grid.Col>
						<Button fullWidth variant={`outline`} onClick={submit}>
							Добавить
						</Button>
					</Grid.Col>
				</Grid>
			</Modal>
		</>
	);
}
