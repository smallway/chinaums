(function() {
	var AppContainer = Backbone.View.extend({
		el: $('#appConainter'),
		apps: [],
		currentApp: null,
		load: function(app) {
			if(!_.include(this.apps, app)) {
				this.apps.push(app);
				!this.currentApp || this.currentApp.el.hide();				
			} else {
				if(!app.visible) {
					currentApp.el.hide();
				}
			}
			app.el.show();
			this.currentApp = app;
		}
	});
	
	window.appContainer = new AppContainer;

})();



