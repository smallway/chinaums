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
	<div id="sidebar-header"><a href="/merchants/add">新增商户</a></div>
	<ul>
		<li><a href="#merchant/new-list">新入网(n)</a></li>
		<li><a href="#merchant/export-unionpay">导出以银联(n)</a></li>
		<li><a href="#merchant/export-oss">导出到OSS(n)</a></li>
		<li><a href="#merchant/upload-scan-file">上传扫描件(n)</a></li>
		<li><a href="#merchant/export-excel">导出到汇总(n)</a></li>
		<li><a href="#merchant/finish">已完成(n)</a></li>
	</ul>
</script>

<script type="text/template" id="merchant-template">
  <td><%= code %></td>
  <td><%= name %></td>
  <td><%= address %></td>
  <td><%= rate %></td>
</script>


