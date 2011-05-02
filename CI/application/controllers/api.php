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
		
		$q = Doctrine_Query::create()->from('merchant m')->orderBy('m.create_date');
		
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
			$q->select('m.*, a.name')
			    ->leftJoin('m.Acquirer acquirer a')
			    ->limit($limit)
			    ->offset($offset);
		}

		$arr = $q->fetchArray();
		
		count($arr) > 0 ? $this->response($arr) : $this->response(array(''));

		
	}

	function new_merchant_list_get() {
		$q = Doctrine_Query::create()
			 ->select('m.name')
			 ->from('merchant m')
			 ->where('m.new_one = ?', false);
		$this->response($q->fetchArray());
	}

	function acquirers_get() {
		$q = Doctrine_Query::create()->from('acquirer a')->orderBy('a.id');
		$this->response($q->fetchArray());
	}
	
	function branch_get() {
		$q = Doctrine_Query::create()->from('branch');
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
		
		$all = Doctrine_Core::getTable('merchant')->findAll();
		
		
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

	//hongdun...
	function get_name_and_address_get() {
		
		require_once APPPATH.'/libraries/simple_html_dom.php';

		//$dom->load(file_get_contents('http://www.wenzhou315.gov.cn/bszn/qyjbxx_search.php?searchkey='.trim($license)), true);
		$html = file_get_html('http://www.wenzhou315.gov.cn/bszn/qyjbxx_search.php?searchkey=' . $this->get('license_no'));

		$original_link = $html->find('#main_list_right table a', 0);
		
		$arr = array();
		
		//check does have this enterprise
		if(is_object ($original_link)) {
			$detail_link = 'http://www.wenzhou315.gov.cn' . substr($original_link->href, 2);
			
			//get the detail...
			$html = file_get_html($detail_link);
			//html 
			//return $html->find('table', 6);
			$table = $html->find('table', 6);
			
			$arr = array();
			$arr['name'] = iconv('GBK', 'UTF-8', $table->children(1)->children(3)->innertext);
			$arr['license_no'] = $table->children(3)->children(3)->innertext;
			$arr['addr'] = iconv('GBK', 'UTF-8', $table->children(5)->children(3)->innertext);
			$arr['start_date'] = iconv('GBK', 'UTF-8', $table->children(7)->children(3)->innertext);
			$arr['scrop']= iconv('GBK', 'UTF-8', $table->children(9)->children(3)->innertext); 

		} else {
			$arr['name'] = 'No Found...';
		}
		
		$this->response($arr);
		
	}

	function generate_code_get() {
		$prefix = $this->get('prefix');
		$q = Doctrine_Query::create()
			 ->select('m.code')
			 ->from('merchant m')
			 ->orderBy('m.code DESC')
			 ->where('m.code LIKE ?', $prefix . '____');
		$arr = $q->fetchArray();
		$result = '';
		if(count($arr) == 0) {
			$result = $prefix . '0001';
		} else {
			$code = $arr[0]['code'];
			$result = sprintf('%04d', substr($code, 11) + 1);
			$result = $prefix . $result;
		}
		$this->response(array('code' => $result));
	}

	function mcc_get() {
		$q = Doctrine_Query::create()->from('mcc');
		$this->response($q->fetchArray());
	}
}



