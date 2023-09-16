import {Flex, Grid, Title, Text, Image, Accordion, Card, Divider} from "@mantine/core";

export default function TutorialFramework() {
	return (
		<Flex justify={`center`} py={20} px={20}>
			<Grid maw={`850px`} w={`100%`} gutter={`xl`}>
				<Grid.Col>
					<Title align={`center`}>FRAMEWORK</Title>
				</Grid.Col>

				<Grid.Col>
					<Divider />
				</Grid.Col>

				<Grid.Col>
					<Title order={2} align={`center`}>
						Часто задаваемые вопросы
					</Title>
				</Grid.Col>

				<Grid.Col>
					<Accordion variant={`separated`} radius={`md`}>
						<Accordion.Item value={`layout`}>
							<Accordion.Control>О раскладке</Accordion.Control>
							<Accordion.Panel>
								<Grid>
									<Grid.Col>
										<Text>
											Мы уделили много времени созданию той самой раскладки,
											которая будет и удобна, и поместится на клавиатуру. Наша
											команда сама работает за такой раскладкой каждый день
										</Text>
									</Grid.Col>

									<Grid.Col>
										<Text>
											Клавиатура может использовать до 5 слоев. Нулевой слой самый
											первый и он активен всегда. Первый слой мы выделили под
											разные дополнительные клавиши
										</Text>
									</Grid.Col>

									<Grid.Col>
										<Text>
											На фото ниже ты можешь посмотреть на нашу стандартную
											раскладку. Попробуй посидеть на ней недельку и привыкнуть,
											если не получится, то всегда ее можно поменять
										</Text>
									</Grid.Col>

									<Grid.Col my={`10px`}>
										<Image withPlaceholder />
									</Grid.Col>

									<Grid.Col>
										<Text>
											На нижней линии, в центре, находятся два пробела, а побокам
											от них клавиша переключения слоя. Им необязательно находится
											именно там, но так можно переключать слой и правой, и левой
											рукой
										</Text>
									</Grid.Col>

									<Grid.Col>
										<Text>
											Также ты можешь заметить, что одна клавиша без наклейки. Если
											наклеек у тебя нет, то это будет первая клавиша на третьем
											ряду. Это backspace, та самая кнопка, которая стирает
											символы. Ее копия находится под энкодером, справа сверху. Мы
											сделали это для того, чтобы можно было стирать как левой, так
											и правой рукой
										</Text>
									</Grid.Col>

									<Grid.Col>
										<Text>
											А еще ты можешь не найти буквы "Х" и "Ъ". Мы убрали их на
											другой слой, так как это самые редкие буквы, которые люди
											используют в письме за компьютером
										</Text>
									</Grid.Col>
								</Grid>
							</Accordion.Panel>
						</Accordion.Item>

						<Accordion.Item value={`layer`}>
							<Accordion.Control>О слоях</Accordion.Control>
							<Accordion.Panel>
								<Grid>
									<Grid.Col>
										<Text>Слой - это набор виртуальных значений клавиши</Text>
									</Grid.Col>

									<Grid.Col>
										<Text>
											Если нажать на клавишу с рисунком "8", то экране появится
											цифра. Это нулевой слой. Когда мы зажимаем клавишу шифт, то
											слой переключается и по нажатию на "8" будет уже не цифра, а
											символ
										</Text>
									</Grid.Col>

									<Grid.Col>
										<Text>
											Вот примерно также работает и твоя клавиатура, только вот все
											клавиши ты назнаечаешь сам
										</Text>
									</Grid.Col>

									<Grid.Col my={`10px`}>
										<Image withPlaceholder />
									</Grid.Col>
								</Grid>
							</Accordion.Panel>
						</Accordion.Item>

						<Accordion.Item value={`knob`}>
							<Accordion.Control>О энкодере</Accordion.Control>
							<Accordion.Panel>
								<Grid>
									<Grid.Col>
										<Text>
											Энкодер - это черная крутилка справа вверху на клавиатуре
										</Text>
									</Grid.Col>

									<Grid.Col>
										<Text>
											Если ее покрутить, то можно почувствовать и услышать четкие
											шаги. Один шаг - одно нажатие, а вот на какую клавишу решаешь
											ты. Мы сделали так, что на нулевом слое, то есть по
											умолчанию, он отвечает за громкость звука, а на первом слое
											им можно регулировать яркость экрана
										</Text>
									</Grid.Col>

									<Grid.Col>
										<Text>
											Если надавить на энкодер, то произойдет клик. Нам показалось,
											что это отличный способо останавливать / запускать видео или
											музыку
										</Text>
									</Grid.Col>
								</Grid>
							</Accordion.Panel>
						</Accordion.Item>

						<Accordion.Item value={`keyboard`}>
							<Accordion.Control>О компонентах на клавиатуре</Accordion.Control>
							<Accordion.Panel>
								<Grid>
									<Grid.Col>
										<Text>
											Безусловно ты заметил, что вверху есть много припаянных
											компонентов и две кнопки
										</Text>
									</Grid.Col>

									<Grid.Col>
										<Text>
											Все это можно трогать, протирать и даже заливать водой.
											Главное потом высушить хорошенько
										</Text>
									</Grid.Col>

									<Grid.Col>
										<Text>
											Две кнопки имеют более узкое предназначение и нужно для
											удаленной поддержки, если вдруг что-то пойдет не так. Просто
											так на них не стоит нажимать, но если случайно произойдет
											нажатие - не страшно
										</Text>
									</Grid.Col>
								</Grid>
							</Accordion.Panel>
						</Accordion.Item>

						<Accordion.Item value={`help`}>
							<Accordion.Control>Что делать, если нужна помощь?</Accordion.Control>
							<Accordion.Panel>
								<Grid>
									<Grid.Col>
										<Text>
											Можешь написать нам в telegram, там поможем тебе с любыми
											вопросами по поводу клавиатуры, слоев и так далее
										</Text>
									</Grid.Col>

									<Grid.Col>
										<Card withBorder>
											<Text align={`center`}>@JOURLOY</Text>
										</Card>
									</Grid.Col>
								</Grid>
							</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
				</Grid.Col>
			</Grid>
		</Flex>
	);
}
