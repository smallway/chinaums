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
	<div id="sidebar-header"><a class="g-button">新增商户</a></div>
	<ul>
		<li><a id="new_one">新入网<span>(<%= new_one %>)</span></a></li>
		<li><a id="export_to_unionpay">导出以银联<span>(<%= export_to_unionpay %>)</span></a></li>
		<li><a id="export_to_oss">导出到OSS<span>(<%= export_to_oss %>)</span></a></li>
		<li><a id="upload_scan_file">上传扫描件<span>(<%= upload_scan_file  %>)</span></a></li>
		<li><a id="export_to_excel">导出到汇总<span>(<%= export_to_excel %>)</span></a></li>
		<li><a id="all_finished">已完成<span>(<%= all_finished %>)</span></a></li>
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


