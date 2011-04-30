<?php

$js_files = array('vendor/less',
				  'vendor/underscore',
				  'vendor/jquery',
				  'vendor/backbone',
				  'vendor/jquery.livevalidation',
				  'vendor/jquery.autocomplete',
				  'vendor/jquery.date-input',

				  'notifier',
				  'merchant/app-merchant',
				  'merchant/collection',
				  'merchant/pagination',
				  'merchant/list-view',
				  'merchant/add-form',	
				  'merchant/new-list',					  			  
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