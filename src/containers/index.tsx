import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {DatesProvider} from "@mantine/dates";
import {PropsWithChildren, useState} from "react";
import {ToastContainer} from "react-toastify";
import "dayjs/locale/ru";
import {Providers} from "../store/provider";
import {useColorScheme} from "@mantine/hooks";

export default function DefaultContainer(props: PropsWithChildren) {
	const colorSchemePrefered = useColorScheme();

	const [colorScheme, setColorScheme] = useState<ColorScheme>(colorSchemePrefered);
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === `dark` ? `light` : `dark`));

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: colorScheme,
					fontFamily: `SF Pro Display Regular`,
					components: {
						Button: {
							defaultProps: theme => ({
								color: theme.colorScheme === `dark` ? `gray` : `dark`,
								variant: theme.colorScheme === `dark` ? `white` : `filled`,
							}),
							styles: () => ({
								root: {
									fontWeight: 500,
								},
							}),
						},
						Modal: {
							defaultProps: {
								withCloseButton: false,
								overlayProps: {
									blur: 3,
								},
							},
						},
						Card: {
							defaultProps: {
								radius: `md`,
							},
						},
					},
				}}
			>
				<DatesProvider settings={{locale: `ru`}}>
					<Providers>{props.children}</Providers>
				</DatesProvider>
				<ToastContainer />
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
