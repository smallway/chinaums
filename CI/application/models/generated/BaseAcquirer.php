<?php
// Connection Component Binding
Doctrine_Manager::getInstance()->bindComponent('Acquirer', 'chinaums');

/**
 * BaseAcquirer
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property string $id
 * @property string $name
 * @property string $account
 * @property string $mcc_prefix
 * @property string $account_regex
 * @property Doctrine_Collection $Merchant
 * @property Doctrine_Collection $Branch
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class BaseAcquirer extends Doctrine_Record
{
    public function setTableDefinition()
    {
        $this->setTableName('acquirer');
        $this->hasColumn('id', 'string', 10, array(
             'type' => 'string',
             'primary' => true,
             'autoincrement' => false,
             'length' => '10',
             ));
        $this->hasColumn('name', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('account', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('mcc_prefix', 'string', 7, array(
             'type' => 'string',
             'length' => '7',
             ));
        $this->hasColumn('account_regex', 'string', 64, array(
             'type' => 'string',
             'length' => '64',
             ));
    }

    public function setUp()
    {
        parent::setUp();
        $this->hasMany('Merchant', array(
             'local' => 'id',
             'foreign' => 'acquirer_id'));

        $this->hasMany('Branch', array(
             'local' => 'id',
             'foreign' => 'acquirer_id'));
    }
}