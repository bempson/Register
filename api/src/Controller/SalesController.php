<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Sales Controller
 *
 * @property \App\Model\Table\SalesTable $Sales
 *
 * @method \App\Model\Entity\Sale[] paginate($object = null, array $settings = [])
 */
class SalesController extends AppController
{
    /*** Index method ***/
    public function index()
    {
        $this->paginate = [
            'contain' => ['Employees', 'Customers', 'Transactions']
        ];
        $sales = $this->paginate($this->Sales);

        $this->set(compact('sales'));
        $this->set('_serialize', ['sales']);
    }
    
    /*** Get Last ***/
    public function getlast()
    {
        
        $result = $this->Sales->find('all')->all();
        $sales = $result->last();

        $this->set(compact('sales'));
        $this->set('_serialize', ['sales']);
    }
    
    /*** View method ***/
    public function view($id = null)
    {
        $sale = $this->Sales->get($id, [
            'contain' => ['Employees', 'Customers', 'Transactions']
        ]);

        $this->set('sale', $sale);
        $this->set('_serialize', ['sale']);
    }

    /*** View method ***/
    public function getOne($id = null)
    {
        $sale = $this->Sales->get($id, [
            'contain' => ['Employees', 'Customers']
        ]);

        $this->set('sale', $sale);
        $this->set('_serialize', ['sale']);
    }
    
    /*** Add method ***/
    public function add()
    {
        $sale = $this->Sales->newEntity();
        if ($this->request->is('post')) {
            $sale = $this->Sales->patchEntity($sale, $this->request->getData());
            if ($this->Sales->save($sale)) {
                $id = $sale->id;
            }
        }
 
		$sale = $this->Sales->get($id);
        $this->set(compact('sale'));
        $this->set('_serialize', ['sale']);
    }

    /*** Edit method ***/
    public function edit($id = null)
    {
        $sale = $this->Sales->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $sale = $this->Sales->patchEntity($sale, $this->request->getData());
            if ($this->Sales->save($sale)) {

            }

        }
        $this->set(compact('sale'));
        $this->set('_serialize', ['sale']);
    }

    /*** Editall method ***/
    public function editall($id = null)
    {
        $sale = $this->Sales->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $sale = $this->Sales->patchEntity($sale, $this->request->getData());
            if ($this->Sales->save($sale)) {
                $this->Flash->success(__('The sale has been saved.'));

                //return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The sale could not be saved. Please, try again.'));
        }
        $employees = $this->Sales->Employees->find('list', ['limit' => 200]);
        $customers = $this->Sales->Customers->find('list', ['limit' => 200]);
        $this->set(compact('sale', 'employees', 'customers'));
        $this->set('_serialize', ['sale']);
    }
    
    /*** Delete method ***/
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $sale = $this->Sales->get($id);
        if ($this->Sales->delete($sale)) {
            $this->Flash->success(__('The sale has been deleted.'));
        } else {
            $this->Flash->error(__('The sale could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
