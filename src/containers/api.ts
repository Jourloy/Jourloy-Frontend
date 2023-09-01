import axios, { CancelToken } from "axios";
import BackendContext from "../context/backend.context";

export default class LayoutAPI {
	public context = BackendContext.getContext(`/auth`);
	public source = axios.CancelToken.source();

	public getToken() {
		return axios.CancelToken.source();
	}

	public 

	public logout() {
		return this.context.get(`/logout`);
	}
}