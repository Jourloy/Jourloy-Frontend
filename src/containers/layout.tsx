import {
	Footer,
	Text,
	Center,
	AppShell,
} from "@mantine/core";
import {PropsWithChildren} from "react";

import HeaderPreset from "./presets/header";

export default function LayoutContainer(props: PropsWithChildren) {
	

	return (
		<>
			
			<AppShell
				header={
					<HeaderPreset />
				}
				footer={
					<Footer height={45}>
						<Center h={`100%`} w={`100%`}>
							<Text align={`center`} size={`sm`}>
								Developed with ❤️ by Jourloy
							</Text>
						</Center>
					</Footer>
				}
			>
				{props.children}
			</AppShell>
		</>
	);
}
