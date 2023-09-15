import Button from "@/components/actions/button";
import Card from "@/components/data display/card";
import Divider from "@/components/layout/divider";
import {IconBrandDiscord, IconBrandGithub, IconBrandTwitch} from "@tabler/icons-react";
import Image from "next/image";

export default function Home() {
	return (
		<main className="flex p-[20px] justify-center">
			<div className={`grid grid-cols-12 w-full max-w-[850px] gap-5`}>
				<div className={`col-span-12 md:col-span-4`}>
					<Image
						src={`https://s.jourloy.com/web-images/me.png`}
						alt={`Me :)`}
						width={300}
						height={300}
						className={`rounded-md`}
					/>
				</div>

				<div className={`col-span-12 md:col-span-8`}>
					<Card className={`grid content-center`}>
						<div className={`grid grid-cols-1 place-items-center w-full`}>
							<h1 className={`text-center text-[50px]`}>✌️ Это я ✌️</h1>
							<Divider className={`px-[20px] my-[10px]`} />
							<p>Мужчина, муж, брат, сын, программист и просто хороший человек</p>
							<div className={`flex space-x-3 mt-[15px]`}>
								<a href={`https://discord.gg/PB8rdcXyRR`}>
									<Button form={`circle`} variant={`invisible`} compact>
										<IconBrandDiscord color={`#5865F2`} />
									</Button>
								</a>

								<a href={`https://twitch.tv/jourloy`}>
									<Button form={`circle`} variant={`invisible`} compact>
										<IconBrandTwitch color={`#6441A4`} />
									</Button>
								</a>

								<a href={`https://github.com/jourloy`}>
									<Button form={`circle`} variant={`invisible`} compact>
										<IconBrandGithub />
									</Button>
								</a>
							</div>
						</div>
					</Card>
				</div>

				<Divider className={`col-span-12`} />

				<Card className={`grid content-center col-span-12`}>
					<div className={`grid grid-cols-2 place-items-center w-full gap-5`}>
						<h2 className={`col-span-2 text-[40px]`}>Мои проекты</h2>
						<Button className={`col-span-2 md:col-span-1`} width={`100%`} redirect={`/tracker`}>
							<p className={`text-center w-full`}>
								Трекер
							</p>
						</Button>
						<Button className={`col-span-2 md:col-span-1`} width={`100%`} redirect={`/keyboard`}>
							<p className={`text-center w-full`}>
								Клавиатура
							</p>
						</Button>
					</div>
				</Card>

				<Card className={`grid content-center col-span-12`}>
					<div className={`grid grid-cols-1 place-items-center w-full gap-5`}>
						<h2 className={`text-[40px]`}>Инструменты</h2>
						<Button width={`100%`} redirect={`/party`}>
							<p className={`text-center w-full`}>
								Party калькулятор
							</p>
						</Button>
					</div>
				</Card>
			</div>
		</main>
	);
}
