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
                echo $this->Form->control('product_id', ['options' => $products, 'empty' => true]);
                echo $this->Form->control('quanity', ['id' => 'quanityID', 'onchange' => "updatesub()"]);
            ?>
            
            <?php
                echo $this->Form->control('price', ['id' => 'priceID']);
                echo $this->Form->control('subtotal', ['id' => 'subtotalID']);
                echo $this->Form->control('tax', ['id'=> 'taxID', 'value' => '0.06']);
                echo $this->Form->control('amount', ['id' => 'amountID']);
                echo $this->Form->control('taxable', ['type' => 'checkbox']);
            ?>
        </fieldset>
        <?= $this->Form->button(__('Submit')) ?>
        <?= $this->Form->end() ?>
    </div>
    <div><p id="demo"></p></div>
</div>


<?php
/*******
 * 
<p>Select a new car from the list.</p>

<select id="mySelect" onchange="myFunction()">
  <option value="Audi">Audi
  <option value="BMW">BMW
  <option value="Mercedes">Mercedes
  <option value="Volvo">Volvo
</select>

<p>When you select a new car, a function is triggered which outputs the value of the selected car.</p>

<p id="demo"></p>

<script>
function myFunction() {
    var x = document.getElementById("mySelect").value;
    document.getElementById("demo").innerHTML = "You selected: " + x;
}
</script>
 *
*******/


?>
