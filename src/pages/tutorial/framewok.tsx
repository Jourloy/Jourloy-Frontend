import {
	Flex,
	Grid,
	Title,
	Text,
	Image,
	Accordion,
	Card,
	Divider,
	Button,
	Center,
	Skeleton,
	Stack,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import {Suspense} from "react";
import {useNavigate} from "react-router-dom";

export default function TutorialFramework() {
	useDocumentTitle(`Framework`);
	
	const navigate = useNavigate();
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
						Как использовать
					</Title>
				</Grid.Col>

				<Grid.Col>
					<Text align={`center`}>
						Мы позаботились о твоем времени, а потому перед отправкой подготовили клавиатуру
						к использованию, все что нужно - вставить Type-C провод, который шел в комплекте
						в клавиатуру и компьютер.
					</Text>
				</Grid.Col>

				<Grid.Col>
					<Divider />
				</Grid.Col>

				<Grid.Col>
					<Title order={2} align={`center`}>
						Как настраивать
					</Title>
				</Grid.Col>

				<Grid.Col>
					<Text align={`center`}>
						И это еще не все возможности, которые тебе доступны. Чтобы изменить любой слой по
						своему желанию нужно скачать программу. Мы рекомендуем скачивать
						<Text component={`span`} inherit>
							<a
								href={`https://get.vial.today`}
								target={`_blank`}
								style={{textDecoration: `none`}}
							>
								<Text component={`a`} color={`red`}>
									{" "}
									Vial
								</Text>
							</a>
						</Text>
						. У этой программы не современный интерфейс, но она дает больше возможностей, чем
						аналогичные.
					</Text>
				</Grid.Col>

				<Grid.Col>
					<Text align={`center`}>
						Предлагаем немного разобраться в том, как использовать эту программу. Как только
						ты ее откроешь, убедись, что клавиатура подключена к ноутбуку или компьютеру.
						Если клавиатура подключена, то ты увидите примерно вот такой интерфейс.
					</Text>
				</Grid.Col>

				<Grid.Col mt={`-15px`}>
					<Text align={`center`} color={`dimmed`} size={`sm`}>
						Возможно, что программа при первом запуске не определит клавиатуру. Для этого
						нажми file -{`>`} Download VIA definitions
					</Text>
				</Grid.Col>

				<Grid.Col>
					<Image
						src={`https://s.jourloy.com/web-images/FrameworkVial.png`}
						style={{maxWidth: `880px`, width: `100%`}}
					/>
				</Grid.Col>

				<Grid.Col>
					<Text align={`center`}>
						Обрати внимание сразу на пробел. Если он у тебя такой же неразделенный, то вверху
						выбери вкладку Layout, а там переключи раскладку на Grid, как на картинке ниже.
					</Text>
				</Grid.Col>

				<Grid.Col>
					<Image
						src={`https://s.jourloy.com/web-images/FrameworkVial1.png`}
						style={{maxWidth: `880px`, width: `100%`}}
					/>
				</Grid.Col>

				<Grid.Col>
					<Text align={`center`}>
						Далее можешь вернуться на вкладку Keymap. Тут ты настраиваешь своб собственную
						раскладку. На самом деле все просто, Layer - текущий выбранный слой. Нулевой слой
						это тот, который активен всегда, он самый первый и для него не нужно зажимать
						никаких клавиш.
					</Text>
				</Grid.Col>

				<Grid.Col>
					<Text align={`center`}>
						Если хочешь поменять какую-нибудь клавишу, то просто нажимаете на нее и внизу
						выбираешь ту, на которую хочешь заменить.
					</Text>
				</Grid.Col>

				<Grid.Col>
					<Center>
						<Card
							withBorder
							shadow={`md`}
							style={{
								maxWidth: `500px`,
							}}
						>
							<Stack>
								<Text>
									Если нужно поменять клавиши на клавиатуре местами, то советуем
									воспользоваться keycap puller, который мы положили в комплект. Вставь
									его сверху в клавишу и потяни на себя. А когда будешь ставить клавишу
									на место, то положи ее сверху на свич и надави.
								</Text>
								<Suspense fallback={<Skeleton height={262} radius={5} />}>
									<Image
										src={`https://s.jourloy.com/web-images/keycapSwitch.gif`}
										style={{
											maxWidth: `880px`,
											width: `100%`,
										}}
										withPlaceholder
										radius={5}
									/>
								</Suspense>
								<Text color={`dimmed`} align={`center`} size={`sm`}>
									Клавиатуру необязательно отключать, но стоит, чтобы случайно не
									нажать на клавишу
								</Text>
							</Stack>
						</Card>
					</Center>
				</Grid.Col>

				<Grid.Col>
					<Text align={`center`}>
						Для настройки энкодера, в приложении, справа от клавиатуры, есть 3 квадратика.
						Первый отвечает за нажатие на энкодер, второй за поворот по часовой стрелке, а
						третий за поворот против часовой стрелки. 1 шаг поворота симулирует 1 нажатие на
						кнопку. Так, например, если ты назначишь букву А, то с каждым шагом при повороте
						будет вставляться одна буква А.
					</Text>
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
										<Image
											withPlaceholder
											src={`https://s.jourloy.com/web-images/DefaultLayout.png`}
										/>
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
											клавиши ты назначаешь сам
										</Text>
									</Grid.Col>

									<Grid.Col my={`10px`}>
										<Image
											withPlaceholder
											src={`https://s.jourloy.com/web-images/LayerExample.png`}
										/>
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
											Можешь написать нам в telegram или на почту, там поможем тебе
											с любыми вопросами по поводу клавиатуры, слоев и так далее
										</Text>
									</Grid.Col>

									<Grid.Col>
										<Card withBorder>
											<Text align={`center`}>@JOURLOY</Text>
										</Card>
									</Grid.Col>

									<Grid.Col>
										<Divider />
									</Grid.Col>

									<Grid.Col>
										<Card withBorder>
											<Text align={`center`}>support@jourloy.com</Text>
										</Card>
									</Grid.Col>
								</Grid>
							</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
				</Grid.Col>

				<Grid.Col>
					<Divider />
				</Grid.Col>

				<Grid.Col>
					<Button fullWidth onClick={() => navigate(`/keyboard`)}>
						На страницу клавиатуры
					</Button>
				</Grid.Col>
			</Grid>
		</Flex>
	);
}
