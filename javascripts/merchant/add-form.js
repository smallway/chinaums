(function() {
	var AddForm = Backbone.View.extend({
		el: $('#add-merchant-form'),
		template: _.template($('#add-merchant-form-template').html()),
		events: {
			'keypress #add-merchant-form #license_no': 'getNameAndAddress',
			'change #add-merchant-form #acquirer': 'changeAcquirer',
			'blur #add-merchant-form #terminal' : 'generateTerminal',
			'submit #add-merchant-form form': 'submit'
		},
		validation: new Array(),
		initialize: function() {
			this.render();
			this.getMcc();
			this.getBranch();
		},
		
		render: function() {
			this.el.html(this.template({acquirers: MERCHANT.acquirers}));
			this.bindElement();
			this.validate();
			
		},
		
		bindElement: function() {
			this.form = this.$('form');
			
			this.license_no = this.$('#license_no');
			this.name = this.$('#name');
			this.addr = this.$('#addr');
			this.code = this.$('#code');
			this.acquirer = this.$('#acquirer');
			this.branchWrapper = this.$('#branch-wrapper');
			this.terminal = this.$('#terminal');
			this.account = this.$('#account');
			
			this.mcc = this.$('#mcc');
			this.rate = this.$('#rate');
		},
		
		renderBranch: function(acquirer_id) {
			var template = _.template($('#branch-template').html());
			var acquirerBranch = _.select(MERCHANT.branch, function(b) {return b.acquirer_id == acquirer_id});
			this.branchWrapper.html(template({branch: acquirerBranch}));
		},
		
		changeAcquirer: function(e) {
			var that = this;
			this.currentAcquirer = _.select(MERCHANT.acquirers, function(a) {return a.id == that.acquirer.val();});
			this.currentAcquirer = this.currentAcquirer[0];
			this.renderBranch(this.acquirer.val());
			this.generateCode();
			this.bindAccountValidate();
			this.bindBranchValidate();
			//this.generateTerminal();
		},
		
		bindAccountValidate: function() {
			var that = this;
			$.validator.addMethod('ACCOUNT', function(value, element){
				var re = new RegExp(that.currentAcquirer.account_regex);
				return this.optional(element) || re.test(value);
			}, 'Wrong account for current acquirer.');			
			this.account.rules('remove');
			this.account.rules('add', 'ACCOUNT');
		},
		
		bindBranchValidate: function() {
			
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
					if(resp.name != 'No Found...') that.checkDuplicateLicense(that.license_no.val());
				});
			}
			
		},
		
		generateTerminal: function(e) {
			
			if(this.acquirer.val() == '03043330') {
				
			} else {

					$.getJSON('/ci/api/generate_terminal/format/json/terminal_no/' + this.terminal.val() + '/acquirer/' + this.acquirer.val(), function(resp) {});
				}					
		},
		
		checkDuplicateLicense: function(license_no) {
			url = 'https://202.96.255.153:4431/mcm/com/cup/mcm/portal/jpf/mchntinfomgnt/dirmchntaudit/getDuplicateLicNo.do?ts=&sys_mchnt_cd=&lic_no=' + license_no;
			window.open(url, "mywindow", "menubar=1,resizable=1,width=800,height=400,left=250,top=400");				
		},
		
		getBranch: function() {
			if(!MERCHANT.branch) {
				$.getJSON('/ci/api/branch/format/json', function(resp) {
					MERCHANT.branch = resp;
				});
			}
		},
		
		getMcc: function(){
			if(!MERCHANT.mcc) {
				var that = this;
				$.getJSON('/ci/api/mcc/format/json', function(resp) {
					MERCHANT.mcc = resp;
					that.mccAutoComplete();			
				});
			} 
		},
		
		generateCode: function() {
			var that = this;
			if(that.mcc.val() != '' && that.acquirer.val() != 'undefined') {
				
				$.getJSON('/ci/api/generate_code/format/json/prefix/' + this.currentAcquirer.mcc_prefix + that.mcc.val(), function(resp) {
					that.code.val(resp.code);
				});
			}
		},
		
		mccAutoComplete: function() {
			var that = this;
			that.mcc.autocomplete(MERCHANT.mcc, {
				after_this: true,
				width: 260,
				li_title: 'description', 
				formatItem: function(item) {
					return item.mcc + ' - ' + item.rate + ' - ' + item.description;
				}
			}).result(function(event, item) {
				that.mcc.val(item.mcc);
				that.rate.val(item.rate);
				$('#desc').html(item.description);
				
				that.generateCode();
			});				
		},
		
		validate: function() {
			$.validator.addMethod('LICENSE_NO', function(value, element){
				return this.optional(element) || /(^\d{13}$)|(^\d{15}$)/.test(value);
			}, 'Please enter 13 or 15 numbers.');
			
			$.validator.addMethod('MCHT_CODE', function(value, element){
				return this.optional(element) || /^\d{15}$/.test(value);
			}, 'Please enter 15 numbers');
			
			
			this.$('form').validate({
				rules: {
					license_no: 'LICENSE_NO',
					mcht_code: 'MCHT_CODE'
				}
			});
		},
		
		dataPicker: function() {
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
		},
		
		submit: function(e) {
			var o = Object();
			$('form input[type!=submit], form select, form textarea').each(function() {
				o[$(this).attr('id')] = $(this).val();
			});
			var m = new MERCHANT.Merchant_Model;
			m.set(o);
			m.set({terminal: ['33300001', '33300002']});
			m.save();
			var v = _.select(this.validation, function(lv) {return !lv.validate()});
			if(v.length == 0) {
				
			}
		}
	});
	MERCHANT.AddForm = AddForm;
})();
