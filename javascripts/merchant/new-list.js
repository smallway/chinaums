(function() {
	MERCHANT.NewList = Backbone.View.extend({
		tagName: 'div',
		template: _.template($('#merchant-new-list-template').html()),
		initialize: function() {
			this.render();
			MERCHANT.homeSidebar.el.append($(this.el));
		},
		render: function() {
			var that = this;
			$.getJSON('/ci/api/new_merchant_list/format/json', function(resp) {
				$(that.el).html(that.template(resp));
			});
		}
	});
	
})();
