<?php
/**
  * @var \App\View\AppView $this
  */
?>
<nav class="large-2 medium-3 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('Home'), ['controller' => 'Pages', 'action' => 'display']) ?></li>
        <li><?= $this->Html->link(__('Edit Product'), ['action' => 'edit', $product->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Product'), ['action' => 'delete', $product->id], ['confirm' => __('Are you sure you want to delete # {0}?', $product->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Products'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Product'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Discounts'), ['controller' => 'Discounts', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Discount'), ['controller' => 'Discounts', 'action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Transactions'), ['controller' => 'Transactions', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Transaction'), ['controller' => 'Transactions', 'action' => 'add']) ?> </li>
    </ul>
</nav>
<div class="products view large-10 medium-8 columns content">
	<div class="medium-5">
    <h3><?= h($product->name) ?></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><?= __('Name') ?></th>
            <td><?= h($product->name) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Quanity Per Unit') ?></th>
            <td><?= h($product->quanity_Per_unit) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Unit Price') ?></th>
            <td><?= h($product->unit_price) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Units In Stock') ?></th>
            <td><?= h($product->units_in_stock) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Units On Order') ?></th>
            <td><?= h($product->units_on_order) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Reorder Level') ?></th>
            <td><?= h($product->reorder_level) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Barcode') ?></th>
            <td><?= h($product->barcode) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Id') ?></th>
            <td><?= $this->Number->format($product->id) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Category Id') ?></th>
            <td><?= $this->Number->format($product->category_id) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Supplier Id') ?></th>
            <td><?= $this->Number->format($product->supplier_id) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Discontinued') ?></th>
            <td><?= $this->Number->format($product->discontinued) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Modified') ?></th>
            <td><?= h($product->modified) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Created') ?></th>
            <td><?= h($product->created) ?></td>
        </tr>
    </table>
    </div>
    <div class="related">
        <h4><?= __('Related Discounts') ?></h4>
        <?php if (!empty($product->discounts)): ?>
        <table cellpadding="0" cellspacing="0">
            <tr>
                <th scope="col"><?= __('Id') ?></th>
                <th scope="col"><?= __('Name') ?></th>
                <th scope="col"><?= __('Product Id') ?></th>
                <th scope="col"><?= __('Product All') ?></th>
                <th scope="col"><?= __('Discount') ?></th>
                <th scope="col"><?= __('Start Date') ?></th>
                <th scope="col"><?= __('End Date') ?></th>
                <th scope="col"><?= __('Modified') ?></th>
                <th scope="col"><?= __('Created') ?></th>
                <th scope="col" class="actions"><?= __('Actions') ?></th>
            </tr>
            <?php foreach ($product->discounts as $discounts): ?>
            <tr>
                <td><?= h($discounts->id) ?></td>
                <td><?= h($discounts->name) ?></td>
                <td><?= h($discounts->product_id) ?></td>
                <td><?= h($discounts->product_all) ?></td>
                <td><?= h($discounts->discount) ?></td>
                <td><?= h($discounts->start_date) ?></td>
                <td><?= h($discounts->end_date) ?></td>
                <td><?= h($discounts->modified) ?></td>
                <td><?= h($discounts->created) ?></td>
                <td class="actions">
                    <?= $this->Html->link(__('View'), ['controller' => 'Discounts', 'action' => 'view', $discounts->id]) ?>
                    <?= $this->Html->link(__('Edit'), ['controller' => 'Discounts', 'action' => 'edit', $discounts->id]) ?>
                    <?= $this->Form->postLink(__('Delete'), ['controller' => 'Discounts', 'action' => 'delete', $discounts->id], ['confirm' => __('Are you sure you want to delete # {0}?', $discounts->id)]) ?>
                </td>
            </tr>
            <?php endforeach; ?>
        </table>
        <?php endif; ?>
    </div>
    <div class="related">
        <h4><?= __('Related Transactions') ?></h4>
        <?php if (!empty($product->transactions)): ?>
        <table cellpadding="0" cellspacing="0">
            <tr>
                <th scope="col"><?= __('Id') ?></th>
                <th scope="col"><?= __('Sale Id') ?></th>
                <th scope="col"><?= __('Order Id') ?></th>
                <th scope="col"><?= __('Product Id') ?></th>
                <th scope="col"><?= __('Count') ?></th>
                <th scope="col"><?= __('Price') ?></th>
                <th scope="col"><?= __('Modified') ?></th>
                <th scope="col"><?= __('Created') ?></th>
                <th scope="col" class="actions"><?= __('Actions') ?></th>
            </tr>
            <?php foreach ($product->transactions as $transactions): ?>
            <tr>
                <td><?= h($transactions->id) ?></td>
                <td><?= h($transactions->sale_id) ?></td>
                <td><?= h($transactions->order_id) ?></td>
                <td><?= h($transactions->product_id) ?></td>
                <td><?= h($transactions->count) ?></td>
                <td><?= h($transactions->price) ?></td>
                <td><?= h($transactions->modified) ?></td>
                <td><?= h($transactions->created) ?></td>
                <td class="actions">
                    <?= $this->Html->link(__('View'), ['controller' => 'Transactions', 'action' => 'view', $transactions->id]) ?>
                    <?= $this->Html->link(__('Edit'), ['controller' => 'Transactions', 'action' => 'edit', $transactions->id]) ?>
                    <?= $this->Form->postLink(__('Delete'), ['controller' => 'Transactions', 'action' => 'delete', $transactions->id], ['confirm' => __('Are you sure you want to delete # {0}?', $transactions->id)]) ?>
                </td>
            </tr>
            <?php endforeach; ?>
        </table>
        <?php endif; ?>
    </div>
</div>
