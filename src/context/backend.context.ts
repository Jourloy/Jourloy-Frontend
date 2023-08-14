import axios from "axios";

const backendLink = process.env.NODE_ENV !== "production" 
	? "https://api-tracker.twyxify.online" 
	: "https://api-tracker.twyxify.com";

export default class BackendContext {
	public static link = backendLink;

	public static getContext(postLink?: string) {
		return axios.create({
			baseURL: this.link + `/${postLink}`,
			withCredentials: true,
		});
	}
}