/**
 *首页 业务逻辑 
 */

var redPacketId;
var redPacketStatus;

//查看更多银行卡状态
document.getElementById('themoreClick').addEventListener('tap', function() {

	if($("#themore_layout").is(":visible")) {
		$("#themoreText").text("查看更多");

	} else {
		$("#themoreText").text("收起"); //如果元素为隐藏,则将它显现

	}
	$("#themore_layout").fadeToggle();
});

////城市选择
document.getElementById('citySelect2').addEventListener('tap', function() {

	//打开详情页面          
	mui.openWindow({
		id: 'city',
		url: 'city_select.html'

	});
});
/**
 * 我要办卡
 */
document.getElementById('applyCard').addEventListener('tap', function() {
	//		mui.openWindow({
	//						id: 'identity_personinfo',
	//						url: 'authenticationCard/identity_personinfo.html'
	//			
	//					});
	//					return;

	if(currentCity != null) //定位城市成功
	{
		// 获取办卡状态
		checkCardStatue()

	} else {
		mui.toast("您还未选择城市");
	}
});
/**
 * 我要提额
 */
document.getElementById('toIncrease').addEventListener('tap', function() {
	mui.openWindow({
		id: 'mention_amount',
		url: 'User/mention_amount.html'

	});

});

/**
 * 获取办卡状态
 */
function checkCardStatue() {
	var bankcard_id = localStorage.getItem(utils.bankcard_id);
	var bankcard_statue = localStorage.getItem(utils.bankcard_statue);

	var idcard_status = localStorage.getItem(utils.idcard_status);
	var credit_status = localStorage.getItem(utils.credit_status);
	//		alert(bankcard_statue)
	if(utils.isNone(bankcard_statue)) //说明是新用户没申请过卡或者已申请成功过卡
	{

		if(idcard_status == 1 && credit_status == 1) { //成功办过卡则只需要跳转个人信息登记界面 重新申请新卡
			mui.openWindow({
				id: 'identity_personinfo',
				url: 'authenticationCard/identity_personinfo.html'

			});
		} else { //第一次办理卡
			mui.openWindow({
				id: 'applyCard',
				url: 'authenticationCard/identity_face.html'

			});
		}
	} else {
		if(bankcard_statue == 2) //银行审核中
		{
			mui.toast("您的资料在银行审核中，请耐心等待");
			return;
		} else if(bankcard_statue == 0) {
			mui.toast("您还未签署合同，需签署后提交审核");
			mui.openWindow({
				id: 'identity_certificate',
				url: 'authenticationCard/identity_certificate.html?edit=1'

			});
		} else if(bankcard_statue == 3 || bankcard_statue == 4) //审核失败，需要修改
		{
			mui.openWindow({
				id: 'identity_certificate',
				url: 'authenticationCard/identity_certificate.html?edit=1'

			});
		} else if(bankcard_statue == 5) {
			mui.toast("正在分配客户经理为您处理工单");
			return;
		} else if(bankcard_statue == 6) {
			mui.toast("已分配客户经理等待现场处理");
			return;
		} else if(bankcard_statue == 7) {
			mui.toast("现场处理完成等待总行批复");
			return;
		} else { //第一次办理卡
			mui.openWindow({
				id: 'applyCard',
				url: 'authenticationCard/identity_face.html'

			});
		}
	}
}

//添加获取city自定义事件监听
window.addEventListener('getCity', function(event) {

	console.info("接受参数" + event.detail.city);
	//		  console.info(utils.obj2Str($("#citySelect")));
	$("#citySelect2").text(event.detail.city);
	currentCity = event.detail.city;
	localStorage.setItem(utils.currentCity, currentCity);

});

function updateCity(city) {

}
var pullToRefresh;
mui.ready(function() {
	pullToRefresh = mui("#home").pullToRefresh({
		down: {
			callback: function() {
				var self = this;
				//				setTimeout(function() {
				//
				////					self.endPullDownToRefresh();
				//				}, 1000);
				getHomeData(self);
			}
		},
	});
	pullToRefresh.pullDownLoading();

});

// 扩展API加载完毕后调用onPlusReady回调函数 
document.addEventListener("plusready", onPlusReady, false);
// 扩展API加载完毕，现在可以正常调用扩展API
function onPlusReady() {
	// 使用高德地图地位模块获取位置信息
	if(plus == undefined) {
		return;
	}
	plus.geolocation.getCurrentPosition(geoInf, function(e) {
		alert("获取定位位置信息失败：" + e.message);
	}, {
		geocode: true
	});
	updateSerivces();
	//检查更新
	if(!utils.isWeb()) {
		checkUpdate();
	}
}

