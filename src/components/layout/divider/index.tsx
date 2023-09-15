
type TProps = {
	variant?: `solid` | `dashed` | `dotted` | `double`;
	color?: `primary` | `invPrimary` | `secondary` | `accent` | `tracker`;
	label?: string;
	className?: string;
	dividerClassName?: string;
	labelClassName?: string;
	/**
	 * Need for correct blend on cards
	 *
	 * Default: false
	 */
	blendDifference?: boolean;
}

export default function Divider(props: TProps) {
	let className = `inline-flex items-center justify-center w-full`;
	className += props.blendDifference ? ` mix-blend-difference` : ``;

	let dividerClassName = `w-[100%] bg-transparent`;
	dividerClassName += props.variant ? ` ${props.variant}` : ` border-solid`;

	let labelClassName = `absolute px-3 bg-black`;

	if (!props.variant || props.variant === `solid`) dividerClassName += ` border-y-[0.5px] border-solid`;
	else if (props.variant === `dashed`) dividerClassName += ` border-y-[0.5px] border-dashed`;
	else if (props.variant === `dotted`) dividerClassName += ` border-y-[0.5px] border-dotted`;
	else if (props.variant === `double`) dividerClassName += ` border-y-[1px] border-double h-[7px]`;

	if (!props.color || props.color === `primary`) {
		dividerClassName += ` border-neutral-300 dark:border-white`;
		labelClassName += ` text-black dark:text-white`;
	} else if (props.color === `invPrimary`) {
		dividerClassName += ` dark:border-black border-white`;
		labelClassName += ` dark:text-black text-white`;
	} else if (props.color === `secondary`) {
		dividerClassName += ` border-neutral-500 dark:border-neutral-500`;
		labelClassName += ` text-neutral-500 dark:text-neutral-500`;
	} else if (props.color === `accent`) {
		dividerClassName += ` border-indigo-500 dark:border-indigo-500`;
		labelClassName += ` text-indigo-500 dark:text-indigo-500`;
	} else if (props.color === `tracker`) {
		dividerClassName += ` border-amber-500 dark:border-amber-500`;
		labelClassName += ` text-amber-500 dark:text-amber-500`;
	}

	if (props.className) className += ` ${props.className}`;
	if (props.dividerClassName) dividerClassName += ` ${props.dividerClassName}`;
	if (props.labelClassName) labelClassName += ` ${props.labelClassName}`;

	return (
		<div className={className}>
			<hr className={dividerClassName} />
			<span hidden={props.label == null} className={labelClassName}>
				{props.label}
			</span>
		</div>
	);
}
