<?php
/**
  * @var \App\View\AppView $this
  */
?>
<nav class="large-2 medium-3 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $transaction->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $transaction->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List Transactions'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Sales'), ['controller' => 'Sales', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Sale'), ['controller' => 'Sales', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Orders'), ['controller' => 'Orders', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Order'), ['controller' => 'Orders', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Products'), ['controller' => 'Products', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Product'), ['controller' => 'Products', 'action' => 'add']) ?></li>
    </ul>
</nav>
<div class="transactions form large-10 medium-8 columns content">
	<div class="medium-5">
        <?= $this->Form->create($transaction) ?>
        <fieldset>
            <legend><?= __('Edit Transaction') ?></legend>
            <?php
                echo $this->Form->control('sale_id', ['options' => $sales, 'empty' => true]);
                echo $this->Form->control('order_id', ['options' => $orders, 'empty' => true]);
                echo $this->Form->control('product_id', ['options' => $products, 'empty' => true]);
                echo $this->Form->control('quanity', ['onchange' => "updateSub(this.value)"]);
                //$this->Form->script->get('quanity')->event('change');
                echo $this->Form->control('price');
                echo $this->Form->control('subtotal');
                echo $this->Form->control('tax', ['value' => '0.06']);
                echo $this->Form->control('amount');
                echo $this->Form->control('taxable', ['type' => 'checkbox']);
            ?>
        </fieldset>
        <?= $this->Form->button(__('Submit')) ?>
        <?= $this->Form->end() ?>
    </div>
</div>

<div><p id="demo"></p></div>
