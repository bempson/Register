<?php
namespace App\Test\TestCase\Controller;

use App\Controller\TransactionsController;
use Cake\TestSuite\IntegrationTestCase;

/**
 * App\Controller\TransactionsController Test Case
 */
class TransactionsControllerTest extends IntegrationTestCase
{

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.transactions',
        'app.sales',
        'app.employees',
        'app.orders',
        'app.customers',
        'app.carriers',
        'app.users',
        'app.products',
        'app.catagories',
        'app.suppliers',
        'app.discounts'
    ];

    /**
     * Test index method
     *
     * @return void
     */
    public function testIndex()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test view method
     *
     * @return void
     */
    public function testView()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test add method
     *
     * @return void
     */
    public function testAdd()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test edit method
     *
     * @return void
     */
    public function testEdit()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test delete method
     *
     * @return void
     */
    public function testDelete()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
