import create from 'zustand';

type Transaction = {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  category?: string;
};

interface FinanceState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),
}));
