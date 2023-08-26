import axios, { CancelToken } from "axios";
import BackendContext from "../../context/backend.context";
import { TCalculator, TMember } from "../../types";

export default class PartyAPI {
	private context = BackendContext.getContext(`/party`);

	public getToken() {
		return axios.CancelToken.source();
	}

	/* CALCULATOR */

	public createCalculator() {
		return this.context.post(`/`, null, {withCredentials: true});
	}

	public getCalculator(token?: CancelToken) {
		return this.context.get<TCalculator>(`/`, {withCredentials: true, cancelToken: token});
	}

	/* MEMBERS */

	public createMember(calculatorId: number, name: string) {
		return this.context.post(`/member`, {calculatorId: calculatorId, name: name});
	}

	public getMembers(calculatorId: number) {
		return this.context.get<TMember[]>(`/member/all/${calculatorId}`, {withCredentials: true});
	}

	public updateMembers(props: {name?: string, avatar?: string}, memberId: number) {
		return this.context.patch(`/member/${memberId}`, props, {withCredentials: true});
	}

	public removeMember(memberId: number) {
		return this.context.delete(`/member/${memberId}`, {withCredentials: true});
	}

	public removeMembers(calculatorId: number) {
		return this.context.delete(`/member/all/${calculatorId}`, {withCredentials: true});
	}

	/* POSITIONS */

	public createPosition(data: {calculatorId: number, name: string, cost: number, memberIds?: number[]}) {
		return this.context.post(`/position`, data, {withCredentials: true});
	}
}