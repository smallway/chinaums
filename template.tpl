<!------------------------------------- template -------------------------------------->

<!-- header -->
<script type="text/template" id="header-template">
	<ul id="app-switcher">
		<li><a href="#merchant">新入网</a></li>
		<li><a href="#another">变更账号</a></li>
	</ul>		
</script>

<!-- mcht -->

<script type="text/template" id="merchant-newmcht-sidebar-template">
	<div id="merchant-list">
		<ul>
		<% _.each(list, function(m) {%>
			<li><a href="#"><%= m.name %></a></li>
		<% }); %>
		</ul>
	</div>
</script>

<script type="text/template" id="merchant-home-sidebar-template">
	<div class="sidebar-header"><a class="g-button">新增商户</a></div>
	<ul>
		<li><a id="new_one">新入网<span>(<%= new_one %>)</span></a></li>
		<li><a id="export_to_unionpay">导出到银联<span>(<%= export_to_unionpay %>)</span></a></li>
		<li><a id="export_to_oss">导出到OSS<span>(<%= export_to_oss %>)</span></a></li>
		<li><a id="upload_scan_file">上传扫描件<span>(<%= upload_scan_file  %>)</span></a></li>
		<li><a id="export_to_excel">导出到汇总<span>(<%= export_to_excel %>)</span></a></li>
		<li><a id="all_finished">已完成<span>(<%= all_finished %>)</span></a></li>
	</ul>
</script>

<script type="text/template" id="merchant-new-list-template">
	<div class="sidebar-header"><a class="g-button">返回</a></div>
	<ul>
		<% _.each(list, function(l) {%>
			<li><a><%= l.name %></a></li>
		<%});%>
	</ul>
</script>

<script type="text/template" id="merchant-template">
  <td><%= code %></td>
  <td><%= name %></td>
  <td><%= address %></td>
  <td><%= rate %></td>
  <td><%= Acquirer.bank_name %></td>
</script>

<script type="text/template" id="pagination-template">
	<div id="pagination">
		<span><a id="previous">« Nrevious</a></span>
		<span><input type="text" id="page-input" /> / <%= totalPage %></span>
		<span><a id="next">Next »</a></span>
		<span>total:<%= totalCount %></span>
	</div>
</script>

<script type="text/template" id="by-acquirer-template">
	<select>
	    <option value="undefined">所有银行</option>
	<% _.each(acquirers, function(a) {%>
		<option value="<%= a.id%>"><%= a.bank_name %></option>
	<% });%>
	</select>
</script>

<script type="text/template" id="add-merchant-form-template">
<div id="add-form-container">
<form action="/merchants/add/save" method="POST">

<input type="hidden" name="id" value="<?php echo isset($m_edit->id) ? $m_edit->id : '' ; ?>" />


<div class="form-row form-row-left">
	<div class="form-label">注册号：</div>
	<div class="form-field">
		<input id="license_no" type="text" name="license_no" autocomplete="off" maxLength="15" value="<?php echo isset($m_edit) ? $m_edit->license_no : '' ; ?>" />
		<div id="duplicate_wrapper"><input type="checkbox" id="is_duplicate_license" checked="checked" name="is_duplicate_license" /><label for="is_duplicate_license">检查注册号重复性？<a href="#" target="blank">open</a></label></div>
	</div>
</div>

<div class="form-row form-row-right">
	<div class="form-label">商户名称：</div>
	<div class="form-field"><input id="name" type="text" autocomplete="off" name="name" readonly="readonly" value="<?php echo isset($m_edit) ? $m_edit->name : '' ; ?>" /></div>
</div>

<div class="form-row form-row-left">
	<div class="form-label">地址：</div>
	<div class="form-field"><input id="addr" name="addr" autocomplete="off" value="<?php echo isset($m_edit) ? $m_edit->addr : '' ; ?>" /></div>
</div>

<div class="form-row form-row-right">
	<div class="form-label">商户代码：</div>
	<div class="form-field"><input id="code" type="text" autocomplete="off" name="code"  readonly="readonly" maxLength="15" value="<?php echo isset($m_edit) ? $m_edit->code : '' ; ?>" /></div>
	
</div>

<div class="form-row form-row-left">
	<div class="form-label">商户类型：</div>
	<div class="form-field" id="mcc-field">
		<input id="mcc" name="mcc" autocomplete="off" maxLength="4" value="<?php echo isset($m_edit) ? $m_edit->mcc : '' ; ?>" />
		<div id="desc"></div>
	</div>
</div>

