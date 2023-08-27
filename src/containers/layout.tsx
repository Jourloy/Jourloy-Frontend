import {Avatar, Container, Flex, Group, Header, Title, UnstyledButton} from "@mantine/core";
import {PropsWithChildren, useState} from "react";
import {store} from "../store/store";

export default function LayoutContainer(props: PropsWithChildren) {
	const [avatar, setAvatar] = useState(store.getState().userReducer.avatar);
	store.subscribe(() => {
		const _avatar = store.getState().userReducer.avatar;
		if (avatar !== _avatar) setAvatar(avatar);
	});

	const toMain = () => {
		window.location.href = `https://jourloy.com`;
	}

	return (
		<>
			<Header height={45} w={`100%`} bg={`dark`}>
				<Flex h={40} w={`100%`} justify={`center`} align={`center`}>
					<Container maw={`850px`} w={`100%`} p={0}>
						<Group position={`apart`} w={`100%`} px={8} mt={`5px`}>
							<UnstyledButton onClick={toMain}>
								<Flex>
									<Title color={`white`}>JOU</Title>
									<Title color={`blue`} style={{rotate: `180deg`}}>R</Title>
									<Title color={`red`}>LOY</Title>
								</Flex>
							</UnstyledButton>
							<Flex>
								<Avatar src={avatar} />
							</Flex>
						</Group>
					</Container>
				</Flex>
			</Header>
			{props.children}
		</>
	);
}
