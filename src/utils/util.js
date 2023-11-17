/**
* @description 二级筛选并启用/禁用指定mod
* @param {Number} e 指定mod位置
* @param {String} modName 指定mod名字缩写
* @param {boolean} status 启用/禁用状态 true:禁用 false:启用
* @param {Object} state 数据流
* @return void
*/
export const findMod = (e, modName, status,state) => {
		state.mods?.map((item) => {
			if (item.value === modName) {
				e = state.mods.indexOf(item);//找到指定modName对象
				state.mods[e].disabled = status;
			};
		});
}
