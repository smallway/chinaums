<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
   "http://www.w3.org/TR/html4/strict.dtd">

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>ChinaUMS</title>
	<link rel="stylesheet/less" href="css/css.less" type="text/css" />
</head>
<body>
    <div id="header"></div>
    
    <div id="app-container">
    	<div id="merchant-container" rel="merchant" class="container-view" style="display: none">
    		<div class="sidebar"></div>
    		<div class="action"><div id="pagination-container"></div></div>
    		<div class="content"><table></table></div>
    	</div>
    	<div id="another-container" rel="another" class="container-view" style="display: none">
    		<div class="sidebar">Another Sidbar</div>
    		<div class="action">Another Action</div>
    		<div class="content">Another Content</div>
    	</div>
    </div>
    
	<div id="notifications"><div class="wrapper"></div></div>
	
	<?php include 'template.tpl';?>
	<?php include 'javascripts/scripts.php';?>

</body>
</html>
