import {Card, UnstyledButton} from "@mantine/core";
import {TDarkClass} from "../../../types";

type TProps = {
	class: TDarkClass;
};

export default function Class(props: TProps) {
	return (
		<UnstyledButton w={`100%`}>
			<Card withBorder>{props.class.enName}</Card>
		</UnstyledButton>
	);
}
