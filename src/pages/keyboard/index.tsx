import { Button, Card, Center, Divider, Flex, Grid, Group, Paper, Text, Title } from "@mantine/core";
import { IconArrowBigDownFilled } from "@tabler/icons-react";

export default function KeyboardIndex() {
	return(
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
				<IconArrowBigDownFilled stroke={1.3} style={{color: `#868e96`}} />
				<Text align={`center`} color={`dimmed`} tt={`lowercase`}>
					Там больше информации
				</Text>
				<IconArrowBigDownFilled stroke={1.3} style={{color: `#868e96`}} />
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
											У тебя еще нет {` `}
											<Text span variant={`gradient`} gradient={{from: `yellow`, to: `red`}}>
												Party
											</Text>
											{` `} калькулятора?
										</Title>
									</Grid.Col>

									<Grid.Col>
										<Text align={`center`} color={`dimmed`} size={`18px`} mt={`-10px`}>
											Удобный способ устроить вечеринку
										</Text>
									</Grid.Col>

									<Grid.Col>
										<Divider
											label={
												<Text color={`red`} size={`15px`}>
													и бесплатный
												</Text>
											}
											labelPosition={`center`}
											mt={`-10px`}
										/>
									</Grid.Col>

									<Grid.Col>
										<Center>
											<Button fullWidth>
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
									<Card withBorder p={15}>
										<Grid>
											<Grid.Col>
												<Text>
													Давай представим ситуацию. Ты хочешь устроить вечеринку, будет
													много людей, много еды и развлечений. Как стоимость всего честно
													распределить между всеми участниками?
												</Text>
											</Grid.Col>

											<Grid.Col>
												<Text>
													Взять со всех одинаковую сумму? Но ведь тогда кто-то переплатит,
													ведь он может не пить / кушать / использовать все, что будет на
													вечеринке
												</Text>
											</Grid.Col>
										</Grid>
									</Card>
								</Grid.Col>

								<Grid.Col>
									<Divider
										labelPosition={`center`}
										label={
											<Title align={`center`} order={2}>
												Что тогда?
											</Title>
										}
									/>
								</Grid.Col>
							</Grid>
						</Paper>
					</Grid.Col>
				</Grid>
			</Flex>
		</Paper>
	</Paper>
	)
}