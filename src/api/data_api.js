import axios from "../http/axios.js";
export const getPPM =params=>{
	return axios({
		method: 'get',
		url:"/pub/ppm",
	   params
	})
}