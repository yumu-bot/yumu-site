import axios from "../http/axios.js";
export const getPPM =params=>{
	return axios({
		method: 'get',
		url:"/pub/ppm",
	   params
	})
}

export const getBeatmapInfo = params => {
	return axios.get(`https://sp.365246692.xyz/api/map/getBeatMapInfo/${params}`);
}