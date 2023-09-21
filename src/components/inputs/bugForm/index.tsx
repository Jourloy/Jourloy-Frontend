import * as Sentry from "@sentry/browser";
import * as _ from "lodash";
import {toast} from "react-toastify";
import {store} from "../../../store/store";
import {Stack, Textarea, Button, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";

type TProps = {
	onClose?: () => void;
};

export default function BugForm(props: TProps) {
	const form = useForm({
		initialValues: {
			description: ``,
			contact: ``,
		},
		validate: {
			description: value => (value.length < 10 ? `Минимум 10 символов` : null),
		},
	});

	const onSubmit = (values: {description: string, contact: string}) => {
		const eventId = Sentry.captureMessage(_.uniqueId(`Profile-FeedBack-`));

		const userFeedBack = {
			event_id: eventId,
			name: store.getState().userReducer.username,
			comments: values.description,
			email: values.contact,
		};

		Sentry.captureUserFeedback(userFeedBack);

		toast.success(`Спасибо что сообщили об ошибке`);

		form.reset();
		if (props.onClose) props.onClose();
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack>
				<Textarea
					label={`В чем проблема?`}
					placeholder={`Можешь вкратце описать действия`}
					minRows={3}
					maxRows={5}
					withAsterisk
					{...form.getInputProps(`description`)}
				/>

				<TextInput 
					label={`Для обратной связи`}
					placeholder={`EMail или Telegram`}
					{...form.getInputProps(`contact`)}
				/>

				<Button fullWidth type={`submit`}>
					Отправить
				</Button>
			</Stack>
		</form>
	);
}
