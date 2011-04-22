(function() {
	
	var HomeSidebar = Backbone.View.extend({
		el: $('#merchant-container .sidebar'),
		template: _.template($('#merchant-home-sidebar-template').html()),
		initialize: function() {
			this.el.html(this.template({}));
		}
	});
	new HomeSidebar;
	
	var Merchant = Backbone.Model.extend({
		
	});
	
	var MerchantList = Backbone.Collection.extend({
		model: Merchant,
		url: '/ci/api/merchants/format/json',
	});
	
	var merchants = new MerchantList;
	
	var MerchantView = Backbone.View.extend({
		tagName: 'tr',
		template: _.template($('#merchant-template').html()),
		render: function() {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
		
	});
	
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
			merchants.each(this.addOne);
		}
	});
	
	new MerchantListView;
	
})();
