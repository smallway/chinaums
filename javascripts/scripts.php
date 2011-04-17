<?php

$js_files = array('vendor/less',
				  'vendor/underscore',
				  'vendor/jquery',
				  'vendor/backbone',
				  
				  'notifier',
				  'widget',
				  'container',
				  'app',
				  'header',
				  'controller'
);

$ext = '.js';
foreach($js_files as $js) {
	echo '<script type="text/javascript" src="javascripts/' . $js . $ext . '"></script>' . "\n";
}

?>