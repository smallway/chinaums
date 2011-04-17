var App = Backbone.View.extend({
	
	initialize: function() {
		this.el.hide();
		this.render();
	},
});

var MerchantApp = App.extend({
	el: $('#merchant-container'),
	template: $('#merchant-container-template').html(),
	render: function() {
		this.el.html(this.template);
	}

});

var merchantApp = new MerchantApp;


var MerchantSidebar = Backbone.View.extend({
	template: $('#merchant-sidebar-template').html(),
	initialize: function() {
		merchantApp.el.find('#merchant-sidebar').html(this.template);
	}
});
var m = new MerchantSidebar


appContainer.load(merchantApp);
