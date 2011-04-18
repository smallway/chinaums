(function() {
	var AppContainer = Backbone.View.extend({
		el: $('#app-container'),
		apps: [],
		currentApp: null,
		load: function(app) {
			if(!_.include(this.apps, app)) {
				this.apps.push(app);
				this.el.append(app.el.html());
				!this.currentApp || this.currentApp.el.hide();
				app.el.show();				
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









