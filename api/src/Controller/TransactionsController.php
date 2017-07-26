<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\I18n\Number;

/**
 * Transactions Controller
 *
 * @property \App\Model\Table\TransactionsTable $Transactions
 *
 * @method \App\Model\Entity\Transaction[] paginate($object = null, array $settings = [])
 */
class TransactionsController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|null
     */
    public function index()
    {
       /**
        * REST API Call
        */
        $this->paginate = [
            'contain' => ['Sales', 'Orders', 'Products']
        ];
        $transactions = $this->paginate($this->Transactions);

        $this->set(compact('transactions'));
        $this->set('_serialize', ['transactions']);

    }

    public function getTrans($sale_id = null)
    {
        $transaction = $this->Transactions->find('all')
              ->where(['sale_id' => $sale_id]);

        $this->set('transaction', $transaction);
        $this->set('_serialize', ['transaction']);
    }
        
    public function bySaleId($sale_id = null)
    {
        $transaction = $this->Transactions->find('all', ['contain' => ['Sales', 'Products']])
              ->where(['sale_id' => $sale_id]);

        $this->set('transaction', $transaction);
        $this->set('_serialize', ['transaction']);
    }

    public function SalesId($sale_id = null)
    {
        $transaction = $this->Transactions->find('all', ['contain' => ['Products']])
              ->where(['sale_id' => $sale_id]);

        $this->set('transaction', $transaction);
        $this->set('_serialize', ['transaction']);
    }
        
    /**
     * View method
     *
     * @param string|null $id Transaction id.
     * @return \Cake\Http\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $transaction = $this->Transactions->get($id, [
            'contain' => ['Sales', 'Orders', 'Products']
        ]);

        $this->set('transaction', $transaction);
        $this->set('_serialize', ['transaction']);
    }

    /**
     * getone method
     *
     * @param string|null $id Transaction id.
     * @return \Cake\Http\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function getone($id = null)
    {
        $transaction = $this->Transactions->get($id);

        $this->set('transaction', $transaction);
        $this->set('_serialize', ['transaction']);
    }
    
    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $transaction = $this->Transactions->newEntity();
        if ($this->request->is('post')) {
            $transaction = $this->Transactions->patchEntity($transaction, $this->request->getData());
            if ($this->Transactions->save($transaction)) {
                //$this->Flash->success(__('The transaction has been saved.'));

                //return $this->redirect(['action' => 'index']);
            }
           $this->Flash->error(__('The transaction could not be saved. Please, try again.'));
        }
        $sales = $this->Transactions->Sales->find('list', ['limit' => 200]);
        $orders = $this->Transactions->Orders->find('list', ['limit' => 200]);
        $products = $this->Transactions->Products->find('list', ['limit' => 200]);
        $this->set(compact('transaction', 'sales', 'orders', 'products'));
        $this->set('_serialize', ['transaction']);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function addItem($id = null)
    {
        $transaction = $this->Transactions->newEntity();
        if ($this->request->is('post')) {
            $transaction = $this->Transactions->patchEntity($transaction, $this->request->getData());
            if ($this->Transactions->save($transaction)) {
                $this->Flash->success(__('The transaction has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The transaction could not be saved. Please, try again.'));
        }
    
        $lastsale = $this->Transactions->Sales->find('all')->all();
        $sales = $this->Transactions->Sales->find('list', ['limit' => 200]);
        $products = $this->Transactions->Products->find('list', ['limit' => 200]);
        $this->set(compact('transaction', 'sales', 'orders', 'products', 'lastsale'));
        $this->set('_serialize', ['transaction']);
    }
    
    /**
     * Edit method
     *
     * @param string|null $id Transaction id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $transaction = $this->Transactions->get($id); //, ['contain' => [] ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $transaction = $this->Transactions->patchEntity($transaction, $this->request->getData(), ['validate' => false]);
            if ($this->Transactions->save($transaction)) {
                //$this->Flash->success(__('The transaction has been saved.'));

                //return $this->redirect(['action' => 'index']);
            }
            //$this->Flash->error(__('The transaction could not be saved. Please, try again.'));
        }
        //$sales = $this->Transactions->Sales->find('list', ['limit' => 200]);
        //$orders = $this->Transactions->Orders->find('list', ['limit' => 200]);
        //$products = $this->Transactions->Products->find('list', ['limit' => 200]);
        //$this->set(compact('transaction', 'sales', 'orders', 'products'));
        $this->set(compact('transaction'));
        $this->set('_serialize', ['transaction']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Transaction id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $transaction = $this->Transactions->get($id);
        if ($this->Transactions->delete($transaction)) {
            //$this->Flash->success(__('The transaction has been deleted.'));
        } else {
            //$this->Flash->error(__('The transaction could not be deleted. Please, try again.'));
        }

        //return $this->redirect(['action' => 'index']);
    }
    
    public function editdev($id = null)
    {
        $transaction = $this->Transactions->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $transaction = $this->Transactions->patchEntity($transaction, $this->request->getData());
            if ($this->Transactions->save($transaction)) {
                $this->Flash->success(__('The transaction has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The transaction could not be saved. Please, try again.'));
        }
        $sales = $this->Transactions->Sales->find('list', ['limit' => 200]);
        $orders = $this->Transactions->Orders->find('list', ['limit' => 200]);
        $products = $this->Transactions->Products->find('list', ['limit' => 200]);
        $this->set(compact('transaction', 'sales', 'orders', 'products'));
        $this->set('_serialize', ['transaction']);
    }
}
