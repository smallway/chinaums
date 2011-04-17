var AppSwitcher = Backbone.Controller.extend({
	routes: {
		':appname': 'appSwitcher'
	},
	
	appSwitcher: function(appname) {
		//default app
		appname = appname || 'merchant';
		headerView.setSelect(appname);
	}
});

var appSwitcher = new AppSwitcher();
Backbone.history.start();

//notifier.notify(Notifications.LOADDING);


