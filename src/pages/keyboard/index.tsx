import {
	Button,
	Center,
	Divider,
	Flex,
	Grid,
	Group,
	Paper,
	Text,
	Title,
	Image,
	Card,
} from "@mantine/core";
import ScrollHint from "../../components/scrollHint";
import {motion} from "framer-motion";
import {useState} from "react";
import KeyboardBuyModal from "./@modals/buy.modal";
import KeyboardFeature1 from "./@modals/feature1.modal";
import KeyboardFeature2 from "./@modals/feature2.modal";
import KeyboardFeature3 from "./@modals/feature3.modal";
import KeyboardFeature4 from "./@modals/feature4.modal";
import KeyboardFeature5 from "./@modals/feature5.modal";
import KeyboardFeature6 from "./@modals/feature6.modal";
import {useNavigate} from "react-router-dom";

export default function KeyboardIndex() {
	const navigate = useNavigate();

	const [buyModal, setBuyModal] = useState(false);

	const [feature1Modal, setFeature1Modal] = useState(false);
	const [feature2Modal, setFeature2Modal] = useState(false);
	const [feature3Modal, setFeature3Modal] = useState(false);
	const [feature4Modal, setFeature4Modal] = useState(false);
	const [feature5Modal, setFeature5Modal] = useState(false);
	const [feature6Modal, setFeature6Modal] = useState(false);

	return (
		<>
			<KeyboardBuyModal
				opened={buyModal}
				onClose={() => {
					setBuyModal(false);
				}}
			/>

			<KeyboardFeature1
				opened={feature1Modal}
				onClose={() => {
					setFeature1Modal(false);
				}}
			/>

			<KeyboardFeature2
				opened={feature2Modal}
				onClose={() => {
					setFeature2Modal(false);
				}}
			/>

			<KeyboardFeature3
				opened={feature3Modal}
				onClose={() => {
					setFeature3Modal(false);
				}}
			/>

			<KeyboardFeature4
				opened={feature4Modal}
				onClose={() => {
					setFeature4Modal(false);
				}}
			/>

			<KeyboardFeature5
				opened={feature5Modal}
				onClose={() => {
					setFeature5Modal(false);
				}}
			/>

			<KeyboardFeature6
				opened={feature6Modal}
				onClose={() => {
					setFeature6Modal(false);
				}}
			/>

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
												<Image
													src={`https://s.jourloy.com/web-images/FrameworkPreview.png`}
												/>
											</Grid.Col>

											<Grid.Col>
												<Text align={`center`} color={`dimmed`} size={`20px`}>
													Самая удобная клавиатура
												</Text>
											</Grid.Col>

											<Grid.Col>
												<Divider />
											</Grid.Col>

											<Grid.Col>
												<Center>
													<Button fullWidth onClick={() => setBuyModal(true)}>
														Начать пользоваться
													</Button>
												</Center>
											</Grid.Col>
										</Grid>
									</Center>
								</Paper>
							</Grid.Col>

							<Grid.Col>
								<Paper>
									<Grid>
										<Grid.Col>
											<Title tt={`uppercase`} align={`center`}>
												Это все, что {` `}
												<Text span color={`indigo.5`}>
													тебе
												</Text>
												{` `} нужно
											</Title>
										</Grid.Col>

										<Grid.Col>
											<Center>
												<Text align={`center`} maw={`600px`}>
													У клавиатуры 59 клавиш и 1 энкодер, который отвечает
													за громкость звука, колесо мыши или яркость экрана. В
													этой клавиатуре собраны практически все преимущества
													современных клавиатур.
												</Text>
											</Center>
										</Grid.Col>
									</Grid>
								</Paper>
							</Grid.Col>

							<Grid.Col mt={`100px`}>
								<motion.div
									initial={{opacity: 0}}
									whileInView={{opacity: 1}}
									transition={{duration: 1}}
									className={`col-span-3 w-[100%]`}
								>
									<Button
										fullWidth
										h={`50px`}
										variant={`outline`}
										onClick={() => {
											setFeature1Modal(true);
										}}
									>
										<Flex>
											<Title order={3} mx={`30px`}>
												Запуск, 3, 2, 1!
											</Title>
										</Flex>
									</Button>
								</motion.div>
							</Grid.Col>

							<Grid.Col md={8} sm={12}>
								<motion.div
									initial={{opacity: 0}}
									whileInView={{opacity: 1}}
									transition={{duration: 1}}
									className={`col-span-3 w-[100%]`}
								>
									<Button
										fullWidth
										h={`50px`}
										variant={`outline`}
										onClick={() => {
											setFeature2Modal(true);
										}}
									>
										<Flex>
											<Title order={3} mx={`30px`}>
												Все при себе
											</Title>
										</Flex>
									</Button>
								</motion.div>
							</Grid.Col>

							<Grid.Col md={4} sm={12}>
								<motion.div
									initial={{opacity: 0}}
									whileInView={{opacity: 1}}
									transition={{duration: 1}}
									className={`col-span-3 w-[100%]`}
								>
									<Button
										fullWidth
										h={`50px`}
										variant={`outline`}
										onClick={() => {
											setFeature3Modal(true);
										}}
									>
										<Flex>
											<Title order={3} mx={`30px`}>
												Компактность
											</Title>
										</Flex>
									</Button>
								</motion.div>
							</Grid.Col>

							<Grid.Col md={4} sm={12}>
								<motion.div
									initial={{opacity: 0}}
									whileInView={{opacity: 1}}
									transition={{duration: 1}}
									className={`col-span-3 w-[100%]`}
								>
									<Button
										fullWidth
										h={`50px`}
										variant={`outline`}
										onClick={() => {
											setFeature4Modal(true);
										}}
									>
										<Flex>
											<Title order={3} mx={`30px`}>
												Механика
											</Title>
										</Flex>
									</Button>
								</motion.div>
							</Grid.Col>

							<Grid.Col md={8} sm={12}>
								<motion.div
									initial={{opacity: 0}}
									whileInView={{opacity: 1}}
									transition={{duration: 1}}
									className={`col-span-3 w-[100%]`}
								>
									<Button
										fullWidth
										h={`50px`}
										variant={`outline`}
										onClick={() => {
											setFeature5Modal(true);
										}}
									>
										<Flex>
											<Title order={3} mx={`30px`}>
												Удобство
											</Title>
										</Flex>
									</Button>
								</motion.div>
							</Grid.Col>

							<Grid.Col>
								<motion.div
									initial={{opacity: 0}}
									whileInView={{opacity: 1}}
									transition={{duration: 1}}
									className={`col-span-3 w-[100%]`}
								>
									<Button
										fullWidth
										h={`50px`}
										variant={`outline`}
										onClick={() => {
											setFeature6Modal(true);
										}}
									>
										<Flex>
											<Title order={3} mx={`30px`}>
												Подходит каждому
											</Title>
										</Flex>
									</Button>
								</motion.div>
							</Grid.Col>

							<Grid.Col my={`100px`}>
								<Title align={`center`} tt={`uppercase`} order={1}>
									Помогаем всем сферам
								</Title>
							</Grid.Col>

							<Grid.Col span={12}>
								<motion.div
									initial={{opacity: 0}}
									whileInView={{opacity: 1}}
									transition={{duration: 2}}
									className={`w-[100%] col-span-2`}
								>
									<Card withBorder>
										<Grid>
											<Grid.Col>
												<Title>Киберспорт</Title>
											</Grid.Col>

											<Grid.Col>
												<Text>
													Частота опроса клавиатуры - 1мс. Далеко не все
													кастомные клавиатуры позволяют достичь такого
													значения
												</Text>
											</Grid.Col>

											<Grid.Col>
												<Text>
													Также стоит отметить, что все клавиши, которые ты
													зажмешь в один момент, они все будут обработаны
												</Text>
											</Grid.Col>
										</Grid>
									</Card>
								</motion.div>
							</Grid.Col>

							<Grid.Col span={12}>
								<motion.div
									initial={{opacity: 0}}
									whileInView={{opacity: 1}}
									transition={{duration: 2}}
								>
									<Card withBorder>
										<Grid>
											<Grid.Col>
												<Title>Офисы</Title>
											</Grid.Col>

											<Grid.Col>
												<Text>
													Если ты или твои сотрудники часто работают в Excel
													или подобных приложениях, то значительно облегчить
													работу помогут макросы - наборы действий, которые
													пользователь может настроить сам
												</Text>
											</Grid.Col>

											<Grid.Col>
												<Text>
													Также стоит отметить, что все клавиши, которые ты
													зажмешь в один момент, они все будут обработаны
												</Text>
											</Grid.Col>
										</Grid>
									</Card>
								</motion.div>
							</Grid.Col>

							<Grid.Col span={12}>
								<motion.div
									initial={{opacity: 0}}
									whileInView={{opacity: 1}}
									transition={{duration: 2}}
								>
									<Card withBorder>
										<Grid>
											<Grid.Col>
												<Title>Разработчики</Title>
											</Grid.Col>

											<Grid.Col>
												<Text>
													Благодаря наличию слоев, ты можешь назначить все
													необходимые символы и сочетания рядом, как тебе
													удобно. Это позволяет не только ускорить свою работу,
													но и снижает нагрузку на пальцы.
												</Text>
											</Grid.Col>
										</Grid>
									</Card>
								</motion.div>
							</Grid.Col>

							<Grid.Col>
								<Divider />
							</Grid.Col>

							<Grid.Col>
								<Title order={2} align={`center`}>
									Частые вопросы
								</Title>
							</Grid.Col>

							<Grid.Col>
								<Button fullWidth onClick={() => navigate(`/tutorial/framework`)}>
									Узнать
								</Button>
							</Grid.Col>
						</Grid>
					</Flex>
				</Paper>
			</Paper>
		</>
	);
}
