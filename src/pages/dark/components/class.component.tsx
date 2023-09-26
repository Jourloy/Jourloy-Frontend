import {Title, Card, Group, UnstyledButton, Stack, Badge, Image, Avatar} from "@mantine/core";
import {TDarkClass} from "../../../types";
import {useState} from "react";

type TProps = {
	class: TDarkClass;
};

export default function Class(props: TProps) {
	const [width, setWidth] = useState(`150px`);
	const [top, setTop] = useState(`-52px`);
	const [blur, setBlur] = useState(`1px`);
	const [brightness, setBrightness] = useState(`0.5`);

	const getBackgroundUrl = () => {
		return `${props.class.enName}Background.png`;
	};

	const getClassUrl = () => {
		return `${props.class.enName}.png`;
	};

	const getClassIconUrl = () => {
		return `${props.class.enName}Icon.png`;
	}

	const getType = () => {
		switch (props.class.enName) {
			case `Ranger`:
				return `DD`;
			case `Barbarian`:
				return `Tank`;
			case `Fighter`:
				return `Tank`;
			case `Rogue`:
				return `DD`;
			case `Bard`:
				return `Support`;
			case `Cleric`:
				return `Support`;
			case `Wizard`:
				return `DD`;
			case `Druid`:
				return `Tank`;
			case `Warlock`:
				return `DD`;
		}
	};

	const getTypeColor = () => {
		const type = getType();
		switch (type) {
			case `DD`:
				return `orange`;
			case `Tank`:
				return `red`;
			case `Support`:
				return `green`;
		}
	};

	const onMouseEnter = () => {
		setWidth(`200px`);
		setTop(`-110px`);
		setBlur(`2px`);
		setBrightness(`0.3`);
	};

	const onMouseLeave = () => {
		setWidth(`150px`);
		setTop(`-52px`);
		setBlur(`1px`);
		setBrightness(`0.5`);
	};

	return (
		<UnstyledButton w={`100%`} h={`120px`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<Card h={`100%`} style={{overflow: `visible`}} withBorder>
				<Image
					src={getBackgroundUrl()}
					style={{
						position: `absolute`,
						left: `0px`,
						top: `0px`,
						transition: `all 0.5s ease-in-out`,
						filter: `blur(${blur}) brightness(${brightness})`,
					}}
					height={`120px`}
					radius={`md`}
				/>
				<Image
					className={`class-image`}
					src={getClassUrl()}
					style={{
						position: `absolute`,
						top: top,
						right: `20px`,
						filter: ``,
						transition: `all 0.5s ease-in-out`,
						width: width,
					}}
				/>
				<Stack style={{position: `absolute`}}>
					<Group>
						<Avatar src={getClassIconUrl()} variant={`outline`} />
						<Badge variant={`outline`} radius={`sm`} color={getTypeColor()}>
							{getType()}
						</Badge>
					</Group>
					<Group>
						<Title order={3} color={`white`}>
							{props.class.enName}
						</Title>
					</Group>
				</Stack>
			</Card>
		</UnstyledButton>
	);
}
