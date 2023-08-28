import {Button, Card, Divider, Grid, Title, Image, Text, Group, ActionIcon, Flex} from "@mantine/core";
import {IconBrandDiscord, IconBrandGithub, IconBrandTwitch} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

export default function Main() {
	const navigate = useNavigate();

	const toTwitch = () => {
		window.location.href = `https://twitch.tv/jourloy`;
	}

	const toDiscord = () => {
		window.location.href = `https://discord.gg/PB8rdcXyRR`;
	}

	const toGithub = () => {
		window.location.href = `https://github.com/jourloy`;
	}

	return (
		<Flex justify={`center`} py={20} px={20}>
			<Grid maw={`700px`} w={`100%`} p={0} align={`center`} ml={`0px`}>
				<Grid.Col sm={12} md={4}>
					<Image src={`https://s.jourloy.com/web-images/me.png`} withPlaceholder radius={`md`} />
				</Grid.Col>

				<Grid.Col sm={12} md={8}>
					<Card withBorder mih={`217px`}>
						<Grid gutter={3}>
							<Grid.Col>
								<Title align={`center`} tt={`uppercase`}>
									✌️ Это я ✌️
								</Title>
							</Grid.Col>

							<Grid.Col>
								<Divider my={`10px`} />
							</Grid.Col>

							<Grid.Col>
								<Text align={`center`}>
									Мужчина, муж, брат, сын, программист и просто хороший человек
								</Text>
							</Grid.Col>

							<Grid.Col>
								<Text align={`center`}>Заходи ко мне - поболтаем</Text>
							</Grid.Col>

							<Grid.Col mt={`5px`}>
								<Group position={`center`}>
									<ActionIcon style={{color: `#5865F2`}} onClick={toDiscord}>
										<IconBrandDiscord />
									</ActionIcon>

									<ActionIcon style={{color: `#6441A4`}} onClick={toTwitch}>
										<IconBrandTwitch />
									</ActionIcon>

									<ActionIcon color={`dark`} onClick={toGithub}>
										<IconBrandGithub />
									</ActionIcon>
								</Group>
							</Grid.Col>
						</Grid>
					</Card>
				</Grid.Col>

				<Grid.Col>
					<Divider />
				</Grid.Col>

				<Grid.Col>
					<Card withBorder w={`100%`} h={`100%`}>
						<Grid>
							<Grid.Col>
								<Title align={`center`}>Инструментики</Title>
							</Grid.Col>

							<Grid.Col>
								<Divider />
							</Grid.Col>

							<Grid.Col span={6}>
								<Button fullWidth onClick={() => navigate(`/party`)}>
									Party калькулятор
								</Button>
							</Grid.Col>

							<Grid.Col span={6}>
								<Button fullWidth disabled>
									Фильмы
								</Button>
							</Grid.Col>
						</Grid>
					</Card>
				</Grid.Col>

				<Grid.Col>
					<Card withBorder w={`100%`} h={`100%`}>
						<Grid>
							<Grid.Col>
								<Title align={`center`}>Мои проекты</Title>
							</Grid.Col>

							<Grid.Col>
								<Button disabled fullWidth color={`orange`}>
									Денежный трекер
								</Button>
							</Grid.Col>
						</Grid>
					</Card>
				</Grid.Col>

				<Grid.Col span={6} hidden>
					<Button fullWidth variant={`outline`}>
						Связаться
					</Button>
				</Grid.Col>

				<Grid.Col span={6} hidden>
					<Button fullWidth variant={`outline`}>
						Купить кофе
					</Button>
				</Grid.Col>
			</Grid>
		</Flex>
	);
}
