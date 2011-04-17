var HeaderView = Backbone.View.extend({
	el: $('#header'),
	template: _.template($('#header-template').html()),

	initialize: function() {
		this.el.html(this.template({}));
	},
	setSelect: function(appname) {
		this.$('li').removeClass('selected');
		this.$('a[href=#' + appname + ']').parent().addClass('selected');
	}
});
headerView = new HeaderView;