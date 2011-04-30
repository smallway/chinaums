// Register Notifications
var Notifications = {
	
  LOADDING: {
    content: 'Loadding...',
    type: 'info',
    autoDisappear: false,
    width: '100px'
  },
  
  HONGDUN: {
  	content: 'Getting Merchant...',
  	type: 'info',
  	autoDisappear: false,
  	width: '150px'
  }

};

(function() {
	var Notifier = Backbone.View.extend({
		el: $('#notification'),
		initialize: function() {},
		notify: function(message) {
			this.el.html('<span class="' + message.type + '" style="width:' + message.width +  '"> ' + message.content + '</span>');
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
