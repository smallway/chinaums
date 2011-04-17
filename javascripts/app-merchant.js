(function() {
	var Sidebar = Backbone.View.extend({
		el: $($('#merchant-sidebar-template').html()),
		
	});
	
	var Content = Backbone.View.extend({
		el: $($('#merchant-content-template').html()),
	});
	
	var Merchant = Backbone.View.extend({
		el: $($('#merchant-container-template').html()),
		initialize: function() {
			this.el.hide();
			this.sidebar = new Sidebar;
			this.content = new Content
			this.el.find('.sidebar').html(this.sidebar.el.html());
			this.el.find('.content').html(this.content.el.html());
			
		}
	});
	
	window.merchant = new Merchant;
})();
