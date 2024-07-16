import create from 'zustand';

interface Transaction {
  id: number;
  amount: number;
  category: string;
  [key: string]: number | string | undefined;
}

interface FinanceState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  setTransactions: (transactions: Transaction[]) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction]
    })),
  setTransactions: (transactions) => 
    set({ transactions })
}));