import {Button, Paper, Text} from "@mantine/core";
import {PropsWithChildren, useEffect, useState} from "react";

type TProps = {
	onEnd: () => Promise<unknown>;
	/**
	 * Default: 2
	 */
	seconds?: number;
};

export default function DeleteButton(props: PropsWithChildren<TProps>) {
	// Initial value of progress width
	const [progress, setProgress] = useState(0);
	const [loading, setLoading] = useState(false);

	const seconds = props.seconds ? props.seconds : 2;

	// When user start touch or mouse down
	const onRemoveStart = () => {
		setProgress(100);
	};

	// When user end touch or mouse up
	const onRemoveEnd = () => {
		setProgress(0);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (progress === 100) {
				setLoading(true);
				props.onEnd().finally(() => {
					setLoading(false);
					setProgress(0);
				});
			}
		}, seconds * 1000);

		return () => {
			clearTimeout(timeout);
		};
	}, [progress]);

	return (
		<Button
			fullWidth
			color={`red`}
			variant={`outline`}
			onMouseDown={onRemoveStart}
			onMouseUp={onRemoveEnd}
			onTouchStart={onRemoveStart}
			onTouchEnd={onRemoveEnd}
			loaderPosition={`center`}
			loading={loading}
		>
			<Paper
				radius={`sm`}
				style={{
					position: `absolute`,
					width: `${progress}%`,
					backgroundColor: `#fa5252`,
					height: `100%`,
					marginLeft: `-45.5%`,
					zIndex: 50,
					transition: `all ${seconds}s ease-in-out`,
				}}
			/>
			<Text style={{zIndex: 51, color: `black`}}>Да</Text>
		</Button>
	);
}
