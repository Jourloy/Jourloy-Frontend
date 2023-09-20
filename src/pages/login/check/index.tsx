import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";
import {userActions} from "../../../store/features/user.slice";
import {store} from "../../../store/store";

export default function Check() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		const success = searchParams.get(`success`);
		const avatar = searchParams.get(`avatar`);
		const username = searchParams.get(`username`);
		const role = searchParams.get(`role`);

		if (username) store.dispatch(userActions.changeUsername(username));
		if (avatar) store.dispatch(userActions.changeAvatar(avatar));
		if (role) store.dispatch(userActions.changeRole(role));

		if (success) {
			navigate(`/`);
			store.dispatch(userActions.login());
			toast.success(`Авторизация прошла успешно`);
		} else {
			navigate(`/login`);
			toast.error(`Произошла ошибка, попробуй еще раз`);
		}
	});

	return <></>;
}
