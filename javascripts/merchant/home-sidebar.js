(function() {
	var merchants = MERCHANT.merchants;
	var HomeSidebar = Backbone.View.extend({
		el: $('#merchant-container .sidebar #home-sidebar'),
		template: _.template($('#merchant-home-sidebar-template').html()),
		events: {
			'click li a': 'getStatus',
			'click #home-sidebar .sidebar-header a': 'addForm'
		},
		initialize: function() {
			this.render();
		},
		getStatus: function(e){
			this.$('li a').removeClass('selected');
			$(e.currentTarget).addClass('selected');
			merchants.byStatus($(e.currentTarget).attr('id'));
		},
		
		render: function() {
			var that = this;
			$.getJSON('/ci/api/count_by_status/format/json', function(resp) {
				that.el.html(that.template(resp));
			});
		},
		addForm: function() {
			this.el.hide();
			MERCHANT.merchantListView.el.hide();
			MERCHANT.pagination.el.hide();
			MERCHANT.byAcquirer.el.hide();
			MERCHANT.addForm ? MERCHANT.addForm.el.show() : MERCHANT.addForm = new MERCHANT.AddForm;
			MERCHANT.newList ? MERCHANT.newList.el.show() : MERCHANT.newList = new MERCHANT.NewList;
		}
	});
	MERCHANT.homeSidebar = new HomeSidebar;	
})();
