import request from "../http/axios.js";
export function getPPM(params){
	return request("/pub/ppm",params,'get')
}