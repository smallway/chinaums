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
		
		$q = Doctrine_Query::create()->from('model_merchant m')->orderBy('m.create_date');
		
	    if($acquirer != 'undefined') $q->addWhere('m.acquirer_id = ?', $acquirer);
		if($status == 'all_finished') {
			$q->addWhere('m.new_one = ?', true);
			$q->addWhere('m.export_to_unionpay = ?', true);
			$q->addWhere('m.export_to_oss = ?', true);
			$q->addWhere('m.upload_scan_file = ?', true);
			$q->addWhere('m.export_to_excel = ?', true);
		} else if($status != 'undefined') $q->addWhere('m.' . $status . ' = ?', false);
		
		//for pagination...
	    if($action == 'get_count') {
	    	$q->select('count(m.name) count');	
		//for list		
		} else {
			$q->select('m.*, a.bank_name')
			    ->leftJoin('m.Acquirer model_acquirer a')
			    ->limit($limit)
			    ->offset($offset);
		}

		$arr = $q->fetchArray();
		
		count($arr) > 0 ? $this->response($arr) : $this->response(array(''));

		
	}

	function acquirers_get() {
		$q = Doctrine_Query::create()->from('model_acquirer a');
		$this->response($q->fetchArray());
	}
	
	function count_by_status_get() {
		
		$a = array('new_one' => 0, 
		           'export_to_unionpay' => 0,
				   'export_to_oss' => 0,
				   'upload_scan_file' => 0,
				   'export_to_excel' => 0,
				   'all_finished' => 0);
		
		$new_one = $export_to_unionpay = $export_to_oss = $upload_scan_file = $export_to_excel = 0;
		
		$all = Doctrine_Core::getTable('model_merchant')->findAll();
		
		
		foreach($all as $m) {
			$all_done = 0;
			
			if(!$m['new_one'])            {$a['new_one'] += 1; }           else $all_done += 1;
			if(!$m['export_to_unionpay']) {$a['export_to_unionpay'] += 1;} else $all_done += 1;
			if(!$m['export_to_oss'])      {$a['export_to_oss'] += 1;}      else $all_done += 1;
			if(!$m['upload_scan_file'])   {$a['upload_scan_file'] += 1;}   else $all_done += 1;
			if(!$m['export_to_excel'])    {$a['export_to_excel'] += 1;}    else $all_done += 1;
			
			if($all_done == 5) $a['all_finished'] += 1;
		}
		
		$this->response($a);
		
	}

}



