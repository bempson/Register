<?php
/**
  * @var \App\View\AppView $this
  */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('Edit Carrier'), ['action' => 'edit', $carrier->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Carrier'), ['action' => 'delete', $carrier->id], ['confirm' => __('Are you sure you want to delete # {0}?', $carrier->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Carriers'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Carrier'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Orders'), ['controller' => 'Orders', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Order'), ['controller' => 'Orders', 'action' => 'add']) ?> </li>
    </ul>
</nav>
<div class="carriers view large-9 medium-8 columns content">
    <h3><?= h($carrier->name) ?></h3>
    <table class="vertical-table">
        <tr>
            <th scope="row"><?= __('Name') ?></th>
            <td><?= h($carrier->name) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Phone') ?></th>
            <td><?= h($carrier->phone) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Id') ?></th>
            <td><?= $this->Number->format($carrier->id) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Modified') ?></th>
            <td><?= h($carrier->modified) ?></td>
        </tr>
        <tr>
            <th scope="row"><?= __('Created') ?></th>
            <td><?= h($carrier->created) ?></td>
        </tr>
    </table>
    <div class="related">
        <h4><?= __('Related Orders') ?></h4>
        <?php if (!empty($carrier->orders)): ?>
        <table cellpadding="0" cellspacing="0">
            <tr>
                <th scope="col"><?= __('Id') ?></th>
                <th scope="col"><?= __('Name') ?></th>
                <th scope="col"><?= __('Customer Id') ?></th>
                <th scope="col"><?= __('Employee Id') ?></th>
                <th scope="col"><?= __('Order Date') ?></th>
                <th scope="col"><?= __('Ship Date') ?></th>
                <th scope="col"><?= __('Carrier Id') ?></th>
                <th scope="col"><?= __('Freight') ?></th>
                <th scope="col"><?= __('Ship Name') ?></th>
                <th scope="col"><?= __('Ship Address') ?></th>
                <th scope="col"><?= __('Ship City') ?></th>
                <th scope="col"><?= __('Ship State') ?></th>
                <th scope="col"><?= __('Ship Zip') ?></th>
                <th scope="col"><?= __('Modified') ?></th>
                <th scope="col"><?= __('Created') ?></th>
                <th scope="col" class="actions"><?= __('Actions') ?></th>
            </tr>
            <?php foreach ($carrier->orders as $orders): ?>
            <tr>
                <td><?= h($orders->id) ?></td>
                <td><?= h($orders->name) ?></td>
                <td><?= h($orders->customer_id) ?></td>
                <td><?= h($orders->employee_id) ?></td>
                <td><?= h($orders->order_date) ?></td>
                <td><?= h($orders->ship_date) ?></td>
                <td><?= h($orders->carrier_id) ?></td>
                <td><?= h($orders->freight) ?></td>
                <td><?= h($orders->ship_name) ?></td>
                <td><?= h($orders->ship_address) ?></td>
                <td><?= h($orders->ship_city) ?></td>
                <td><?= h($orders->ship_state) ?></td>
                <td><?= h($orders->ship_zip) ?></td>
                <td><?= h($orders->modified) ?></td>
                <td><?= h($orders->created) ?></td>
                <td class="actions">
                    <?= $this->Html->link(__('View'), ['controller' => 'Orders', 'action' => 'view', $orders->id]) ?>
                    <?= $this->Html->link(__('Edit'), ['controller' => 'Orders', 'action' => 'edit', $orders->id]) ?>
                    <?= $this->Form->postLink(__('Delete'), ['controller' => 'Orders', 'action' => 'delete', $orders->id], ['confirm' => __('Are you sure you want to delete # {0}?', $orders->id)]) ?>
                </td>
            </tr>
            <?php endforeach; ?>
        </table>
        <?php endif; ?>
    </div>
</div>
