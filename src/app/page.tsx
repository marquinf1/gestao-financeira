'use client'
import { useState } from 'react';
import { textEditor } from 'react-data-grid';
import './App.css';
import TransactionForm from './components/TransactionForm';
import { useFinanceStore } from './store/financeStore';

const columns = [
  { key: 'amount', name: 'Gastos', editor: textEditor },
  { key: 'category', name: 'Categoria', editor: textEditor, width: 200 }
];

const App = () => {
  const transactions = useFinanceStore(state => state.transactions);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const remaining = parseFloat(monthlyIncome || "0") - totalExpenses; // Calcula o saldo restante

  return (
    <div className="app-container p-4 bg-white min-h-screen">
  <h1 className="text-center text-xl font-bold mb-4">Gestão Financeira</h1>
  <input
    type="text"
    placeholder="Informe o valor recebido no mês"
    value={monthlyIncome}
    onChange={e => setMonthlyIncome(e.target.value)}
    className="mb-4 p-2 border rounded w-full"
  />
  <TransactionForm />
  <div className="flex justify-between text-black mt-4">
    <div className="w-1/2">
      <div className="flex-table-header">Gastos</div>
      {transactions.map((transaction, index) => (
        <div key={index} className="flex-table-cell">
          R${transaction.amount}
        </div>
      ))}
    </div>
    <div className="w-1/2">
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