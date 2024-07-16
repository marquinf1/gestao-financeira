'use client'
import { useEffect, useState } from 'react';
import { textEditor } from 'react-data-grid';
import { addTransaction, deleteTransaction, getMonthlyIncome, getTransactions, setMonthlyIncome } from '../services/indexedDB';
import './App.css';
import TransactionForm from './components/TransactionForm';
import { useFinanceStore } from './store/financeStore';



const columns = [
  { key: 'amount', name: 'Gastos', editor: textEditor },
  { key: 'category', name: 'Categoria', editor: textEditor, width: 200 }
];

const App = () => {
  const { transactions, setTransactions } = useFinanceStore(state => ({ transactions: state.transactions, setTransactions: state.setTransactions }));
  const [monthlyIncome, setMonthlyIncomeState] = useState("");

  useEffect(() => {
  const initApp = async () => {
    const loadedTransactions = await getTransactions();
    const loadedIncome = await getMonthlyIncome();
    setTransactions(loadedTransactions);
    setMonthlyIncomeState(loadedIncome || "");
  };

  initApp();
}, [setTransactions]);


  useEffect(() => {
  const loadTransactions = async () => {
    const loadedTransactions = await getTransactions();
    setTransactions(loadedTransactions);
  };

  loadTransactions();

  const transactionAdded = () => {
    loadTransactions();
  };

  window.addEventListener('transaction-added', transactionAdded);
  
  return () => {
    window.removeEventListener('transaction-added', transactionAdded);
  };
}, [setTransactions]); 


  const handleDelete = async (id: number) => {
    await deleteTransaction(id);
    const updatedTransactions = await getTransactions();
    setTransactions(updatedTransactions);
  };

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyIncomeState(e.target.value);
  };

  const handleIncomeSubmit = async () => {
    await setMonthlyIncome(monthlyIncome);
    alert("Recebimento salvo com sucesso!");
  };

  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const remaining = parseFloat(monthlyIncome || "0") - totalExpenses;

  return (
    <div className="app-container p-4 bg-white min-h-screen">
      <h1 className="text-center text-xl font-bold mb-4">Gestão Financeira</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Informe o valor recebido no mês"
          value={monthlyIncome}
          onChange={handleIncomeChange}
          className="p-2 border rounded"
        />
        <button onClick={handleIncomeSubmit} className="ml-2 p-2 bg-blue-500 text-white">Salvar Recebimento</button>
      </div>
      <TransactionForm onAddTransaction={addTransaction} />
      <div className="flex justify-between text-black mt-4">
        <div className="w-1/6">
          <div className="flex-table-header">Ação</div>
          {transactions.map((transaction, index) => (
            <div key={index} className="flex-table-cell">
              <button onClick={() => handleDelete(transaction.id)}>Excluir</button>
            </div>
          ))}
        </div>
        <div className="w-2/6">
          <div className="flex-table-header">Gastos</div>
          {transactions.map((transaction, index) => (
            <div key={index} className="flex-table-cell">
              R${transaction.amount}
            </div>
          ))}
        </div>
        <div className="w-2/6">
          <div className="flex-table-header">Categoria</div>
          {transactions.map((transaction, index) => (
            <div key={index} className="flex-table-cell">
              {transaction.category}
            </div>
          ))}
        </div>
      </div>
      <div className="font-bold mb-2">Saldo restante: R${remaining.toFixed(2)}</div>
    </div>
  );
};

export default App;