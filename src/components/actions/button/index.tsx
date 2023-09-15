"use client";

import {PropsWithChildren} from "react";
import {motion} from "framer-motion";
import { useRouter } from "next/navigation";

type TProps = {
	/**
	 * Default: `filled`
	 */
	variant?: `filled` | `outline` | `invisible`;

	/**
	 * Default: `button`
	 */
	type?: `button` | `submit` | `reset`;

	/**
	 * Default: `square`
	 */
	form?: `circle` | `pill` | `square`;

	/**
	 * Default: `primary`
	 */
	color?: `primary` | `white` | `red` | `green` | `orange`;

	/**
	 * Default: false
	 */
	compact?: boolean;

	/**
	 * Default: false
	 */
	disabled?: boolean;

	/**
	 * Default: false
	 */
	glass?: boolean;

	/**
	 * Default: fit-content
	 */
	width?: string;

	className?: string;
	onClick?: () => void;
	redirect?: string;
};

export default function Button(props: PropsWithChildren<TProps>) {
	const router = useRouter();

	const variant = props.variant || `filled`;
	const type = props.type || `button`;
	const form = props.form || `square`;
	const color = props.color || `primary`;
	const compact = props.compact || false;
	const width = props.width || `fit-content`;

	let className = `${props.className} inline-flex items-center p-1 text-sm font-medium text-center`;
	// text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
	if (variant === `filled`) {
		className += ``;

		if (color === `primary`) {
			// Light
			className += ` text-white bg-black`;

			// Light | Hover
			className += ` hover:bg-neutral-800`;

			// Dark
			className += ` dark:text-black dark:bg-white`;

			// Dark | Hover
			className += ` dark:hover:bg-neutral-200`;
		}
	} else if (variant === `outline`) {
		className += ` border bg-transparent`;

		if (color === `primary`) {
			// Light
			className += ` text-black border-black`;

			// Light | Hover
			className += ` hover:bg-neutral-200`;

			// Dark
			className += ` dark:text-white dark:border-white`;

			// Dark | Hover
			className += ` dark:hover:bg-neutral-800`;
		}
	} else if (variant === `invisible`) {
		// Light
		className += ` text-black bg-transparent`;

		// Light | Hover
		className += ` hover:bg-neutral-200`;

		// Dark
		className += ` dark:text-white dark:bg-transparent`;

		// Dark | Hover
		className += ` dark:hover:bg-neutral-800`;
	}

	if (form === `circle`) {
		className += ` rounded-full`;
	} else if (form === `pill`) {
		className += ` rounded-xl`;
	} else if (form === `square`) {
		className += ` rounded-md`;
	}

	if (!compact) {
		className += ` px-5 py-2`;
	}

	const onClick = () => {
		if (props.disabled) return;

		if (props.onClick) {
			props.onClick();
		}

		if (props.redirect) {
			router.push(props.redirect);
		}
	}

	return (
		<motion.button
			type={type}
			className={className}
			whileTap={{scale: props.disabled ? 1 : 0.9, transition: {duration: 0.1}}}
			style={{
				width: width,
			}}
			onClick={onClick}
		>
			{props.children}
		</motion.button>
	);
}
