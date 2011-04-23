<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require(APPPATH.'/libraries/REST_Controller.php'); 
class Api extends REST_Controller {

	
	function merchants_get() {
		$page = $this->get('page');
		$limit = $this->get('limit');
		$offset = ($page - 1) * $limit; 
		$q = Doctrine_Query::create()
	      ->select('m.*, a.bank_name')
		  ->from('model_merchant m')
		  ->leftJoin('m.Acquirer model_acquirer a')
		  ->limit($limit)
		  ->offset($offset);
		//$m = $q->execute();
		$this->response($q->fetchArray());
		
	}
	
	function merchantsCount_get() {
		$q = new Doctrine_Query();
		$q->select('count(m.name) count')
		  ->from('model_merchant m');
		$m = $q->execute();
		$a = $m->toArray();
		$this->response(array('totalCount'=> $a[0]['count']));
	}
}

