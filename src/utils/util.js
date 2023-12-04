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

/**
 * 游玩模组位运算组合验证
 * @param mod mod列表中的mod
 * @param selectMod 当前选择的mod
 * @param state 数据流
 */
export const check=(mod, selectMod,state)=> {
	let checkBits = [];// 位运算符数组
	switch (selectMod.value) {
		case "HR":
			checkBits = [
				1 << 1,// EZ
			];
			break;
		case "EZ":
			checkBits = [
				1 << 4,// HR
			];
			break;
		case "NC":
			checkBits = [
				1 << 6,// DT
				1 << 8,// HT
			];
			break;
		case "HT":
			checkBits = [
				1 << 9,// NC
				1 << 6,// DT
			];
			break;
		case "DT":
			checkBits = [
				1 << 9,// NC
				1 << 8,// HT
			];
			break;
		case "SD":
			checkBits = [
				1 << 14,// PF
				// 0,// NM
			];
			break;
		case "PF":
			checkBits = [
				1 << 5,// SD
				// 0,// NM
			];
			break;
		case "FL":
			// 仅限mania
			if (state.mode === "mania") {
				checkBits = [
					1 << 3,// HD
				];
			};
			break;
		case "HD":
			// 仅限mania
			if (state.mode === "mania") {
				checkBits = [
				1 << 18,// FL
				];
			};
			break;	
		case "NM":
			break;
    };
    // 选择NM以外的mod时
	if (selectMod.value !== "NM") {
        for (let i of checkBits) {
            // 位运算逻辑
			if (((selectMod.bit | mod.bit) & i) === i) {
                mod.disabled = true; // 匹配时禁用checkBits中值对应的mod
			}
        }
	} else {
		if (mod.value !== "NM") {
			mod.disabled = true; // 禁用NM以外的其他mod
		}
	}
}
