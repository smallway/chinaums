(function() {
	var AddForm = Backbone.View.extend({
		el: $('#add-merchant-form'),
		template: _.template($('#add-merchant-form-template').html()),
		events: {
			'keypress #add-merchant-form #license_no': 'getNameAndAddress'
		},
		initialize: function() {
			this.render();
			this.getMcc();
		},
		
		render: function() {
			this.el.html(this.template({acquirers: MERCHANT.acquirers}));
			this.license_no = this.$('#license_no');
			this.name = this.$('#name');
			this.addr = this.$('#addr');
			this.validate();			
		},
		
		getNameAndAddress: function(e) {
			if(e.keyCode != 13) return;
			e.preventDefault();
			if(this.lv_license.validate()) {
				var that = this;
				notifier.notify(Notifications.HONGDUN);
				$.getJSON('/ci/api/get_name_and_address/format/json/license_no/' + this.license_no.val(), function(resp) {
					that.name.val(resp.name);
					that.addr.val(resp.addr);
					notifier.clear();
				});
			}
			
		},
		
		getMcc: function(){
			if(!MERCHANT.mcc) {
				$.getJSON('/ci/api/mcc/format/json', function(resp) {
					MERCHANT.mcc = resp;
			
					/**
					 * auto complete
					 */
					$('#mcc').autocomplete(MERCHANT.mcc, {
						after_this: true,
						width: 260,
						li_title: 'description', 
						formatItem: function(item) {
							return item.mcc + ' - ' + item.rate + ' - ' + item.description;
						}
					}).result(function(event, item) {
						$('#mcc').val(item.mcc);
						$('#rate').val(item.rate);
						$('#desc').html(item.description);	
					});					
				});
			} 
		},
		
		validate: function() {
			this.lv_license = new LiveValidation('license_no');
			this.lv_license.add( Validate.Presence, { failureMessage: "必填!" } );
			this.lv_license.add( Validate.Length, {is:[13,15],wrongLengthMessage:'必须是13或15位数字'} );	
		
			var lv_name = new LiveValidation('name');
			lv_name.add( Validate.Presence, { failureMessage: "必填!" } );
		
			var lv_addr = new LiveValidation('addr');
			lv_addr.add( Validate.Presence, { failureMessage: "必填!" } );
			
			var lv_code = new LiveValidation('code');
			lv_code.add( Validate.Presence, { failureMessage: "必填!" } );
			lv_code.add(Validate.Length, {is:15, wrongLengthMessage:'必须15位数字'});
		
			var lv_mcc = new LiveValidation('mcc');
			lv_mcc.add( Validate.Presence, { failureMessage: "必填!" } );
			lv_mcc.add(Validate.Length, {is:4, wrongLengthMessage:'必须4位数字'});
			
			/*date picker */
			$.extend(DateInput.DEFAULT_OPTS, {
			  stringToDate: function(string) {
			    var matches;
			    if (matches = string.match(/^(\d{4,4})-(\d{2,2})-(\d{2,2})$/)) {
			      return new Date(matches[1], matches[2] - 1, matches[3]);
			    } else {
			      return null;
			    };
			  },
			  
			  dateToString: function(date) {
			    var month = (date.getMonth() + 1).toString();
			    var dom = date.getDate().toString();
			    if (month.length == 1) month = "0" + month;
			    if (dom.length == 1) dom = "0" + dom;
			    return date.getFullYear() + "-" + month + "-" + dom;
			  },
			    month_names: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			  short_day_names: [ "日","一", "二", "三", "四", "五", "六"],
			  start_of_week: 0
			});	

			$('#send_date').date_input();	
			$('#receive_date').date_input();						
		}
	});
	MERCHANT.AddForm = AddForm;
})();
