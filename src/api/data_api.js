import axios from "../http/axios.js";
export const getPPM = params => {
	return axios({
		method: 'get',
		url: "/pub/ppm",
		params
	});
};
// 获取谱面信息
export const getBeatmapInfo = params => {
	return axios({
		method: "get",
		url: `/api/info/${params}`,
	});
};
// 获取谱面bg
export const getBeatmapBg = params => {
	return axios({
		method: "get",
		url: `/api/background/${params}`,
	});
};
// 生成比赛图池
export const getMappool = params => {
	return axios({
		method: "post",
		url: `/pool?name=${params.name}`,
		data: params.data,
		responseType:'blob',
	});
};
// 投骰子
export const getDice = params => {
	return axios({
		method: "get",
		url: `/dice`,
		params
	});
};
// 玩家登录
export const getLogin = params => {
	return axios({
		method: "get",
		url: `/login`,
		params
	});
};
// 获取玩家信息
export const getUserInfo = params => {
	return axios({
		method: "get",
		url: `/info/json`,
		params
	});
};
// 获取比赛结果csv
export const getMatchCsv = params => {
	return axios({
		method: "get",
		url: `/match/rating/csv`,
		params,
	});
};