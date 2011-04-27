(function() {
	var AddForm = Backbone.View.extend({
		el: $('#add-merchant-form'),
		template: _.template($('#add-merchant-form-template').html()),
		initialize: function() {
			this.el.hide();
			this.el.html(this.template({}));
		}
	});
	MERCHANT.addForm = new AddForm;
})();
