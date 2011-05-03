(function() {
	var AddForm = Backbone.View.extend({
		el: $('#add-merchant-form'),
		template: _.template($('#add-merchant-form-template').html()),
		events: {
			'keypress #add-merchant-form #license_no': 'getNameAndAddress',
			'change #add-merchant-form #acquirer-select': 'changeAcquirer',
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
			this.acquirer = this.$('#acquirer-select');
			this.branchWrapper = this.$('#branch-wrapper');
			
			
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
		},
		
		bindAccountValidate: function() {
			var lv_account = new LiveValidation('account');
			lv_account.add( Validate.Presence, { failureMessage: "Can't be empty!" } );
			console.log(this.currentAcquirer.account_regex);
			lv_account.add(Validate.Format, {pattern:new RegExp(this.currentAcquirer.account_regex), failureMessage: 'Wrong account!'});
			this.validation.push(lv_account);
			
		},
		
		bindBranchValidate: function() {
			var lv_branch = new LiveValidation('branch');
			lv_branch.add(Validate.Exclusion, { within: [ 'undefined' ], failureMessage: 'no select!'});
			this.validation.push(lv_branch);			
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
			this.lv_license = new LiveValidation('license_no');
			this.lv_license.add( Validate.Presence, { failureMessage: "Can't be empty!" } );
			this.lv_license.add(Validate.Numericality);
			this.lv_license.add( Validate.Length, {is:[13,15],wrongLengthMessage:'Should 13 or 15 length!'} );	
			this.validation.push(this.lv_license);
			
			var lv_name = new LiveValidation('name');
			lv_name.add( Validate.Presence, { failureMessage: "Can't be empty!" } );
			this.validation.push(lv_name);
			
			var lv_addr = new LiveValidation('addr');
			lv_addr.add( Validate.Presence, { failureMessage: "Can't be empty!" } );
			this.validation.push(lv_addr);
			
			var lv_code = new LiveValidation('code');
			lv_code.add( Validate.Presence, { failureMessage: "Can't be empty!" } );
			lv_code.add(Validate.Numericality);
			lv_code.add(Validate.Length, {is:15, wrongLengthMessage:'Should 15 Length!'});
			this.validation.push(lv_code);
			
			var lv_mcc = new LiveValidation('mcc');
			lv_mcc.add( Validate.Presence, { failureMessage: "Can't be empty!" } );
			lv_mcc.add(Validate.Numericality);
			lv_mcc.add(Validate.Length, {is:4, wrongLengthMessage:'Should 4 Length'});
			this.validation.push(lv_mcc);
			
			var lv_terminal = new LiveValidation('terminal');
			lv_terminal.add( Validate.Presence, { failureMessage: "Can't be empty!" } );
			lv_terminal.add(Validate.Numericality);
			this.validation.push(lv_terminal);
			
			var lv_tax_no = new LiveValidation('tax_no');
			lv_tax_no.add( Validate.Presence, { failureMessage: "Can't be empty!" } );
			lv_tax_no.add(Validate.Numericality);
			lv_tax_no.add(Validate.Length, {is:[15,18,20],wrongLengthMessage:'15,18,20 length!'});
			this.validation.push(lv_tax_no);
			
			var lv_id_card = new LiveValidation('id_card');
			lv_id_card.add( Validate.Presence, { failureMessage: "Can't be empty!" } );
			lv_id_card.add(Validate.Numericality);
			lv_id_card.add(Validate.Length, {is:[15,18],wrongLengthMessage:'15,18 Length!'});
			this.validation.push(lv_id_card);
			
			var lv_contact = new LiveValidation('contact');
			lv_contact.add( Validate.Presence, { failureMessage: "Can't be empty!" } );	
			this.validation.push(lv_contact);
			
			var lv_legal_person = new LiveValidation('legal_person');
			lv_legal_person.add( Validate.Presence, { failureMessage: "Can't be empty!" } );	
			this.validation.push(lv_legal_person);
			
			var lv_acquirer_id = new LiveValidation('acquirer-select');
			lv_acquirer_id.add(Validate.Exclusion, { within: [ 'undefined' ], failureMessage: 'no select!'});
			this.validation.push(lv_acquirer_id);
			
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
			$('form input[type!=submit], form select').each(function() {
				o[$(this).attr('id')] = $(this).val();
			});
			console.log(o);
			var v = _.select(this.validation, function(lv) {return !lv.validate()});
			if(v.length == 0) {
				
			}
		}
	});
	MERCHANT.AddForm = AddForm;
})();
