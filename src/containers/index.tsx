import {MantineProvider} from "@mantine/core";
import {DatesProvider} from "@mantine/dates";
import {PropsWithChildren} from "react";
import {ToastContainer} from "react-toastify";
import "dayjs/locale/ru";
import LayoutContainer from "./layout";
import {Providers} from "../store/provider";

export default function DefaultContainer(props: PropsWithChildren) {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: `light`,
				fontFamily: `SF Pro Display Regular`,
				components: {
					Button: {
						defaultProps: {
							color: `dark`,
						},
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
				},
			}}
		>
			<DatesProvider settings={{locale: `ru`}}>
				<LayoutContainer>
					<Providers>{props.children}</Providers>
				</LayoutContainer>
			</DatesProvider>
			<ToastContainer />
		</MantineProvider>
	);
}