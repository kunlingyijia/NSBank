/**
 * 积分商城业务
 */
//通过Vue前端框架绑定商城主页列表
var shopHomeVue = new Vue({
	el: '#shopLayout',
	data: {
		items: []
	}
})

mui.ready(function() {



	mui("#shop").pullToRefresh({
		down: {
			callback: function() {
				var self = this;
				getShopHomeData(self);

			}
		}

	});
	//加载商城数据
	getShopHomeData(null);
	

});


		document.getElementById('shopSearch').addEventListener('tap', function() {
			
			mui.openWindow({
				id: 'search',
				url: 'shop/search.html'
		
			});
		});
	
/**
 * 商品分类点击
 * @param {Object} dom
 */
function commodityClick(dom) {
	var smallId = $(dom).attr('smallId');
	mui.openWindow({
		id: 'commodity_list',
		url: 'shop/commodity_list.html?smallId=' + smallId

	});
}

/**
 * 获取积分主页数据
 */
function getShopHomeData(pullRefresh) {
	var obj = new Object();
	obj.phone = localStorage.getItem(utils.phoneNum);
	obj.userid = localStorage.getItem(utils.userId);

	utils.ajax(utils.getUrl("ShopHome"), obj, function(data) {
		if(pullRefresh != null)
			pullRefresh.endPullDownToRefresh();

		if(data.code == utils.SCUESS) {
			var arr = JSON.parse(data.data);
		
			shopHomeVue.items = arr;

		} else {
			mui.toast(data.msg);
		}

	}, function(xhr, type, errorThrown) {
		if(pullRefresh != null)
			pullRefresh.endPullDownToRefresh();
		mui.toast(errorThrown);
	})
}