import {Box, Button, Container, createStyles, Group, Text, Title, useMantineTheme} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {useDocumentTitle} from "@mantine/hooks";
import * as Sentry from "@sentry/react";
import { useEffect } from "react";

const useStyles = createStyles(theme => ({
	root: {
		paddingTop: 80,
		paddingBottom: 80,
	},

	inner: {
		position: `relative`,
	},

	content: {
		paddingTop: 220,
		position: `relative`,
		zIndex: 1,

		[theme.fn.smallerThan(`sm`)]: {
			paddingTop: 120,
		},
	},

	title: {
		textAlign: `center`,
		fontWeight: 900,
		fontSize: 38,

		[theme.fn.smallerThan(`sm`)]: {
			fontSize: 32,
		},
	},

	description: {
		maxWidth: 540,
		margin: `auto`,
		marginTop: theme.spacing.xl,
		marginBottom: 10,
	},
}));

export function Page404() {
	useDocumentTitle(`404`);
	
	const {classes} = useStyles();
	const navigate = useNavigate();
	const theme = useMantineTheme();

	const onButton = () => {
		navigate(`/`);
	};

	useEffect(() => {
		Sentry.captureMessage(`Undefined page | ${document.location.href}`);
	}, [])

	return (
		<Box
			style={{
				position: `absolute`,
				left: `50%`,
				top: `50%`,
				transform: `translate(-50%, -50%)`,
				width: `90%`,
			}}
		>
			<Container className={classes.root}>
				<div className={classes.inner}>
					<svg
						xmlns={`http://www.w3.org/2000/svg`}
						viewBox="0 0 362 145"
						style={{
							position: `absolute`,
							left: `50%`,
							top: `50%`,
							transform: `translate(-50%, -50%)`,
							width: `80%`,
						}}
					>
						<path
							fill={
								theme.colorScheme === `dark`
									? theme.colors.dark[6]
									: theme.colors.gray[0]
							}
							d="M62.6 142c-2.133 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2L58.2 4c.8-1.333 2.067-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .667.533 1 1.267 1 2.2v21.2c0 .933-.333 1.733-1 2.4-.667.533-1.467.8-2.4.8H93v20.8c0 2.133-1.067 3.2-3.2 3.2H62.6zM33 90.4h26.4V51.2L33 90.4zM181.67 144.6c-7.333 0-14.333-1.333-21-4-6.666-2.667-12.866-6.733-18.6-12.2-5.733-5.467-10.266-13-13.6-22.6-3.333-9.6-5-20.667-5-33.2 0-12.533 1.667-23.6 5-33.2 3.334-9.6 7.867-17.133 13.6-22.6 5.734-5.467 11.934-9.533 18.6-12.2 6.667-2.8 13.667-4.2 21-4.2 7.467 0 14.534 1.4 21.2 4.2 6.667 2.667 12.8 6.733 18.4 12.2 5.734 5.467 10.267 13 13.6 22.6 3.334 9.6 5 20.667 5 33.2 0 12.533-1.666 23.6-5 33.2-3.333 9.6-7.866 17.133-13.6 22.6-5.6 5.467-11.733 9.533-18.4 12.2-6.666 2.667-13.733 4-21.2 4zm0-31c9.067 0 15.6-3.733 19.6-11.2 4.134-7.6 6.2-17.533 6.2-29.8s-2.066-22.2-6.2-29.8c-4.133-7.6-10.666-11.4-19.6-11.4-8.933 0-15.466 3.8-19.6 11.4-4 7.6-6 17.533-6 29.8s2 22.2 6 29.8c4.134 7.467 10.667 11.2 19.6 11.2zM316.116 142c-2.134 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2l56.6-84.6c.8-1.333 2.066-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .666.533 1 1.267 1 2.2v21.2c0 .933-.334 1.733-1 2.4-.667.533-1.467.8-2.4.8h-11.2v20.8c0 2.133-1.067 3.2-3.2 3.2h-27.2zm-29.6-51.6h26.4V51.2l-26.4 39.2z"
						/>
					</svg>
					<div className={classes.content}>
						<Title className={classes.title}>Здесь ничего нет</Title>
						<Text color={`dimmed`} size={`lg`} align={`center`} className={classes.description}>
							Страница, которую ты пытаешься открыть, не существует. Возможно, ошибка
							в адресе или страница переехала на новый URL.
						</Text>
						<Group position={`center`}>
							<Button variant={`outline`} onClick={onButton} size={`md`}>
								Вернуться на главную
							</Button>
						</Group>
					</div>
				</div>
			</Container>
		</Box>
	);
}
