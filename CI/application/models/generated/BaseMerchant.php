<?php
// Connection Component Binding
Doctrine_Manager::getInstance()->bindComponent('Merchant', 'chinaums');

/**
 * BaseMerchant
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property integer $id
 * @property string $code
 * @property string $name
 * @property string $address
 * @property string $legal_person
 * @property string $license_no
 * @property string $tax_no
 * @property string $id_card
 * @property string $contact
 * @property string $acquirer_id
 * @property string $branch
 * @property string $account
 * @property string $mcc
 * @property string $rate
 * @property string $post
 * @property boolean $is_change_acquirer
 * @property boolean $is_guarantee
 * @property boolean $is_discount
 * @property boolean $is_comfirm_risk
 * @property boolean $is_close_creditcard
 * @property boolean $draft
 * @property datetime $create_date
 * @property date $send_date
 * @property date $receive_date
 * @property string $comment
 * @property boolean $export_to_oss
 * @property boolean $export_to_unionpay
 * @property boolean $upload_scan_file
 * @property boolean $export_to_excel
 * @property boolean $new_one
 * @property Acquirer $Acquirer
 * @property Doctrine_Collection $Terminal
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class BaseMerchant extends Doctrine_Record
{
    public function setTableDefinition()
    {
        $this->setTableName('merchant');
        $this->hasColumn('id', 'integer', 8, array(
             'type' => 'integer',
             'primary' => true,
             'autoincrement' => true,
             'length' => '8',
             ));
        $this->hasColumn('code', 'string', 15, array(
             'type' => 'string',
             'autoincrement' => false,
             'length' => '15',
             ));
        $this->hasColumn('name', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('address', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('legal_person', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('license_no', 'string', 15, array(
             'type' => 'string',
             'length' => '15',
             ));
        $this->hasColumn('tax_no', 'string', 20, array(
             'type' => 'string',
             'length' => '20',
             ));
        $this->hasColumn('id_card', 'string', 18, array(
             'type' => 'string',
             'length' => '18',
             ));
        $this->hasColumn('contact', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('acquirer_id', 'string', 10, array(
             'type' => 'string',
             'length' => '10',
             ));
        $this->hasColumn('branch', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('account', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('mcc', 'string', 4, array(
             'type' => 'string',
             'length' => '4',
             ));
        $this->hasColumn('rate', 'string', 20, array(
             'type' => 'string',
             'length' => '20',
             ));
        $this->hasColumn('post', 'string', 6, array(
             'type' => 'string',
             'length' => '6',
             ));
        $this->hasColumn('is_change_acquirer', 'boolean', null, array(
             'type' => 'boolean',
             ));
        $this->hasColumn('is_guarantee', 'boolean', null, array(
             'type' => 'boolean',
             ));
        $this->hasColumn('is_discount', 'boolean', null, array(
             'type' => 'boolean',
             ));
        $this->hasColumn('is_comfirm_risk', 'boolean', null, array(
             'type' => 'boolean',
             ));
        $this->hasColumn('is_close_creditcard', 'boolean', null, array(
             'type' => 'boolean',
             ));
        $this->hasColumn('draft', 'boolean', null, array(
             'type' => 'boolean',
             'default' => false,
             ));
        $this->hasColumn('create_date', 'datetime', null, array(
             'type' => 'datetime',
             ));
        $this->hasColumn('send_date', 'date', 25, array(
             'type' => 'date',
             'length' => '25',
             ));
        $this->hasColumn('receive_date', 'date', 25, array(
             'type' => 'date',
             'length' => '25',
             ));
        $this->hasColumn('comment', 'string', 255, array(
             'type' => 'string',
             'length' => '255',
             ));
        $this->hasColumn('export_to_oss', 'boolean', null, array(
             'type' => 'boolean',
             ));
        $this->hasColumn('export_to_unionpay', 'boolean', null, array(
             'type' => 'boolean',
             ));
        $this->hasColumn('upload_scan_file', 'boolean', null, array(
             'type' => 'boolean',
             ));
        $this->hasColumn('export_to_excel', 'boolean', null, array(
             'type' => 'boolean',
             ));
        $this->hasColumn('new_one', 'boolean', null, array(
             'type' => 'boolean',
             ));
    }

    public function setUp()
    {
        parent::setUp();
        $this->hasOne('Acquirer', array(
             'local' => 'acquirer_id',
             'foreign' => 'id'));

        $this->hasMany('Terminal', array(
             'local' => 'id',
             'foreign' => 'merchant_id'));
    }
}