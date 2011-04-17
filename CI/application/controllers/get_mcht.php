<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Get_mcht extends CI_Controller {


	public function index(){
		$q = new Doctrine_Query();
		$q->from('model_merchant.Terminal m');
		$m = $q->execute();
		echo '<pre>';
		print_r($m->toArray(true));
		
	}
}