/**
 * 获取百度地图经纬度信息
 * @param {Object} position
 */
function geoInf(position) {
	console.info(JSON.stringify(position));

	currentCity = position.address.city;
	localStorage.setItem(utils.currentCity, currentCity);
	console.info(currentCity)
	$("#citySelect2").text(currentCity);
}
/**
 * 获取主页数据
 */
function getHomeData(pullRefresh) {
	var obj = new Object();
	obj.phone = localStorage.getItem(utils.phoneNum);
	obj.userid = localStorage.getItem(utils.userId);

	utils.ajax(utils.getUrl("IndexPage"), obj, function(data) {
		pullRefresh.endPullDownToRefresh();

		if(data.code == utils.SCUESS) {
			console.info(data.data);
			var obj = JSON.parse(data.data);
			$("#recommendNum").text(obj.recommendNum);
			$("#successNum").text(obj.successNum);
			$("#recommendNum1").text(obj.recommendNum);
			$("#successNum1").text(obj.successNum);
			redPacketId = obj.redPacketId;
			redPacketStatus = obj.redPacket;
			checkhaveRedPack(obj.redPacketPrice);
			//			alert(utils.obj2Str(obj.city))
			//			utils.supportCityList =   utils.obj2Str(obj.city);
			localStorage.setItem(utils.supportCityList, utils.obj2Str(obj.city))
			//			alert(obj.bankcard_id)
			localStorage.setItem(utils.bankcard_id, obj.bankcard_id);
			localStorage.setItem(utils.bankcard_statue, obj.bankcard_statue);
			//卡状态 0-初始状态；1-审核成功；2-银行待审核中；3-人工审核失败；4-身份证信息有误 5-未分配营销人员 6-已分配营销人员等待现场处理 7-现场处理完成等待总行批复 8-已有卡 9-未开通
			if(obj.cardStatus != 8) //都属于没有卡状态
			{
				$("#noCardLayout").show();
				$("#haveCardLayout").hide();
				$("#myApplyCard").show();
				$("#myCardForehead").hide();

				if(obj.cardStatus == 9) //未开通
				{
					$("#cardTips").text("当前尚未开通")
				} else if(obj.cardStatus == 0) //0-初始化 未签署合同
				{
					$("#cardTips").html("您还未签署合同<br/>点击办卡提交资料签署")
				} else if(obj.cardStatus == 2) //2-银行待审核中
				{
					$("#cardTips").html("您的资料正在银行审核中<br/>需要1-3个工作日")
				} else if(obj.cardStatus == 3) //人工审核失败
				{
					$("#cardTips").html("人工审核失败:" + obj.statusMsg)
				} else if(obj.cardStatus == 4) //2-身份证信息有误
				{
					$("#cardTips").html("您提交的身份证信息有误("+obj.statusMsg+"),点击我要办卡重新提交")
				} else if(obj.cardStatus == 5) //5-未分配营销人员
				{
					$("#cardTips").html("正在分配客户经理为您处理工单")
				} else if(obj.cardStatus == 6) //6-已分配营销人员等待现场处理
				{
					$("#cardTips").html("已分配客户经理等待现场处理")
				} else if(obj.cardStatus == 7) //7-现场处理完成等待总行批复
				{
					$("#cardTips").html("现场处理完成等待总行批复")
				} else if(obj.cardStatus == 1) //审核成功
				{
					$("#cardTips").html("审核成功,请到银行面签领取")
				} else if(obj.cardStatus == 10) //征信黑名单
				{
					$("#cardTips").html("征信黑名单:" + obj.statusMsg)
				}
				localStorage.setItem(utils.bankcard_statue, obj.cardStatus);
			} else {
				$("#noCardLayout").hide();
				$("#haveCardLayout").show();
				$("#myCardForehead").show();
				$("#myApplyCard").hide();
				//					alert(obj.cardInfo)
				var cardInfo = JSON.parse(obj.cardInfo)
				$(cardInfo).each(function(index, val) {
					val.CARD_NO = chunk(val.CARD_NO)
					val.INTEREST_TYPE = (parseFloat(val.INTEREST_TYPE) / 365).toFixed(2);
					val.OUT_DATE = convertCardDate(val.OUT_DATE);
				});
				//				var cardInfo = obj.cardInfo;//有卡信息
				//				alert(cardInfo)
				//第一张展示
				var dataVue = new Vue({
					el: '#oneCard',
					data: {
						item: cardInfo[0]
					}
				})
				chunk(cardInfo[0].CARD_NO)
				//查看更多展示
				var moreArr = cardInfo;
				moreArr = moreArr.slice(1)
				var themoreVue = new Vue({
					el: '#themore_layout',
					data: {
						items: moreArr
					}
				})

			}

		} else {
			mui.toast(data.msg);
		}

	}, function(xhr, type, errorThrown) {
		pullRefresh.endPullDownToRefresh();
		mui.toast(errorThrown);
	})
}
/**
 * 分享好友
 */
