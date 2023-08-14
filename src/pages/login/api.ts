import axios from "axios";
import BackendContext from "../../context/backend.context";

export default class LoginAPI {
	public context = BackendContext.getContext(`/auth`);
	public source = axios.CancelToken.source();
}