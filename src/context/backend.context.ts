import axios, { AxiosInstance } from "axios";

const backendLink = process.env.NODE_ENV !== "production" 
	? "https://api.jourloy.online" 
	: "https://api.jourloy.com";

export default class BackendContext {
	public context: AxiosInstance;

	constructor(path?: string) {
		let link = backendLink;
		if (path) link += `/${path}`;
		this.context = axios.create({
			baseURL: link,
			withCredentials: true,
		})
	}

	public getSource() {
		return axios.CancelToken.source();
	}
}