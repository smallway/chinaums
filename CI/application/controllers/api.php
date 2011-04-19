<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require(APPPATH.'/libraries/REST_Controller.php'); 
class Api extends REST_Controller {

	
	function merchants_get() {
		$q = new Doctrine_Query();
		$q->select('*')->from('model_merchant m');
		$m = $q->execute();
		$this->response($m->toArray(true));
	}
}

