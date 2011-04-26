<?php

$js_files = array('vendor/less',
				  'vendor/underscore',
				  'vendor/jquery',
				  'vendor/backbone',
				  
				  'notifier',
				  'merchant/app-merchant',
				  'merchant/collection',
				  'merchant/pagination',
				  'merchant/list-view',
				  'merchant/home-sidebar',				  
				  'merchant/acquirer-select',
				  'container',
				  'header',
				  'controller'
);

$ext = '.js';
foreach($js_files as $js) {
	echo '<script type="text/javascript" src="javascripts/' . $js . $ext . '"></script>' . "\n";
}

?>