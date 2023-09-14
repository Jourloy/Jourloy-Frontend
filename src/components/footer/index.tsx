import {Footer, Center, Text} from "@mantine/core";

export default function FooterComponent() {
	return (
		<Footer height={45}>
			<Center h={`100%`} w={`100%`}>
				<Text align={`center`} size={`sm`}>
					Developed with ❤️ by Jourloy
				</Text>
			</Center>
		</Footer>
	);
}