<div class="form-row form-row-right">
	<div class="form-label">扣率：</div>
	<div class="form-field">
		<input id="rate" name="rate"  autocomplete="off" readonly="readonly" value="<?php echo isset($m_edit) ? $m_edit->rate : '' ; ?>" />
		
	</div>
</div>

<div class="form-row form-row-left">
	<div class="form-label">收单银行：</div>
	<div class="form-field"><?php echo $banks_select ?></div>
</div>

<div class="form-row form-row-right">
	<div class="form-label">支行：</div>
	<div class="form-field">
		<?php echo $sub_banks_select ?>
		</div>
</div>

<div class="form-row form-row-left">
	<div class="form-label">收单账号：</div>
	<div class="form-field"><input id="account" name="account" autocomplete="off" value="<?php echo isset($m_edit) ? $m_edit->account : '' ; ?>" /></div>
</div>

<div class="form-row form-row-right">
	<div class="form-label">终端号：</div>
	<div class="form-field"><input id="terminal" name="terminal" autocomplete="off" value="<?php echo isset($m_edit) ? $m_edit->terminal : '' ; ?>" /></div>
</div>

<div class="form-row form-row-left">
	<div class="form-label">税务证：</div>
	<div class="form-field"><input id="tax_no" name="tax_no" autocomplete="off" value="<?php echo isset($m_edit) ? $m_edit->tax_no : '' ; ?>" /></div>
</div>

<div class="form-row form-row-right">
	<div class="form-label">证件号码：</div>
	<div class="form-field"><input id="idcard" name="idcard" autocomplete="off" value="<?php echo isset($m_edit) ? $m_edit->idcard : '' ; ?>" /></div>
</div>




<div class="form-row form-row-left">
	<div class="form-label">联系方式：</div>
	<div class="form-field"><input id="contact" name="contact" autocomplete="off" value="<?php echo isset($m_edit) ? $m_edit->contact : '' ; ?>" /></div>
</div>
<div class="form-row form-row-right">
	<div class="form-label">法人：</div>
	<div class="form-field"><input id="people" name="people" autocomplete="off" value="<?php echo isset($m_edit) ? $m_edit->people : '' ; ?>" /></div>
</div>




<div class="form-row form-row-left">
	<div class="form-label">风险确认函：</div>
	<div class="form-field"><select id="is_comfirm_risk" name="is_comfirm_risk"><option value="0" <?php if(isset($m_edit)) echo !$m_edit->is_comfirm_risk? 'selected' : '' ?>>0_无</option><option value="1" <?php if(isset($m_edit)) echo $m_edit->is_comfirm_risk? 'selected' : '' ?>>1_有</option></select></div>
</div>

<div class="form-row form-row-right">
	<div class="form-label">担保：</div>
	<div class="form-field"><select id="is_guarantee" name="is_guarantee"><option value="0" <?php if(isset($m_edit)) echo !$m_edit->is_guarantee? 'selected' : '' ?>>0_无</option><option value="1" <?php if(isset($m_edit)) echo $m_edit->is_guarantee? 'selected' : '' ?>>1_有</option></select></div>
</div>



<div class="form-row form-row-left">
	<div class="form-label">改签：</div>
	<div class="form-field"><select id="is_change_bank" name="is_change_bank"><option value="0" <?php if(isset($m_edit)) echo !$m_edit->is_change_bank? 'selected' : '' ?>>0_无</option><option value="1" <?php if(isset($m_edit)) echo $m_edit->is_change_bank? 'selected' : '' ?>>1_有</option></select></div>
</div>

<div class="form-row form-row-right">
	<div class="form-label">递交时间：</div>
	<div class="form-field"><input id="send_date" autocomplete="off" name="send_date" value="<?php echo isset($m_edit) ? $m_edit->send_date() : '' ; ?>" /></div>
</div>

<div class="form-row form-row-right">
	<div class="form-label">接收时间：</div>
	<div class="form-field"><input id="receive_date" autocomplete="off" name="receive_date" value="<?php echo isset($m_edit) ? $m_edit->receive_date() : '' ; ?>" /></div>
</div>




<div class="form-row form-row-left">
	<div class="form-label">备注：</div>
	<div class="form-field"><textarea id="comment" name="comment" cols="10" rows="10"><?php echo isset($m_edit) ? $m_edit->comment : '' ; ?></textarea></div>
</div>


<div class="form-row form-row-left">
	<div class="form-label"> </div>
	<div class="form-field"><input type="submit" value="<?php echo isset($m_edit->id) ? '更新' : '保存' ; ?>"></div>
</div>

</form>
</div>
</script>