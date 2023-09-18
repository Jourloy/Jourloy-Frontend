import {Button, Center, Divider, Flex, Text, Title, Image, Card, Container, Stack} from "@mantine/core";
import ScrollHint from "../../components/scrollHint";
import {motion} from "framer-motion";
import {useState} from "react";
import KeyboardBuyModal from "./@modals/buy.modal";
import {useNavigate} from "react-router-dom";
import {useDocumentTitle} from "@mantine/hooks";
import FeatureList from "./feature.list.tsx";

export default function KeyboardIndex() {
	useDocumentTitle(`Framework`);

	const navigate = useNavigate();

	const [buyModal, setBuyModal] = useState(false);

	return (
		<>
			<KeyboardBuyModal
				opened={buyModal}
				onClose={() => {
					setBuyModal(false);
				}}
			/>

			<Container mt={100}>
				<Flex justify={`center`} align={`stretch`} direction={`column`} gap={"md"}>
					<Stack mb={50}>
						<Image src={`https://s.jourloy.com/web-images/FrameworkPreview.png`} />

						<Text align={`center`} color={`dimmed`} size={`20px`}>
							Самая удобная клавиатура
						</Text>

						<Divider />

						<Center>
							<Button fullWidth onClick={() => setBuyModal(true)}>
								Начать пользоваться
							</Button>
						</Center>
					</Stack>
					<Center>
						<ScrollHint />
					</Center>
					<Stack mt={50} align={"center"}>
						<Title tt={`uppercase`}>
							Это все, что {` `}
							<Text span color={`indigo.5`}>
								тебе
							</Text>
							{` `} нужно
						</Title>

						<Text align={`center`} maw={`600px`}>
							У клавиатуры 59 клавиш и 1 энкодер, который отвечает за громкость звука,
							колесо мыши или яркость экрана. В этой клавиатуре собраны практически все
							преимущества современных клавиатур.
						</Text>
					</Stack>

					<FeatureList />
					<Title my={50} align={`center`} tt={`uppercase`} order={1}>
						Помогаем всем сферам
					</Title>

					<motion.div
						initial={{opacity: 0}}
						whileInView={{opacity: 1}}
						transition={{duration: 2}}
					>
						<Card withBorder>
							<Stack>
								<Title>Киберспорт</Title>
								<Text>
									Частота опроса клавиатуры - 1мс. Далеко не все кастомные клавиатуры
									позволяют достичь такого значения
								</Text>

								<Text>
									Также стоит отметить, что все клавиши, которые ты зажмешь в один
									момент, они все будут обработаны
								</Text>
							</Stack>
						</Card>
					</motion.div>

					<motion.div
						initial={{opacity: 0}}
						whileInView={{opacity: 1}}
						transition={{duration: 2}}
					>
						<Card withBorder>
							<Stack>
								<Title>Офисы</Title>
								<Text>
									Если ты или твои сотрудники часто работают в Excel или подобных
									приложениях, то значительно облегчить работу помогут макросы - наборы
									действий, которые пользователь может настроить сам
								</Text>

								<Text>
									Также стоит отметить, что все клавиши, которые ты зажмешь в один
									момент, они все будут обработаны
								</Text>
							</Stack>
						</Card>
					</motion.div>

					<motion.div
						initial={{opacity: 0}}
						whileInView={{opacity: 1}}
						transition={{duration: 2}}
					>
						<Card withBorder>
							<Stack>
								<Title>Разработчики</Title>

								<Text>
									Благодаря наличию слоев, ты можешь назначить все необходимые символы
									и сочетания рядом, как тебе удобно. Это позволяет не только ускорить
									свою работу, но и снижает нагрузку на пальцы.
								</Text>
							</Stack>
						</Card>
					</motion.div>

					<Divider w={`100%`} />

					<Title order={2} align={`center`}>
						Частые вопросы
					</Title>

					<Button fullWidth onClick={() => navigate(`/tutorial/framework`)}>
						Узнать
					</Button>
				</Flex>
			</Container>
		</>
	);
}
