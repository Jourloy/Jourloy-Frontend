import {Avatar, Container, Flex, Group, Header, Title} from "@mantine/core";
import {PropsWithChildren, useState} from "react";
import {store} from "../store/store";

export default function LayoutContainer(props: PropsWithChildren) {
	const [avatar, setAvatar] = useState(store.getState().userReducer.avatar);
	store.subscribe(() => {
		const _avatar = store.getState().userReducer.avatar;
		if (avatar !== _avatar) setAvatar(avatar);
	});

	return (
		<>
			<Header height={45} w={`100%`}>
				<Flex h={40} w={`100%`} justify={`center`} align={`center`}>
					<Container maw={`850px`} w={`100%`} p={0}>
						<Group position={`apart`} w={`100%`} px={8} mt={`5px`}>
							<Flex>
								<Title>JOU</Title>
								<Title color={`red`} style={{rotate: `180deg`}}>R</Title>
								<Title>LOY</Title>
							</Flex>
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
