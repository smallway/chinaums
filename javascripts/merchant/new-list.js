(function() {
	MERCHANT.NewList = Backbone.View.extend({
		el: $('#merchant-container .sidebar #new-list'),

		template: _.template($('#merchant-new-list-template').html()),
		events: {
			'click #new-list .sidebar-header a': 'backHome'
		},
		initialize: function() {
			this.render();
		},
		render: function() {
			var that = this;
			$.getJSON('/ci/api/new_merchant_list/format/json', function(resp) {
				$(that.el).html(that.template({list:resp}));
			});
		},
		backHome: function() {
			this.el.hide();
			MERCHANT.merchantListView.el.show();
			MERCHANT.pagination.el.show();
			MERCHANT.byAcquirer.el.show();
			MERCHANT.homeSidebar.el.show();	
			MERCHANT.addForm.el.hide();
		}
	});
	
})();
