import {useEffect, useState} from "react";
import {motion, useScroll} from "framer-motion";
import {IconMouse} from "@tabler/icons-react";
import {Flex, Text} from "@mantine/core";

type TProps = {
	pos?: number;
	label?: string;
};

export default function ScrollHint(props: TProps) {
	const {scrollYProgress} = useScroll();
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		scrollYProgress.on(`change`, d => setScrollPosition(d));
	}, []);

	return (
		<motion.div style={{opacity: -(scrollPosition - (props.pos ? props.pos : 0.9))}}>
			<Flex>
				<IconMouse stroke={1} color={`rgb(115 115 115)`}/>
				<Text color={`dimmed`}>{props.label ? props.label : `Скролл чтобы узнать больше`}</Text>
			</Flex>
		</motion.div>
	);
}
