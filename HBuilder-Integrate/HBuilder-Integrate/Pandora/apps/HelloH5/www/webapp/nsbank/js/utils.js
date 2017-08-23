(function(w, utils) {
				utils.path = "http://106.15.52.138:8011/nsbank";
//		utils.path = "http://192.168.1.23:8082/nsbank";
		//		utils.path ="http://192.168.88.217:8080/nsbank";
//		utils.ImagePath = "http://106.14.64.21:8380/image";
	    utils.ImagePath = "http://106.15.52.138:8778/file/image";
		
		//		utils.sharePath = "http://106.14.64.21:8011/nsbank/static/page/User/friends_popularize.html?invite_code=";//分享链接
		//	utils.path ="http://10.0.2.2:8000/";
		utils.key = "1234567890!@#$%^78901234";
		utils.clientOS = "4";
		utils.SCUESS = 1;
		utils.FAIL = 0;
		utils.code = 1;//版本号
		utils.version_name='1.0.7';//版本名
		
		
		//分享设置
		utils.share_content = '推荐好友送积分';
		utils.share_title = '农商行百合卡';
		utils.share_url = 'http://106.15.52.138:8011/nsbank/static/page/User/friends_popularize.html?invite_code=';
		utils.share_thumbs = ['http://7xixj2.com1.z0.glb.clouddn.com/120.png'];
		utils.pictures = ['_www/logo.png'];
		//缓存配置信息key
		utils.keyGesture = "keyGesture"; //手势密码key
		utils.userId = "userId"; //用户id
		utils.pwd = "pwd"; //密码  des3  加密保存
		utils.phoneNum = "phoneNum"; //手机号码
		utils.blacklist_user = "blacklist_user"; //是否属于黑名单失信用户  1是未判断  2-农商行黑名单用户  3-第三方征信平台黑名单用户  4-诚信用户
		utils.integral = "integral"; //积分
		utils.username = "username"; //用户名
		utils.headImg = "headImg";
		utils.fingerprint = "fingerprint"; //1 开启指纹  0 关闭指纹
		utils.switchGesture = "switchGesture"; //1 开启手势  0 关闭手势
		utils.isFirstSettingLocalPwd = "isFirstSettingLocalPwd"; //1 初始化设置过手势、指纹  0 初始化没设置过手势、指纹
		utils.bankcard_id = "bankcard_id"; //lily_card_apply表，如果该用户有正在审核或未通过的百合卡，则返回改表主键id
		utils.bankcard_statue = "bankcard_statue"; //lily_card_apply的statue字段 申请状态：0-初始状态；1-审核成功；2-银行待审核中；3-人工审核失败；4-身份证信息有误例子
		utils.idcard_status = "idcard_status"; //身份认证状态：0-未认证；1-已认证；2-待审核；3-认证失败
		utils.credit_status = "credit_status"; //征信认证状态：0-未认证；1-已认证；2-待审核；3-农商行黑名单；4-第三方征信黑名单；
		utils.redPacketId = "redPacketId"; //红包id
		utils.redPacketStatus = "redPacketStatus"; //红包状态 1-未查看


		utils.currentCity = ''; //当前定位城市
		utils.qqOpenId = "qqOpenId"; //qqopenId
		utils.wechatOpenId = "wechatOpenId"; //微信openId
		utils.receiverAddress = "receiverAddress"; //收货地址jsonobj  
		utils.receiverAddressEdit = "receiverAddressEdit"; //当前编辑的收货地址jsonobj  
		utils.commodityInfo = "commodityInfo"; //商品信息
		utils.supportCityList = "supportCityList"; //支持城市列表 json

		utils.invite_code = 'invite_code'; //推荐码
		utils.msgTitle = 'msgTitle'; 
		utils.msgContent = 'msgContent'; 

		//地址配置
		var urls = {
			RegUer: '/User/register.do',
			//      Login: '/user/login.do',
			Login: '/User/login.do',
			FaceAuth: '/Authentication/faceDetect.do',
			IndexPage: '/Pager/getIndexPage.do',
			ShopHome: '/ShopClassify/getShopClassify.do',
			identityAuthentication: '/Authentication/identityAuthentication.do',
			realNameVerify: '/Authentication/realNameVerify.do',
			LilyCardApply: '/LilyCardApply/commitBankCardApply.do',
			queryIdentityInfo: '/Authentication/queryIdentityInfo.do',
			queryBankCardInfo: '/LilyCardApply/queryBankCardInfo.do',
			sendMobileCode: '/MobileVerifyCode/sendMobileCode.do',
			getCommodityListByClassity: '/Commodity/getCommodityListByClassity.do', //商城分类列表
			getCommodityDetail: '/Commodity/getCommodityDetail.do', //商品详情
			getDiscountTicket: '/DiscountTicket/getDiscountTicket.do', //领取优惠券
			queryCanUseDiscountTicket: '/DiscountTicket/queryCanUseDiscountTicket.do', //查询优惠券信息
			disposeReceiverAddress: '/ReceiverAddress/disposeReceiverAddress.do', //新增收货地址
			placeAnOrder: '/CommodityOrder/placeAnOrder.do', //下单
			queryReceiverAddress: '/ReceiverAddress/queryReceiverAddress.do', //收货地址列表
			OrderPaying: '/CommodityOrder/orderPaying.do', //订单支付
			deleteReceiverAddress: '/ReceiverAddress/deleteReceiverAddress.do', //删除收货地址
			getCommodityOrderList: '/CommodityOrder/getCommodityOrderList.do', //订单
			receiveOrEstimate: '/CommodityOrder/receiveOrEstimate.do', //确认收货
			queryUserDiscountTicket: '/DiscountTicket/queryUserDiscountTicket.do', //优惠券领取
			alterUserInfo: '/User/alterUserInfo.do', //修改个人信息
			alterMobile: '/User/alterMobile.do', //修改手机号
			alterPassWord: '/User/alterPassWord.do', //修改密码
			signIn: '/SigninRecord/signIn.do', //每日签到
			reCommendCollect: '/IntegralRecommend/reCommendCollect.do', //邀请好友汇总数
			directFriendInfo: '/IntegralRecommend/directFriendInfo.do', //直接推荐好友列表
			queryCommoditys: '/Commodity/queryCommoditys.do', //搜索商品
			commitSuggestion: '/Suggestion/commitSuggestion.do', //意见反馈
			queryBindBankCards: '/Authentication/queryBindBankCards.do',
			bindBankCard: '/Authentication/bindBankCard.do', //绑定银行卡
			bindDrivingLicense: '/Authentication/bindDrivingLicense.do', //车主认证
			bindAccumulationFund: '/Authentication/bindAccumulationFund.do', //公积金
			
			

			queryIntegralRecordCollect: '/IntegralRecord/queryIntegralRecordCollect.do', //积分明细
			queryRedPackets: '/RedPacket/queryRedPackets.do', //查询红包
			queryMyMsg: '/MsgPush/queryMyMsg.do', //查询信息
			reapRedPacket: '/RedPacket/reapRedPacket.do', //领取红包
			getNewAppVersion:'/AppVersion/getNewAppVersion.do',//获取版本更新
			findIDCardCreditCarerAfundQQWechatWeibo:'/Authentication/findIDCardCreditCarerAfundQQWechatWeibo.do',//我要提额
			lookRedPacket:'/RedPacket/lookRedPacket.do',//查看红包
			queryBankCardApply:'/LilyCardApply/queryBankCardApply.do',//查询申请卡记录
			lookRedPacketDeposit:'/RedPacketDeposit/lookRedPacketDeposit.do',//提现记录
			forgetPassword:'/User/forgetPassword.do',//忘记密码
		}
		//获取访问地址
		utils.getUrl = function(key) {
			if(mui.os.ios) { //app
				this.clientOS = "1";
			} else if(mui.os.android) {
				this.clientOS = "2";
				/*if(typeof plus == 'undefined'){
					return urls[key];
				}*/
			} else { //web
				this.clientOS = "3";
			}
			return(this.path + urls[key]);
		}

		/**
		 * 网络请求
		 * @param {Object} url
		 * @param {Object} param
		 * @param {Object} callback
		 * @param {Object} errorback
		 */
		utils.ajax = function(url, param, callback, errorback) {
			console.log(this.obj2Str(param));

			var jsonPost = this.obj2Str(param)
			//解决des3要求原文必须是8的整数倍
			while(jsonPost.length % 8 != 0) {
//				for(var i = 0; i < 8 - (jsonPost.length % 8); i++) {
					jsonPost += " ";
//				}
			}

			var des3en = DES3.encrypt(this.key, jsonPost);
			console.log(url);
			console.log("加密后 " + des3en);
			console.log(JSON.stringify(des3en));
			// 		regInfo = {data:des3en};
			mui.ajax(url, {
				type: 'POST',
				headers: {
					'Content-Type': 'application/json'
					//			        'Content-Type': 'application/x-www-form-urlencoded'
				},
				timeout: 15000, //15秒超时
				dataType: 'json', //服务器返回json格式数据
				data: JSON.stringify(des3en),
				//				data: des3en,
				//			    data: {
				//			        'data': 'OxIrjcvCBSFZ//v5nN1B9+TF6LDadEbNNK258CCqHp+uagZGo4T0WU0Z9HHbPkG6sQXro1mJb9pz3x4v/raP5ygcrEjHdhvSXdGIFWWqWIc='
				//			  
				//			    },
				timeout: 15000, //超时时间设置为10秒；

				success: function(data) {
					//服务器返回响应，根据响应结果，分析是否登录成功；
					//				console.log(data);
					console.log(utils.obj2Str(data));
					//				data = JSON.parse(data);

					var result = '';
//					alert(data.data)
					if(data.data != '' && data.data!=undefined) {

						result = DES3.decrypt(utils.key, data.data);
						console.info("开始解密" + result);
					}
					data.data = result
					console.log("解密后：" + utils.obj2Str(data));
					callback(data)

				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					//				console.log(utils.obj2Str(xhr));
					if(xhr.status == 200) {
						alert(200);
						var result = DES3.decrypt(utils.key, xhr.response);
						console.info(result);
						callback(JSON.parse(result));
					} else {
						errorback(xhr, type, errorThrown);
					}

				}
			});
		}

		//把对象转成json串
		utils.obj2Str = function(args) {
			return JSON.stringify(args);
		}

		//判断是否为空
		utils.isNone = function(data) {
			if(data == "" || data == undefined || data == "undefined" || data == "null" || data == null) {
				return true;
			} else {
				return false;
			}
		}
		//把空变空串
		utils.notNone = function(data) {
			if(data == "" || data == undefined || data == "undefined" || data == "null" || data == null) {
				return '';
			} else {
				return data;
			}
		}

		//判断是否是网页
		utils.isWeb = function() {
			//			if(mui.os.ios || mui.os.android) {
			//
			//				return false;
			//			} else {
			//				return true;
			//			}
			if(navigator.userAgent.indexOf('Html5Plus') > -1) {
				return false;
			} else {
				return true
			}
		}

		//获取年月
		utils.getTimeWithMounth = function() {
			var now = new Date();
			var monthn = now.getMonth() + 1;
			var yearn = now.getFullYear();
			if(monthn < 10) {
				return yearn + "-0" + monthn;
			} else {
				return yearn + "-" + monthn;
			}

		}

		//退出登录
		utils.loginOut = function() {

			localStorage.removeItem(utils.userId);
			localStorage.removeItem(utils.headImg);
			localStorage.removeItem(utils.phoneNum);
			localStorage.removeItem(utils.blacklist_user);
			localStorage.removeItem(utils.integral);
			localStorage.removeItem(utils.username);
			localStorage.removeItem(utils.fingerprint);
			localStorage.removeItem(utils.switchGesture);
			localStorage.removeItem(utils.isFirstSettingLocalPwd);
			localStorage.removeItem(utils.keyGesture);
			
		}

		/**
		 * 拍照
		 */
		utils.takePhoto = function(callBack) {

			var cmr = plus.camera.getCamera();
			cmr.captureImage(function(p) {
//				alert()
				plus.io.resolveLocalFileSystemURL(p, function(entry) {
					console.info(entry.name);
					utils.commpressImg(p, entry.name, callBack);
				}, function(e) {
					alert('读取拍照文件错误：' + e.message);
				});
			}, function(e) {
//				alert('失败：' + e.message);
			});

		}
		//压缩图片
		utils.commpressImg = function(srcPath, fileName, callBack) {
			var nameArr = fileName.split(".");
			console.info(nameArr)
			var finalName = nameArr[0] + "conpress." + nameArr[1]
			finalName = "_doc/" + finalName;
			 if(mui.os.android)
			 {
			 	finalName ="commpress/"+fileName;
			 }

			plus.zip.compressImage({
					src: srcPath,
					//					dst:"commpress/"+fileName,
					dst: finalName,
					quality: 80,
					width: "50%"
				},
				function() {
					console.info("Compress success!");
					var file = new Object();
					file.name = fileName;
					file.path = finalName;
					callBack(file);

				},
				function(error) {
					alert("图片压缩失败");
				});

		}
		//上传图片服务器
		utils.uploadImg = function(callBack, file) {
			var task = plus.uploader.createUpload(utils.ImagePath, {
					method: "POST",
					timeout:8,
				},
				function(t, status) {
					if(status == 200) {
						dialog.closeDialog();
						console.info(t.responseText)
						
						var imgurl = JSON.parse(t.responseText)[0];
						callBack(imgurl);

					} else {
						dialog.closeDialog()
						if(status==null)
						status=""
						alert("图片上传失败：" + status);

					}
				}
			);
			task.addFile(file.path, {
				file: file.name
			});
			task.start();
		}

		utils.selectImg = function(callBack) {
			plus.gallery.pick(function(p) {
				console.info(p);
				dialog.showDialog();
				var file = new Object();
				file.name = 'fileName';
				file.path = p;
				utils.uploadImg(callBack, file);
			});
		}

		/**
		 * 获取url地址后面的参数
		 * @param {Object} name
		 */
		utils.GetQueryString = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return unescape(r[2]);
			return '';
		}

	}
	(window, window.utils = {}));

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
		dialog.showDialog = function() {
			if(utils.isWeb()) {

			} else {
				mui.plusReady(function() {
					if(plus != undefined)
					waitDialog = plus.nativeUI.showWaiting("正在加载，请等待...");
				});
			}

			//			if(mui.os.android || mui.os.ios) {
			//				
			//
			//			} else {
			//
			//			}
			//	$("body").append('<div id="bg_mask"  ></div><div id="preloader5"></div>');
			//	document.getElementById("bg_mask").addEventListener("tap", function() {
			//			
			//				dialog.closeDialog();
			//		});
		}

		/**
		 * 关闭弹出框
		 */
		dialog.closeDialog = function() {
			//	$("#bg_mask").remove();
			//		$("#preloader5").remove();
			if(!utils.isWeb()) {
			
				if(waitDialog != null)
				{
						
//					mui.plusReady(function() {
//						if(plus != undefined)
//						waitDialog.close();
//					});
//						if(plus != undefined)
						waitDialog.close();
				}
				
			}
			//			if(mui.os.android || mui.os.ios) {
			//				if(waitDialog != null)
			//					waitDialog.close();
			//			}

		}

	}
	(window, window.dialog = {}));