/**
 * 我的界面
 */
initMine();
/**
 * 初始化我的界面
 */
function initMine() {

	if(!utils.isNone(localStorage.getItem(utils.headImg))) {
		$("#headurl").attr("src", localStorage.getItem(utils.headImg));
	}
	if(!utils.isNone(localStorage.getItem(utils.phoneNum))) {
		$("#userPhone").text(localStorage.getItem(utils.phoneNum));
	}
	if(!utils.isNone(localStorage.getItem(utils.username))) {
		$("#username").text("用户 " + localStorage.getItem(utils.username));
	}
	if(!utils.isNone(localStorage.getItem(utils.integral))) {
		$("#integral").text("当前积分:" + localStorage.getItem(utils.integral));
	}
}

//积分明细 integrals
document.getElementById('integralDetail').addEventListener('tap', function() {

	//打开详情页面          
	mui.openWindow({
		id: 'integral_detail',
		url: 'User/integral_detail.html'

	});
});

/**
 * 头像编辑
 */
document.getElementById('headurl').addEventListener('tap', function() {

	//打开详情页面          
	mui.openWindow({
		id: 'mine_data',
		url: 'User/mine_data.html'

	});
});

document.getElementById('integralDetailImg').addEventListener('tap', function() {

	//打开详情页面          
	mui.openWindow({
		id: 'integral_detail',
		url: 'User/integral_detail.html'

	});
});

//设置
document.getElementById('setting').addEventListener('tap', function() {
	//	utils.loginOut();
	//		//打开详情页面          
	//	  mui.openWindow({
	//	      id:'login',
	//	      url:'User/login.html'
	//	    
	//	  });
	mui.openWindow({
		id: 'setting',
		url: 'User/set.html'

	});
});

//我要办卡
document.getElementById('myApplyCard').addEventListener('tap', function() {
	if(currentCity != null) //定位城市成功
	{
		//办卡业务
		mui.openWindow({
			id: 'applyCard',
			url: 'authenticationCard/identity_face.html'

		});
	} else {
		mui.toast("您还未选择城市");
	}
});
//我的优惠券
document.getElementById('discount').addEventListener('tap', function() {
	mui.openWindow({
		id: 'discount',
		url: 'User/mine_coupons.html'

	});
});
//邀请好友 
document.getElementById('inviteFriends').addEventListener('tap', function() {
	mui.openWindow({
		id: 'inviteFriends',
		url: 'User/invite_friends.html'

	});
});

//我的消息 
document.getElementById('myMsg').addEventListener('tap', function() {
	mui.openWindow({
		id: 'myMsg',
		url: 'User/mine_message.html'

	});
});

//每日签到

document.getElementById('singned').addEventListener('tap', function() {
	var obj = new Object();
	obj.phone = localStorage.getItem(utils.phoneNum);
	obj.userid = localStorage.getItem(utils.userId);
	dialog.showDialog()
	utils.ajax(utils.getUrl("signIn"), obj, function(data) {
		dialog.closeDialog()
		if(data.code == utils.SCUESS) {
			mui.toast(data.msg);
			var newIntegral = JSON.parse(data.data).newIntegral;

			$("#integral").text('当前积分:' + newIntegral)

		} else {
			mui.toast(data.msg);
		}

	}, function(xhr, type, errorThrown) {
		dialog.closeDialog()
		mui.toast(errorThrown);
	})
});

//我的红包
document.getElementById('myRedPakge').addEventListener('tap', function() {
	mui.openWindow({
		id: 'myRedPage',
		url: 'User/myRedPage.html'

	});
});

//申请记录
document.getElementById('records').addEventListener('tap', function() {
	mui.openWindow({
		id: 'record',
		url: 'record/record.html'

	});

});
//我的订单
document.getElementById('allOrder').addEventListener('tap', function() {

	goOrder(0)
});

//待付款
document.getElementById('dfk').addEventListener('tap', function() {

	goOrder(1)
});
//待发货
document.getElementById('dfh').addEventListener('tap', function() {

	goOrder(2)
});
//待收货
document.getElementById('dsh').addEventListener('tap', function() {

	goOrder(3)
});
//待评价
document.getElementById('dpj').addEventListener('tap', function() {

	goOrder(4)
});

/**
 * 我要提额
 */
document.getElementById('myCardForehead').addEventListener('tap', function() {

	mui.openWindow({
		id: 'mention_amount',
		url: 'User/mention_amount.html'

	});
});

//帮助

document.getElementById('help').addEventListener('tap', function() {

	mui.openWindow({
		id: 'help',
		url: 'User/help.html'

	});
});

/**
 * 订单跳转
 */
function goOrder(type) {

	mui.openWindow({
		id: 'allOrder',
		url: 'order/order_list.html?type=' + type

	});

}

/**
 * 退出登录
 */
document.getElementById("loginOut").addEventListener("tap", function() {
	utils.loginOut();
	mui.openWindow({
		id: 'login',
		url: 'User/login.html'

	});
});