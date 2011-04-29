(function() {
	var AddForm = Backbone.View.extend({
		el: $('#add-merchant-form'),
		template: _.template($('#add-merchant-form-template').html()),
		initialize: function() {
			this.el.hide();
			this.el.html(this.template({}));
			this.validate();
		},
		
		validate: function() {
			var lv_license = new LiveValidation('license_no');
			lv_license.add( Validate.Presence, { failureMessage: "必填!" } );
			lv_license.add( Validate.Length, {is:[13,15],wrongLengthMessage:'必须是13或15位数字'} );	
		
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
			
			/**
			 * auto complete
			 */
			$('#mcc').autocomplete(mcc, {
				after_this: true,
				width: 260,
				li_title: 'desc', 
				formatItem: function(item) {
					return item.mcc + ' - ' + item.rate + ' - ' + item.desc;
				}
			}).result(function(event, item) {
				$('#mcc').val(item.mcc);
				$('#rate').val(item.rate);
				$('#desc').html(item.desc);	
			});
			
			
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
	MERCHANT.addForm = new AddForm;
})();
