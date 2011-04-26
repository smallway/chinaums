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
		notify: function(message, cid) {
			console.log(cid);
			this.el.append('<div  id="' + cid + '" class="' + message.type + '"> ' + message.content + '</div>');
			if(message.autoDisappear) {
				setTimeout(function() {
					this.el.html();
				}, 3000);
			}
		},
		clear: function() {
			this.el.html();
		},
		remove: function(cid) {
			this.$('#' + cid).remove();
		}
		
	});
	
	window.notifier = new Notifier;
	
})();
