<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require(APPPATH.'/libraries/REST_Controller.php'); 
class Api extends REST_Controller {

	
	function merchants_get() {
		
		$action = $this->get('action');
		
		$page = $this->get('page') == 'undefined' ? 1 : $this->get('page');

		$acquirer = $this->get('acquirer');
		$status = $this->get('status');
		
		$limit = $this->get('limit');
		$offset = ($page - 1) * $limit;
		
		$q = Doctrine_Query::create()->from('model_merchant m');
		
	    if($acquirer != 'undefined') $q->addWhere('m.acquirer_id = ?', $acquirer);
		if($status != 'undefined') $q->addWhere('m.' . $status . ' = ?', true);
		
	    if($action == 'get_count') {
	    	$q->select('count(m.name) count');			
		} else {
			$q->select('m.*, a.bank_name')
			    ->leftJoin('m.Acquirer model_acquirer a')
			    ->limit($limit)
			    ->offset($offset);
		}

		$arr = $q->fetchArray();
		if(count($arr) > 0) {
			$this->response($arr);
		} else {
			$this->response(array('' => ''));
		}
		
	}
}

