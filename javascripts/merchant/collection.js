(function() {
	
	var Merchant = Backbone.Model.extend({
		url: function() {
			return '/ci/api/merchant';
		}
	});
	
	MERCHANT.Merchant_Model = Merchant;
	console.log(Merchant);

	var MerchantList = Backbone.Collection.extend({
		model: Merchant,
		initialize: function() {
			this.limit = 2;
			this.currentPage = 1;
			this.bind('refresh', this.getTotalCount);
			this.bind('refresh', notifier.clear);
		},
		

		url: function() {
			notifier.notify(Notifications.LOADDING);
			return '/ci/api/merchants' + 
				   '/page/' + this.currentPage + 
				   '/limit/'+ this.limit + 
				   '/status/' + this.status +
				   '/acquirer/' + this.acquirer +
				   '/format/json';
		},
		gotoPage: function(page) {
			this.currentPage = page;
			this.fetch();
		},
		byAcquirer: function(acquirer) {
			this.acquirer = acquirer;
			this.fetch();
		},
		byStatus: function(status) {
			this.status = status;
			this.fetch();
		},
		
		getTotalCount: function() {
			var that = this;
			$.getJSON('/ci/api/merchants/action/get_count' + '/status/' + this.status + '/acquirer/' + this.acquirer + '/format/json', function(res) {
				that.totalCount = res[0].count
				that.totalPage = Math.ceil(that.totalCount / that.limit);
				that.trigger('getTotalCount');
			});
		},
	});
	
	MERCHANT.merchants = new MerchantList;	
})();
