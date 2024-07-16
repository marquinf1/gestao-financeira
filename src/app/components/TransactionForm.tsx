'use client'

import { useState } from 'react';

interface TransactionFormProps {
  onAddTransaction: (transaction: { amount: number; category: string }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount || !category) {
    alert("Preencha todos os campos");
    return;
    }
    const transaction = {
     amount: parseFloat(amount),
      category
  };
    await onAddTransaction(transaction);
    window.dispatchEvent(new Event('transaction-added'));
    setAmount('');
    setCategory('');
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Valor do Gasto"
        className="mb-2 p-2 border rounded"
      />
      <input
        type="text"
        value={category}
        onChange={e => setCategory(e.target.value)}
        placeholder="Categoria"
        className="mb-2 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white">Adicionar Gasto</button>
    </form>
  );
};

export default TransactionForm;

