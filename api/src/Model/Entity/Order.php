<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Order Entity
 *
 * @property int $id
 * @property string $name
 * @property int $customer_id
 * @property int $employee_id
 * @property \Cake\I18n\FrozenTime $order_date
 * @property \Cake\I18n\FrozenTime $ship_date
 * @property int $carrier_id
 * @property float $freight
 * @property string $ship_name
 * @property string $ship_address
 * @property string $ship_city
 * @property string $ship_state
 * @property string $ship_zip
 * @property \Cake\I18n\FrozenTime $modified
 * @property \Cake\I18n\FrozenTime $created
 *
 * @property \App\Model\Entity\Customer $customer
 * @property \App\Model\Entity\Employee $employee
 * @property \App\Model\Entity\Carrier $carrier
 * @property \App\Model\Entity\Transaction[] $transactions
 */
class Order extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];
}
