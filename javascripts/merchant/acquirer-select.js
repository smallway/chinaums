(function() {
	var merchants = MERCHANT.merchants;
	 var ByAcquirerView = Backbone.View.extend({
	 	el: $('#by-acquirer-container'),
	 	template: _.template($('#by-acquirer-template').html()),
	 	initialize: function() {
	 		_.bindAll(this, 'render', 'changeAcquirer');
	 		$.getJSON('/ci/api/acquirers/format/json', this.render);
	 	},
	 	render: function(resp) {
	 		MERCHANT.acquirers = resp;
	 		this.el.html(this.template({acquirers: resp}));
	 		this.select = this.$('select');
	 		this.select.bind('change', this.changeAcquirer);
	 	},
	 	changeAcquirer: function() {
	 		merchants.byAcquirer(this.select.val());
	 	}
	 	
	 });
	 MERCHANT.byAcquirer = new ByAcquirerView;	
})();
