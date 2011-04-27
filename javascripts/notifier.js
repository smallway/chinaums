// Register Notifications
var Notifications = {
	
  LOADDING: {
    content: 'Loadding...',
    type: 'info',
    autoDisappear: false
  },
  
  TEST: {
  	content: 'Get it',
  	type: 'info',
  	autoDisappear: false
  }

};

(function() {
	var Notifier = Backbone.View.extend({
		el: $('#notification'),
		initialize: function() {},
		notify: function(message) {
			this.el.html('<div class="' + message.type + '"> ' + message.content + '</div>');
			if(message.autoDisappear) {
				setTimeout(function() {
					this.el.html();
				}, 3000);
			}
		},
		clear: function() {
			$('#notification').html('');
		},
		
	});
	
	window.notifier = new Notifier;
	
})();
