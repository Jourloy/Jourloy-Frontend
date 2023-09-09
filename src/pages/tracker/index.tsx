import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TrackerAPI from "./api";
import {Paper, Group, Flex, Grid, Center, Title, Divider, Button, Text} from "@mantine/core";
import ScrollHint from "../../components/scrollHint";
import DefaultLoading from "../../components/loading";
import {toast} from "react-toastify";

export default function TrackerIndex() {
	document.title = `Трекер`;

	const navigate = useNavigate();
	const backend = new TrackerAPI();

	const [loading, setLoading] = useState(true);
	const [tracker, setTracker] = useState(false);
	const [block, setBlock] = useState(false);

	const toTracker = () => {
		if (block) return;

		if (tracker) navigate(`/tracker/app`);
		else navigate(`/tracker/create`);
	};

	useEffect(() => {
		setLoading(true);

		const source = backend.getSource();

		backend
			.autoUpdateTracker()
			.then(s => {
				if (s === 404) setTracker(false);
				else if (s !== 200) {
					toast.error(`Сервер не доступен, попробуй позже`);
					setBlock(true);
				} else setTracker(true);
			})
			.catch(() => {
				setTracker(false);
				toast.error(`Сервер не доступен, попробуй позже`);
				setBlock(true);
			})
			.finally(() => setLoading(false));

		return () => source.cancel();
	}, []);

	if (loading) return <DefaultLoading />;

	return (
		<Paper>
			<Paper
				style={{
					position: `absolute`,
					top: `90dvh`,
				}}
				w={`100%`}
				ml={`-16px`}
			>
				<Group position={`center`} w={`100%`}>
					<ScrollHint />
				</Group>
			</Paper>
			<Paper>
				<Flex justify={`center`}>
					<Grid maw={`850px`} w={`100%`}>
						<Grid.Col>
							<Paper h={`calc(100dvh - 80px)`}>
								<Center h={`100%`} w={`100%`}>
									<Grid>
										<Grid.Col>
											<Title align={`center`} tt={`uppercase`} order={1}>
												Ты еще не {` `}
												<Text
													span
													variant={`gradient`}
													gradient={{from: `yellow`, to: `red`}}
												>
													следишь
												</Text>
												{` `} за своими расходами?
											</Title>
										</Grid.Col>

										<Grid.Col>
											<Text
												align={`center`}
												color={`dimmed`}
												size={`18px`}
												mt={`-10px`}
											>
												Все расходы и доходы прямо перед глазами
											</Text>
										</Grid.Col>

										<Grid.Col>
											<Divider
												label={
													<Text color={`red`} size={`15px`}>
														и бесплатно
													</Text>
												}
												labelPosition={`center`}
												mt={`-10px`}
											/>
										</Grid.Col>

										<Grid.Col>
											<Center>
												<Button fullWidth onClick={toTracker}>
													Начать пользоваться
												</Button>
											</Center>
										</Grid.Col>
									</Grid>
								</Center>
							</Paper>
						</Grid.Col>
					</Grid>
				</Flex>
			</Paper>
		</Paper>
	);
}
