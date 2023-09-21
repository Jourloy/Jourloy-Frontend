import BackendContext from "../../context/backend.context";

export default class DarkAPI extends BackendContext {
	constructor() {
		super(`/dark`);
	}
}