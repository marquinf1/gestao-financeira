'use client'

import React, { useState } from 'react';
import { useFinanceStore } from '../store/financeStore';


const TransactionForm: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const addTransaction = useFinanceStore(state => state.addTransaction);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) {
      alert("Preencha todos os campos");
      return;
    }
    const transaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      type: 'expense' as 'expense',
      category
    };
    addTransaction(transaction);
    setAmount('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="number"
        placeholder="Valor do Gasto"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="input border-2 p-2"
      />
      <input
        type="text"
        placeholder="Categoria"
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="input border-2 p-2"
      />
      <button type="submit" className="mb-2 button bg-blue-500 text-white p-2 rounded">Adicionar Gasto</button>
    </form>
  );
};

export default TransactionForm;
