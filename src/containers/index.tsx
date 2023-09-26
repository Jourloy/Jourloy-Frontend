import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {DatesProvider} from "@mantine/dates";
import {PropsWithChildren} from "react";
import {ToastContainer} from "react-toastify";
import "dayjs/locale/ru";
import {Providers} from "../store/provider";
import {useLocalStorage} from "@mantine/hooks";

export default function DefaultContainer(props: PropsWithChildren) {
	// const prefersColorScheme = useColorScheme();
	const prefersColorScheme = `dark`;
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: "mantine-color-scheme",
		defaultValue: prefersColorScheme,
		getInitialValueInEffect: true,
	});
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === `dark` ? `light` : `dark`));

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: colorScheme,
					components: {
						Title: {
							defaultProps: {
								color: `white`,
							}
						},
						Button: {
							defaultProps: theme => ({
								color: theme.colorScheme === `dark` ? `gray` : `dark`,
								variant: theme.colorScheme === `dark` ? `white` : `filled`,
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
							defaultProps: theme => ({
								radius: `md`,
								style: {
									backgroundColor: theme.colorScheme === `dark` ? theme.colors.dark[9] : `white`,
								},
								withBorder: theme.colorScheme === `dark` ? false : true
							}),
						},
						Pagination: {
							defaultProps: theme => ({
								color: theme.colorScheme === `dark` ? `gray` : `dark`,
								variant: theme.colorScheme === `dark` ? `white` : `filled`,
							}),
						},
						AppShell: {
							defaultProps: theme => ({
								style: {
									backgroundColor: theme.colorScheme === `dark` ? `black` : `white`,
								}
							}),
						},
						Header: {
							defaultProps: theme => ({
								style: {
									backgroundColor: theme.colorScheme === `dark` ? `black` : theme.colors.dark[7],
								}
							}),
						},
						Footer: {
							defaultProps: theme => ({
								style: {
									backgroundColor: theme.colorScheme === `dark` ? `black` : `white`,
								}
							}),
						}
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
