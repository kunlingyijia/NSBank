/**
 * power By  Tony Lee
 * @param {Object} w
 * @param {Object} dialog
 */
(function(w, dialog) {
var waitDialog = null;
/**
 * 显示弹出
 */
dialog.showDialog=function(){
	
	if(mui.os.android || mui.os.ios)
	{
		mui.ready(function(){
			waitDialog = plus.nativeUI.showWaiting("正在加载，请等待...");
		});
		
	}
//	$("body").append('<div id="bg_mask"  ></div><div id="preloader5"></div>');
//	document.getElementById("bg_mask").addEventListener("tap", function() {
//			
//				dialog.closeDialog();
//		});
}

/**
 * 关闭弹出框
 */
dialog.closeDialog=function(){
//	$("#bg_mask").remove();
//		$("#preloader5").remove();
	if(mui.os.android || mui.os.ios)
	{
			if(waitDialog !=null)
			waitDialog.close();
	}

}

		
}
(window, window.dialog = {}));