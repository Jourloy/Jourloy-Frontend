import {PropsWithChildren} from "react";

type TProps = {
	className?: string;
};

export default function Card(props: PropsWithChildren<TProps>) {
	let className = `${props.className} w-full h-full border border-1 rounded-md p-5`;

	// Ligth
	className += ` border-neutral-200`;

	// Darl
	className += ` dark:border-neutral-800`;

	return <div className={className}>{props.children}</div>;
}
