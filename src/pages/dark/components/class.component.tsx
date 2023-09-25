import {Avatar, Text, Card, Group, UnstyledButton} from "@mantine/core";
import {TDarkClass} from "../../../types";

type TProps = {
	class: TDarkClass;
};

export default function Class(props: TProps) {
	return (
		<UnstyledButton w={`100%`}>
			<Card withBorder>
				<Group>
					<Avatar>{props.class.ruName[0]}</Avatar>
					<Text>{props.class.ruName}</Text>
				</Group>
			</Card>
		</UnstyledButton>
	);
}
