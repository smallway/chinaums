<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Database extends CI_Controller {

	function __construct()
	{
		parent::__construct();
	}

	function index(){
		$a = array('dump data' => 'dumpdata',
		           'generateModelsFromDb' => 'generateModelsFromDb');
		
		
		
		$this->load->view('database', array('data' => $a));
	}
	
	function dumpData() {
		Doctrine_Core::dumpData('./application/fixtures/data.yml');
		echo 'success';
	}
	
	function generateModelsFromDb() {
		Doctrine_Core::generateModelsFromDb();
	}
}