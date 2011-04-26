(function() {
	
	var merchants = MERCHANT.merchants;
	
	var PaginationView = Backbone.View.extend({
		template: _.template($('#pagination-template').html()),
		el: $('#merchant-container .action #pagination-container'),
		events: {
			'keypress #merchant-container .action #page-input': 'gotoPageOnEnter',
			'click  #merchant-container .action #next': 'next',
			'click  #merchant-container .action #previous': 'previous'
		},
		initialize: function() {
			
			_.bindAll(this, 'render');

			merchants.bind('getTotalCount', this.render);
		},
		render: function() {
			this.el.html(this.template({
				totalCount: merchants.totalCount,
				totalPage: merchants.totalPage
			}));
			this.input = this.$('#page-input');
			this.input.val(merchants.currentPage);
			return this;
		},
		gotoPageOnEnter: function(e) {
			if(e.keyCode != 13) return;
			merchants.gotoPage(this.input.val());
		},
		
		next: function() {
			var nextPage = parseInt(this.input.val()) + 1;
			if(nextPage <= merchants.totalPage) {
				this.input.val(nextPage);
				merchants.gotoPage(nextPage);
			}
		},
		previous: function() {
			var prePage = parseInt(this.input.val()) - 1;
			if(prePage > 0) {
				this.input.val(prePage);
				merchants.gotoPage(prePage);
			}
		}
	});
	MERCHANT.pagination = new PaginationView;	
})();
