import {
	Button,
	Card,
	Flex,
	Grid,
	Group,
	Title,
	Text,
	ActionIcon,
	UnstyledButton,
	ScrollArea,
	Divider,
	Avatar,
} from "@mantine/core";
import {IconPencil, IconTrashXFilled} from "@tabler/icons-react";

const formatter = new Intl.NumberFormat("ru", {
	style: `currency`,
	currency: `RUB`,
	maximumFractionDigits: 0,
});

export default function Party() {
	return (
		<>
			<Flex justify={`center`} py={20} px={20}>
				<Grid maw={`850px`} w={`100%`}>
					<Grid.Col>
						<Button disabled fullWidth>
							Калькулятор 1
						</Button>
					</Grid.Col>

					<Grid.Col span={4}>
						<Card withBorder p={15}>
							<Grid>
								<Grid.Col>
									<Card withBorder>
										<Grid gutter={1}>
											<Grid.Col>
												<Title order={3} align={`center`}>
													Участников
												</Title>
											</Grid.Col>

											<Grid.Col>
												<Title align={`center`}>5</Title>
											</Grid.Col>
										</Grid>
									</Card>
								</Grid.Col>

								<Grid.Col>
									<Card withBorder>
										<Grid gutter={1}>
											<Grid.Col>
												<Title order={3} align={`center`}>
													Позиций
												</Title>
											</Grid.Col>

											<Grid.Col>
												<Title align={`center`}>30</Title>
											</Grid.Col>
										</Grid>
									</Card>
								</Grid.Col>

								<Grid.Col>
									<Button variant={`outline`} fullWidth>
										Настроить
									</Button>
								</Grid.Col>

								<Grid.Col>
									<Button color={`red`} fullWidth>
										Удалить
									</Button>
								</Grid.Col>
							</Grid>
						</Card>
					</Grid.Col>

					<Grid.Col span={8}>
						<Card withBorder p={15} h={`100%`}>
							<Grid gutter={12}>
								<Grid.Col>
									<Title order={3} align={`center`}>
										Участники
									</Title>
								</Grid.Col>

								<Grid.Col>
									<Card withBorder mah={`248px`} p={5}>
										<ScrollArea h={250}>
											<Grid>
												<Grid.Col>
													<UnstyledButton w={`100%`}>
														<Card withBorder w={`100%`} py={5} px={10}>
															<Grid>
																<Grid.Col span={4}>
																	<Text mt={`3px`}>{formatter.format(150)}</Text>
																</Grid.Col>

																<Grid.Col span={4}>
																	<Text align={`center`} mt={`3px`}>
																		Игорь
																	</Text>
																</Grid.Col>

																<Grid.Col span={4}>
																	<Group position={`right`} spacing={0}>
																		<ActionIcon color={`dark`}>
																			<IconPencil stroke={1.3} />
																		</ActionIcon>
																		<ActionIcon color={`red`}>
																			<IconTrashXFilled stroke={1} />
																		</ActionIcon>
																	</Group>
																</Grid.Col>
															</Grid>
														</Card>
													</UnstyledButton>
												</Grid.Col>

												<Grid.Col>
													<UnstyledButton w={`100%`}>
														<Card withBorder w={`100%`} py={5} px={10}>
															<Grid>
																<Grid.Col span={4}>
																	<Text mt={`3px`}>{formatter.format(2000)}</Text>
																</Grid.Col>

																<Grid.Col span={4}>
																	<Text align={`center`} mt={`3px`}>
																		Анастасия
																	</Text>
																</Grid.Col>

																<Grid.Col span={4}>
																	<Group position={`right`} spacing={0}>
																		<ActionIcon color={`dark`}>
																			<IconPencil stroke={1.3} />
																		</ActionIcon>
																		<ActionIcon color={`red`}>
																			<IconTrashXFilled stroke={1} />
																		</ActionIcon>
																	</Group>
																</Grid.Col>
															</Grid>
														</Card>
													</UnstyledButton>
												</Grid.Col>

												<Grid.Col>
													<UnstyledButton w={`100%`}>
														<Card withBorder w={`100%`} py={5} px={10}>
															<Grid>
																<Grid.Col span={4}>
																	<Text mt={`3px`}>{formatter.format(1200)}</Text>
																</Grid.Col>

																<Grid.Col span={4}>
																	<Text align={`center`} mt={`3px`}>
																		Александр
																	</Text>
																</Grid.Col>

																<Grid.Col span={4}>
																	<Group position={`right`} spacing={0}>
																		<ActionIcon color={`dark`}>
																			<IconPencil stroke={1.3} />
																		</ActionIcon>
																		<ActionIcon color={`red`}>
																			<IconTrashXFilled stroke={1} />
																		</ActionIcon>
																	</Group>
																</Grid.Col>
															</Grid>
														</Card>
													</UnstyledButton>
												</Grid.Col>

												<Grid.Col>
													<UnstyledButton w={`100%`}>
														<Card withBorder w={`100%`} py={5} px={10}>
															<Grid>
																<Grid.Col span={4}>
																	<Text mt={`3px`}>{formatter.format(550)}</Text>
																</Grid.Col>

																<Grid.Col span={4}>
																	<Text align={`center`} mt={`3px`}>
																		Дмитрий
																	</Text>
																</Grid.Col>

																<Grid.Col span={4}>
																	<Group position={`right`} spacing={0}>
																		<ActionIcon color={`dark`}>
																			<IconPencil stroke={1.3} />
																		</ActionIcon>
																		<ActionIcon color={`red`}>
																			<IconTrashXFilled stroke={1} />
																		</ActionIcon>
																	</Group>
																</Grid.Col>
															</Grid>
														</Card>
													</UnstyledButton>
												</Grid.Col>

												<Grid.Col>
													<UnstyledButton w={`100%`}>
														<Card withBorder w={`100%`} py={5} px={10}>
															<Grid>
																<Grid.Col span={4}>
																	<Text mt={`3px`}>{formatter.format(1000)}</Text>
																</Grid.Col>

																<Grid.Col span={4}>
																	<Text align={`center`} mt={`3px`}>
																		Виктория
																	</Text>
																</Grid.Col>

																<Grid.Col span={4}>
																	<Group position={`right`} spacing={0}>
																		<ActionIcon color={`dark`}>
																			<IconPencil stroke={1.3} />
																		</ActionIcon>
																		<ActionIcon color={`red`}>
																			<IconTrashXFilled stroke={1} />
																		</ActionIcon>
																	</Group>
																</Grid.Col>
															</Grid>
														</Card>
													</UnstyledButton>
												</Grid.Col>
											</Grid>
										</ScrollArea>
									</Card>
								</Grid.Col>

								<Grid.Col>
									<Button fullWidth>Добавить</Button>
								</Grid.Col>
							</Grid>
						</Card>
					</Grid.Col>

					<Grid.Col>
						<Card withBorder>
							<Grid gutter={10}>
								<Grid.Col>
									<Title order={2} align={`center`}>
										Позиции
									</Title>
								</Grid.Col>

								<Grid.Col>
									<Divider />
								</Grid.Col>

								<Grid.Col span={4}>
									<Button fullWidth variant={`outline`}>
										Фильтр
									</Button>
								</Grid.Col>

								<Grid.Col span={4}>
									<Button fullWidth>Добавить</Button>
								</Grid.Col>

								<Grid.Col span={4}>
									<Button fullWidth variant={`outline`}>
										Сортировка
									</Button>
								</Grid.Col>

								<Grid.Col>
									<UnstyledButton w={`100%`}>
										<Card withBorder px={10} py={5}>
											<Grid>
												<Grid.Col span={4}>
													<Text mt={8}>Ананасы</Text>
												</Grid.Col>

												<Grid.Col span={4}>
													<Text align={`center`} mt={8}>
														{formatter.format(500)}
													</Text>
												</Grid.Col>

												<Grid.Col span={4}>
													<Group position={`right`}>
														<Avatar.Group>
															<Avatar>И</Avatar>
															<Avatar>А</Avatar>
															<Avatar>К</Avatar>
															<Avatar>Е</Avatar>
															<Avatar>+2</Avatar>
														</Avatar.Group>
													</Group>
												</Grid.Col>
											</Grid>
										</Card>
									</UnstyledButton>
								</Grid.Col>

								<Grid.Col>
									<UnstyledButton w={`100%`}>
										<Card withBorder px={10} py={5}>
											<Grid>
												<Grid.Col span={4}>
													<Text mt={8}>Водичка</Text>
												</Grid.Col>

												<Grid.Col span={4}>
													<Text align={`center`} mt={8}>
														{formatter.format(10000)}
													</Text>
												</Grid.Col>

												<Grid.Col span={4}>
													<Group position={`right`}>
														<Avatar.Group>
															<Avatar>И</Avatar>
															<Avatar>А</Avatar>
															<Avatar>К</Avatar>
														</Avatar.Group>
													</Group>
												</Grid.Col>
											</Grid>
										</Card>
									</UnstyledButton>
								</Grid.Col>

							</Grid>
						</Card>
					</Grid.Col>
				</Grid>
			</Flex>
		</>
	);
}
