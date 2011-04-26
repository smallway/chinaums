(function() {
	var merchants = MERCHANT.merchants;
	var HomeSidebar = Backbone.View.extend({
		el: $('#merchant-container .sidebar'),
		template: _.template($('#merchant-home-sidebar-template').html()),
		events: {
			'click li a': 'getStatus',
			'click #sidebar-header a': 'addForm'
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
			merchantListView.el.hide();
		}
	});
	MERCHANT.homeSidebar = new HomeSidebar;	
})();
