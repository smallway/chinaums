(function() {
	/************************************************************************
	 * Sidebar
	 ***********************************************************************/
	var HomeSidebar = Backbone.View.extend({
		el: $('#merchant-container .sidebar'),
		template: _.template($('#merchant-home-sidebar-template').html()),
		initialize: function() {
			this.el.html(this.template({}));
		}
	});
	new HomeSidebar;
	/************************************************************************
	 * each row is a Merchant model
	 ***********************************************************************/
	var Merchant = Backbone.Model.extend({
		
	});

	/************************************************************************
	 * merchant models list
	 ***********************************************************************/	
	var MerchantList = Backbone.Collection.extend({
		model: Merchant,
		limit: 2,
		currentPage: 1,
		initialize: function() {
			this.bind('refresh', this.getTotalCount);
		},

		url: function() {
			return '/ci/api/merchants/page/' + this.currentPage + '/limit/'+ this.limit + '/format/json';
		},
		gotoPage: function(page) {
			this.currentPage = page;
		},
		byAcquirer: function(acquirer) {
			
		},
		byStatus: function(status) {
			
		},
		
		getTotalCount: function() {
			var that = this;
			$.getJSON('/ci/api/merchantsCount/format/json', function(res) {
				that.totalCount = res.totalCount;
				that.totalPage = Math.ceil(that.totalCount / that.limit);
				that.trigger('getTotalCount');
			});
		},

		
		setUrl: function(page, limit, aqcuirer) {
			
		}
	});
	
	var merchants = new MerchantList;

	/************************************************************************
	 * generate the html from merchant model
	 ***********************************************************************/
	var MerchantView = Backbone.View.extend({
		tagName: 'tr',
		template: _.template($('#merchant-template').html()),
		render: function() {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
		
	});
	/************************************************************************
	 * render ths model list to the html
	 ***********************************************************************/
	var MerchantListView = Backbone.View.extend({
		el: $('#merchant-container .content table'),
		
		initialize: function() {
			
			_.bindAll(this, 'addAll', 'addOne');
			merchants.bind('refresh', this.addAll);
			merchants.fetch();
		},
		
		addOne: function(merchant) {
			var view = new MerchantView({model: merchant});
			this.el.append(view.render().el);
		},
		
		addAll: function() {
			this.el.find('tr').remove();
			merchants.each(this.addOne);
		}
	});
	
	new MerchantListView;
	/************************************************************************
	 * pagination, set the model collection then fetch and refresh
	 ***********************************************************************/	
	var PaginationView = Backbone.View.extend({
		template: _.template($('#pagination-template').html()),
		el: $('#merchant-container .action #pagination-container'),
		events: {
			'keypress #merchant-container .action #page-input': 'gotoPageOnEnter'
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
			merchants.currentPage = this.input.val();
			merchants.fetch();
			
		}
	});
	new PaginationView;
	
})();
