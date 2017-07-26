<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Product Entity
 *
 * @property int $id
 * @property string $name
 * @property int $category_id
 * @property int $supplier_id
 * @property string $quanity_Per_unit
 * @property string $unit_price
 * @property string $units_in_stock
 * @property string $units_on_order
 * @property string $reorder_level
 * @property int $discontinued
 * @property string $barcode
 * @property \Cake\I18n\FrozenTime $modified
 * @property \Cake\I18n\FrozenTime $created
 *
 * @property \App\Model\Entity\Category $category
 * @property \App\Model\Entity\Supplier $supplier
 * @property \App\Model\Entity\Discount[] $discounts
 * @property \App\Model\Entity\Transaction[] $transactions
 */
class Product extends Entity
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
