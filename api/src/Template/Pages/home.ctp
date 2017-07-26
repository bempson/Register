<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @since         0.10.0
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
use Cake\Cache\Cache;
use Cake\Core\Configure;
use Cake\Core\Plugin;
use Cake\Datasource\ConnectionManager;
use Cake\Error\Debugger;
use Cake\Network\Exception\NotFoundException;

$this->layout = false;

$cakeDescription = 'Crafts 0.1';
?>
<!DOCTYPE html>
<html>
<head>
    <?= $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <?= $cakeDescription ?>
    </title>

    <?= $this->Html->meta('icon') ?>
    <?= $this->Html->css('bootstrap.min.css') ?>
    <?= $this->Html->css('jumbotron-narrow.css') ?>
    <?= $this->Html->css('font-awesome.css') ?>

</head>

<body>

  <div class="container">

    <div class="jumbotron">
      <h1>Empson's Crafts</h1>
      <p class="lead"></p>
      <p><a class="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p>
    </div>
    
    <div class="row marketing">  
      <div class="col-lg-6">
        <h3>Contents</h3>
        <ul class="nav">
          <li><a href="sales"><i class="fa fa-dashboard fa-fw"></i> Sales</a></li>
        </ul>
        <ul class="nav">
          <li><a href="users"><i class="fa fa-user fa-fw"></i> Users</a></li>
          <li class="bullet book"><a href="employees">Employees</a></li>
          <li class="bullet book"><a href="products">Products</a></li>
        </ul>
        <p>
      </div>
    </div>

    <footer class="footer">
      <p>&copy; 2015 Company, Inc.</p>
    </footer>

  </div> <!-- /container -->
  
</body

</html>
