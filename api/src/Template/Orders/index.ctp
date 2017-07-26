<?php
/**
  * @var \App\View\AppView $this
  */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('New Order'), ['action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Customers'), ['controller' => 'Customers', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Customer'), ['controller' => 'Customers', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Employees'), ['controller' => 'Employees', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Employee'), ['controller' => 'Employees', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Carriers'), ['controller' => 'Carriers', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Carrier'), ['controller' => 'Carriers', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Transactions'), ['controller' => 'Transactions', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Transaction'), ['controller' => 'Transactions', 'action' => 'add']) ?></li>
    </ul>
</nav>
<div class="orders index large-9 medium-8 columns content">
    <h3><?= __('Orders') ?></h3>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th scope="col"><?= $this->Paginator->sort('id') ?></th>
                <th scope="col"><?= $this->Paginator->sort('name') ?></th>
                <th scope="col"><?= $this->Paginator->sort('customer_id') ?></th>
                <th scope="col"><?= $this->Paginator->sort('employee_id') ?></th>
                <th scope="col"><?= $this->Paginator->sort('order_date') ?></th>
                <th scope="col"><?= $this->Paginator->sort('ship_date') ?></th>
                <th scope="col"><?= $this->Paginator->sort('carrier_id') ?></th>
                <th scope="col"><?= $this->Paginator->sort('freight') ?></th>
                <th scope="col"><?= $this->Paginator->sort('ship_name') ?></th>
                <th scope="col"><?= $this->Paginator->sort('ship_address') ?></th>
                <th scope="col"><?= $this->Paginator->sort('ship_city') ?></th>
                <th scope="col"><?= $this->Paginator->sort('ship_state') ?></th>
                <th scope="col"><?= $this->Paginator->sort('ship_zip') ?></th>
                <th scope="col"><?= $this->Paginator->sort('modified') ?></th>
                <th scope="col"><?= $this->Paginator->sort('created') ?></th>
                <th scope="col" class="actions"><?= __('Actions') ?></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($orders as $order): ?>
            <tr>
                <td><?= $this->Number->format($order->id) ?></td>
                <td><?= h($order->name) ?></td>
                <td><?= $order->has('customer') ? $this->Html->link($order->customer->name, ['controller' => 'Customers', 'action' => 'view', $order->customer->id]) : '' ?></td>
                <td><?= $order->has('employee') ? $this->Html->link($order->employee->title, ['controller' => 'Employees', 'action' => 'view', $order->employee->id]) : '' ?></td>
                <td><?= h($order->order_date) ?></td>
                <td><?= h($order->ship_date) ?></td>
                <td><?= $order->has('carrier') ? $this->Html->link($order->carrier->name, ['controller' => 'Carriers', 'action' => 'view', $order->carrier->id]) : '' ?></td>
                <td><?= $this->Number->format($order->freight) ?></td>
                <td><?= h($order->ship_name) ?></td>
                <td><?= h($order->ship_address) ?></td>
                <td><?= h($order->ship_city) ?></td>
                <td><?= h($order->ship_state) ?></td>
                <td><?= h($order->ship_zip) ?></td>
                <td><?= h($order->modified) ?></td>
                <td><?= h($order->created) ?></td>
                <td class="actions">
                    <?= $this->Html->link(__('View'), ['action' => 'view', $order->id]) ?>
                    <?= $this->Html->link(__('Edit'), ['action' => 'edit', $order->id]) ?>
                    <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $order->id], ['confirm' => __('Are you sure you want to delete # {0}?', $order->id)]) ?>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <div class="paginator">
        <ul class="pagination">
            <?= $this->Paginator->first('<< ' . __('first')) ?>
            <?= $this->Paginator->prev('< ' . __('previous')) ?>
            <?= $this->Paginator->numbers() ?>
            <?= $this->Paginator->next(__('next') . ' >') ?>
            <?= $this->Paginator->last(__('last') . ' >>') ?>
        </ul>
        <p><?= $this->Paginator->counter(['format' => __('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')]) ?></p>
    </div>
</div>
