(function() {
	var Sidebar = Backbone.View.extend({
		el: $('#merchant-container .sidebar'),
		template: _.template($('#merchant-sidebar-template').html()),
		initialize: function() {
			this.render();
		},
		render: function() {
			var that = this;
			$.getJSON('ci/api/merchants/format/json', function(data) {
				that.el.html(that.template({list: data}));
			});
		}
	});
	
	new Sidebar;
	
})();
