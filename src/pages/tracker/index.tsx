import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TrackerAPI from "./api";
import {Paper, Group, Flex, Grid, Center, Title, Divider, Button, Text} from "@mantine/core";
import ScrollHint from "../../components/scrollHint";
import {toast} from "react-toastify";

export default function TrackerIndex() {
	document.title = `Трекер`;

	const navigate = useNavigate();
	const backend = new TrackerAPI();

	const [tracker, setTracker] = useState(false);
	const [block, setBlock] = useState(false);

	const toTracker = () => {
		if (block) return;

		if (tracker) navigate(`/tracker/app`);
		else navigate(`/tracker/create`);
	};

	useEffect(() => {
		const source = backend.getSource();

		backend
			.autoUpdateTracker()
			.then(s => {
				if (s >= 400 && s < 500) setTracker(false);
				else setTracker(true);
			})
			.catch(() => {
				setTracker(false);
				toast.error(`Сервер не доступен, попробуй позже`);
				setBlock(true);
			});

		return () => source.cancel();
	}, []);

	return (
		<Paper>
			<Paper
				style={{
					position: `absolute`,
					top: `90dvh`,
					display: `none`,
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
													<Text>
													Начать пользоваться {` `}
													<Text span color={`red`}>
														[ БЕТА ]
													</Text>
													</Text>
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
