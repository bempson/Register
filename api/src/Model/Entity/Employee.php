<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Employee Entity
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $title
 * @property \Cake\I18n\FrozenDate $birth_date
 * @property \Cake\I18n\FrozenDate $hire_date
 * @property string $address
 * @property string $city
 * @property string $state
 * @property string $postal_code
 * @property string $home_phone
 * @property string $cell_phone
 * @property string|resource $photo
 * @property string $notes
 * @property \Cake\I18n\FrozenTime $modified
 * @property \Cake\I18n\FrozenTime $created
 *
 * @property \App\Model\Entity\Order[] $orders
 * @property \App\Model\Entity\Sale[] $sales
 * @property \App\Model\Entity\User[] $users
 */
class Employee extends Entity
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
