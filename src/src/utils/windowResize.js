function windowResize() {
	const browerWidth = window.innerWidth; //浏览器可视宽度
	const baseWidth = 1920; //设计稿宽度
	const zoomValue = browerWidth / baseWidth; //缩放比例计算
	document.getElementById("mainContainer").style.transform = "scale(" + zoomValue + "," + zoomValue + ")"; //mainContainer为主容器id
	window.onresize = function () { //窗口尺寸变化时，重新计算和缩放
		browerWidth = window.innerWidth;
		zoomValue = browerWidth / baseWidth;
		document.getElementById("mainContainer").style.transform = "scale(" + zoomValue + "," + zoomValue + ")";
	}
	console.log(1);
}

// export default windowResize;