import axios, {CancelToken} from "axios";
import BackendContext from "../../context/backend.context";
import {TUser} from "../../types";

export default class LoginAPI {
	public context = BackendContext.getContext(`/auth`);
	public source = axios.CancelToken.source();

	public getToken() {
		return axios.CancelToken.source();
	}

	public checkUser(token: CancelToken) {
		return this.context.get<{user: TUser}>(`/tokens`, {withCredentials: true, cancelToken: token});
	}
}
