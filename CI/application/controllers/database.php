<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Database extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->args = array('data_fixtures_path'  =>  APPPATH . 'doctrine_data/fixtures',
			                'migrations_path'     =>  APPPATH . 'doctrine_data/migrations',
			                'sql_path'            =>  APPPATH . 'doctrine_data/sql',
			                'yaml_schema_path'    =>  APPPATH . 'doctrine_data/schema',
			                'models_path'         =>  APPPATH . 'models');
	}

	function index(){
		$a = array('generateModelsFromYaml',
				   'dropDb',
				   'createDb',
				   'createTables',
				   'loadData',
				   'dumpData',
				   'generateModelsFromDb',
				   'generateYamlFromDb');
		sort($a);
		$this->load->view('database', array('data' => $a));
	}
	
	function dropDb() {
        $manager = Doctrine_Manager::getInstance();
        foreach ($manager as $name => $connection) {
            try {
                $connection->dropDatabase();
                echo ("Successfully dropped database for connection named '" . $name . "'");
            } catch (Exception $e) {
                echo ($e->getMessage());
            }
        }
	}
	
	function createDb() {
		$createdb = new Doctrine_Task_CreateDb();
		$createdb->execute();
	}
	
	function generateModelsFromYaml() {
		$t = new Doctrine_Task_GenerateModelsYaml();
		$t->setArguments($this->args);
		$t->execute();
	}
	
	function createTables() {
		Doctrine_Core::createTablesFromModels($this->args['models_path']);
	}
	
	function loadData() {		
        Doctrine_Core::loadModels($this->args['models_path']);
        Doctrine_Core::loadData($this->args['data_fixtures_path']);
        		
	}
	
	function dumpData() {
        $models = Doctrine_Core::loadModels($this->args['models_path']); 

        if (empty($models)) { 
            throw new Doctrine_Task_Exception('No models were loaded'); 
        }

        $path = $this->args['data_fixtures_path'];

        if (is_array($path) && count($path) > 0) {
            $path = $path[0];
        }

        if ( ! empty($path)) {
            Doctrine_Core::dumpData($path);

        } else {
            throw new Doctrine_Task_Exception('Unable to find data fixtures path.');
        }		
	}
	
	function generateModelsFromDb() {
		Doctrine_Core::generateModelsFromDb($this->args['models_path']);
		
	}
	
	function generateYamlFromDb() {
		Doctrine_Core::generateYamlFromDb($this->args['yaml_schema_path']);
	}
	
	
}