function shareUrl() {

}
/**
 * 推荐办卡
 */
document.getElementById('recommendByCard').addEventListener('tap', function() {

	shareShow();

});
document.getElementById('recommendByCard2').addEventListener('tap', function() {

	shareShow();
});

/**
 * 更新分享服务
 */
var shares = null;

function updateSerivces() {
	if(plus == undefined)
		return;
	plus.share.getServices(function(s) {
		shares = {};
		for(var i in s) {
			var t = s[i];
			shares[t.id] = t;
		}
	}, function(e) {
		mui.toast('获取分享服务列表失败：' + e.message);
	});
}

// 打开分享

function shareShow() {
	console.info(utils.obj2Str(shares))

	if(utils.isWeb()) {
		mui.toast("分享只支持客户端");
		return;
	}

	//ios
	var shareBts = [];
	// 更新分享列表
	var ss = shares['weixin'];
	if(navigator.userAgent.indexOf('qihoo') < 0) { //在360流应用中微信不支持分享图片
		ss && ss.nativeClient && (shareBts.push({
				title: '微信朋友圈',
				s: ss,
				x: 'WXSceneTimeline'
			}),
			shareBts.push({
				title: '微信好友',
				s: ss,
				x: 'WXSceneSession'
			}));
	}

	ss = shares['qq'];
	ss && ss.nativeClient && shareBts.push({
		title: 'QQ',
		s: ss
	});
	// 弹出分享列表
	//			shareBts.length>0?plus.nativeUI.actionSheet({title:'分享',cancel:'取消',buttons:shareBts}, function(e){
	//				(e.index>0)&&shareAction(shareBts[e.index-1],true);
	//			}):plus.nativeUI.alert('当前环境无法支持分享操作!');

	$("#sharelayout").show();
	//			alert(document.body.offsetHeight)
	if($("#haveCardLayout").is(':hidden')) {
		$("#shareBg").css("height", document.body.scrollHeight)
		$(".shareContent").css("bottom", '-200px');
		$(".shareContent").show();
	} else {
		//				alert(document.body.offsetHeight);
		$("#shareBg").css("height", document.body.offsetHeight)
		$(".shareContent").css("top", document.body.offsetHeight - 200);
		$(".shareContent").show();
	}

	//			  $(".shareContent").animate({
	//				   bottom:'0px',
	//			 },500);

	document.getElementById('shareWeChat').addEventListener('tap', function() {
		shareAction(shareBts[1], true);

	});
	document.getElementById('shareFriends').addEventListener('tap', function() {
		shareAction(shareBts[0], true);

	});
	document.getElementById('shareQQ').addEventListener('tap', function() {
		shareAction(shareBts[2], true);

	});
}
/**
 * 分享操作
 * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
 * @param {Boolean} bh 是否分享链接
 */
function shareAction(sb, bh) {
	//	mui.toast('分享操作：');
	if(!sb || !sb.s) {
		mui.toast('无效的分享服务！');
		return;
	}
	var msg = {
		content: utils.share_content,
		extra: {
			scene: sb.x
		}
	};
	msg.href = utils.share_url + localStorage.getItem(utils.invite_code)
	msg.title = utils.share_title;
	msg.thumbs = ['../img/logo_min.png'];

	// 发送分享
	if(sb.s.authenticated) {
		//		mui.toast('---已授权---');
		shareMessage(msg, sb.s);
	} else {
		//		mui.toast('---未授权---');
		sb.s.authorize(function() {
			shareMessage(msg, sb.s);
		}, function(e) {

			mui.toast('认证授权失败：' + e.code + ' - ' + e.message);
		});
	}
	//			
}

