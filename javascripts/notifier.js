// Register Notifications
var Notifications = {
	
  LOADDING: {
    message: 'Loadding...',
    type: 'info'
  },
  
  TEST: {
  	message: 'Get it',
  	type: 'info'
  }

};


Backbone.Notifier = function(options) {
  options || (options = {});
  if (this.initialize) this.initialize(options);
};

_.extend(Backbone.Notifier.prototype, Backbone.Events, {
  notify: function(message) {
    this.trigger('message:arrived', message);
  }
});


// Set up global notification system
var notifier = new Backbone.Notifier();

// Listen for messages 
notifier.bind('message:arrived', function(message) {
  var $message = $('<p class="notification"><span> ' + message.type + ':</span>'+message.message+'</p>');
  $('#notifications .wrapper').append($message);

  if (message.message.indexOf('...') !== -1) {
    $message.addClass('activity');
    
  } else {
    //$('#notifications .wrapper p.activity').remove();
    // Just flash message if it's not a wait... message
    setTimeout(function() {
      $message.remove();
    }, 4000);
  }
});