
<?php
// debug($this);
/**
  * @var \App\View\AppView $this
  */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('List Transactions'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Sales'), ['controller' => 'Sales', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Sale'), ['controller' => 'Sales', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Orders'), ['controller' => 'Orders', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Order'), ['controller' => 'Orders', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Products'), ['controller' => 'Products', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Product'), ['controller' => 'Products', 'action' => 'add']) ?></li>
    </ul>
</nav>
<?php 
    $id = $this->passedArgs['0']; 
    echo $id;
?>

<div class="transactions form large-9 medium-8 columns content">
    <?= $this->Form->create($transaction) ?>
    <fieldset>
        <legend><?= __('Add Transaction') ?></legend>
        <?php
            //echo $this->Form->control('sale_id', ['options' => $id, 'empty' => true]);
            echo $this->Form->control('sale_id', ['value' => $id]);
            echo $this->Form->control('barcode');
            echo $this->Form->control('product_id', ['options' => $products, 'empty' => true]);
            echo $this->Form->control('quanity', ['value' => '0']);
            echo $this->Form->control('price');
            echo $this->Form->control('subtotal', ['id' => 'subtotalID']);
            echo $this->Form->control('tax', ['id'=> 'taxID', 'value' => '0.06']);
            echo $this->Form->control('amount', ['id' => 'amountID']);
            echo $this->Form->control('taxable', ['type' => 'checkbox']);

        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