/**
 * 发送分享消息
 * @param {JSON} msg
 * @param {plus.share.ShareService} s
 */
function shareMessage(msg, s) {
	//	mui.toast(JSON.stringify(msg));
	s.send(msg, function() {

		//		mui.toast('分享到"'+s.description+'"成功！');
	}, function(e) {

		//		mui.toast('分享到"'+s.description+'"失败: ');
	});
}

/**
 * 分割银行卡
 * @param {Object} str
 */
function chunk(str) {

	str = str.split("");
	var newStr = '';
	$(str).each(function(index, val) {
		if((index + 1) % 4 == 0) {
			newStr += val + "        ";
		} else {
			newStr += val
		}
	});
	return newStr
}

/**
 * 检查更新
 */
function checkUpdate() {

	var obj = new Object();
	obj.appType = mui.os.ios ? '1' : '2';
	utils.ajax(utils.getUrl("getNewAppVersion"), obj, function(data) {

		if(data.code == utils.SCUESS) {

			var result = JSON.parse(data.data)

			if(parseInt(result.vcode) > utils.code) { //有更新

				//							mui.confirm('sss', '版本更新', [ '立即下载', '取消'], function (e) {
				//							if (e.index == 0) {
				//									downloadFile(result.downUrl);
				//								}
				//
				//							});
				var btnArray = ['是', '否'];
				mui.confirm('发现新版本，是否下载？', '版本更新', btnArray, function(e) {
					if(e.index == 0) {

						downloadFile(result.down_url);
					}
				})

			}

		} else {
			mui.toast(data.msg);
		}

	}, function(xhr, type, errorThrown) {
		mui.toast(errorThrown);
	})
}

// 下载文件
function downloadFile(url) {
	if(!url) return;
	var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
		if(status == 200) { // 下载成功
			var path = d.filename;
			console.log('下载完成：' + path);
			if(~d.filename.indexOf('.apk')) {
				plus.runtime.install(path); // 安装下载的apk文件
			}
		} else {
			//				$.alert('下载失败：' + status);
			NjsPhoneApi.NotificationUtil.compProgressNotification("农商行", "下载失败");
		}
	});

	mui.toast('开始下载，您可以在通知栏中查看下载进度');
	//插件调用
	NjsPhoneApi.NotificationUtil.setNotification("农商行", "正在下载...");
	var current = 0;
	NjsPhoneApi.NotificationUtil.setProgress(current); // 插件调用 0~100
	dtask.start();
	var progress = function() {
		setTimeout(function() {
			var downSize = dtask.downloadedSize; // 已下载大小
			var totalSize = dtask.totalSize;
			if(totalSize != 0) {
				current = parseInt(downSize / totalSize * 100);
				NjsPhoneApi.NotificationUtil.setProgress(current);
				if(current >= 100) {
					NjsPhoneApi.NotificationUtil.compProgressNotification("农商行", "下载完成");
				} else {
					progress();
				}
			}
		}, 500);
	}
	progress();
}

/**
 * 检查是否有红包
 */
function checkhaveRedPack(redPacketPrice) {
	if(redPacketStatus == 1) {
		$("#showcontent").show()
		$("#moneyTips").text("恭喜您获得" + redPacketPrice + "元红包");
	}
}

/**
 * 关闭红包
 */
document.getElementById('redPackageClose').addEventListener('tap', function() {

	$("#showcontent").hide();

});

/**
 * 查看红包
 */
document.getElementById('okTips').addEventListener('tap', function() {
	var obj = new Object();
	obj.redPacketid = redPacketId;
	obj.phone = localStorage.getItem(utils.phoneNum);
	obj.userid = localStorage.getItem(utils.userId);
	dialog.showDialog()
	utils.ajax(utils.getUrl("lookRedPacket"), obj, function(data) {
		dialog.closeDialog()
		if(data.code == utils.SCUESS) {
			var result = JSON.parse(data.data)
			$("#showcontent").hide();
			mui.openWindow({
				id: 'myRedPage',
				url: 'User/myRedPage.html'

			});

		} else {
			mui.toast(data.msg);
		}

	}, function(xhr, type, errorThrown) {
		dialog.closeDialog()
		mui.toast(errorThrown);
	})

});
/**
 * 修改到期格式
 * @param {Object} date
 */
function convertCardDate(dateStr) {
	dateStr = dateStr.split("-");
	return dateStr[1] + "/" + dateStr[0].substr(dateStr[0].length - 2, 2)

}