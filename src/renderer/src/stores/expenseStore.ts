import { create } from 'zustand';

// Base interfaces
export interface Expense {
  date: string;
  category: string;
  amount: number;
}

export interface PlannedExpense {
  category: string;
  amount: number;
  lastUpdated: Date;
}

export interface BudgetAllocations {
  Rent: number;
  Groceries: number;
  Insurance: number;
  Transportation: number;
  Entertainment: number;
  'Dining Out': number;
  Clothes: number;
  Other: number;
  Savings: number;
}

// NEW INTERFACES for the budget plan
export interface SpendingGoal {
  category: string;
  targetAmount: number;
  alertThreshold: number; // a percentage at which to trigger the alert system
  currentAmount: number;
}

// Custom Category management
export interface CustomCategory {
  name: string;
  type: 'essential' | 'discretionary';
  budgetPercentage: number;
  isActive: boolean;
}

// For budget history tracking
export interface BudgetHistory {
  date: Date;
  allocations: BudgetAllocations; // Adjusted to avoid recursive type
  actualSpending: { [category: string]: number };
  savings: number;
}

// For savings goals tracking
export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  deadline: Date;
  currentAmount: number;
  monthlyContribution: number;
  isActive: boolean;
}

// For bill scheduling and tracking
export interface BillSchedule {
  id: string;
  category: string;
  dueDate: Date;
  amount: number;
  isRecurring: boolean;
  frequency: 'monthly' | 'quarterly' | 'annual';
  lastPaid?: Date;
  nextDueDate: Date;
}

// Store state interface
interface ExpenseState {
  monthlyTotal: string;
  setMonthlyTotal: (monthlyTotal: string) => void;
  resetMonthlyTotal: () => void;
  topCategory: string;
  setTopCategory: (topCategory: string) => void;
  expenseCount: number;
  setExpenseCount: (expenseCount: number) => void;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  income: number;
  setIncome: (income: number) => void;
  savingsGoal: number;
  setSavingsGoal: (savingsGoal: number) => void;
  budgetAllocation: BudgetAllocations;
  setBudgetAllocation: (budgetAllocation: BudgetAllocations) => void;
  isPlanGenerated: boolean;
  setIsPlanGenerated: (isPlanGenerated: boolean) => void;

  planningMode: 'monthly' | 'annual';
  setPlanningMode: (mode: 'monthly' | 'annual') => void;

  spendingGoals: SpendingGoal[];
  setSpendingGoals: (goals: SpendingGoal[]) => void;
  addSpendingGoal: (goal: SpendingGoal) => void;
  removeSpendingGoal: (category: string) => void;

  customCategories: CustomCategory[];
  setCustomCategories: (categories: CustomCategory[]) => void;
  addCustomCategory: (category: CustomCategory) => void;
  removeCustomCategory: (name: string) => void;

  budgetHistory: BudgetHistory[];
  addBudgetSnapshot: (snapshot: BudgetHistory) => void;


  savingsGoals: SavingsGoal[];
  setSavingsGoals: (goals: SavingsGoal[]) => void;
  addSavingsGoal: (goal: SavingsGoal) => void;
  updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void;

  billSchedules: BillSchedule[];
  setBillSchedules: (bills: BillSchedule[]) => void;
  addBillSchedule: (bill: BillSchedule) => void;
  updateBillSchedule: (id: string, updates: Partial<BillSchedule>) => void;
}

// Old Code: export const useExpenseStore = create<ExpenseState>()((set, get) => ...)
export const useExpenseStore = create<ExpenseState>()((set) => ({
  monthlyTotal: '$0.00',
  setMonthlyTotal: (monthlyTotal) => set({ monthlyTotal }),
  resetMonthlyTotal: () => set({ monthlyTotal: '$0.00' }),
  topCategory: '-',
  setTopCategory: (topCategory) => set({ topCategory }),
  expenseCount: 0,
  setExpenseCount: (expenseCount) => set({ expenseCount }),
  activeTab: 'expense',
  setActiveTab: (activeTab) => set({ activeTab }),
  income: 0,
  setIncome: (income) => set({ income }),
  savingsGoal: 0,
  setSavingsGoal: (savingsGoal) => set({ savingsGoal }),
  budgetAllocation: {
    Rent: 0,
    Groceries: 0,
    Insurance: 0,
    Transportation: 0,
    Entertainment: 0,
    'Dining Out': 0,
    Clothes: 0,
    Other: 0,
    Savings: 0,
  },
  setBudgetAllocation: (budgetAllocation) => set({ budgetAllocation }),
  isPlanGenerated: false,
  setIsPlanGenerated: (isPlanGenerated) => set({ isPlanGenerated }),

  planningMode: 'monthly',
  setPlanningMode: (mode) => set({ planningMode: mode }),

  spendingGoals: [],
  setSpendingGoals: (goals) => set({ spendingGoals: goals }),
  addSpendingGoal: (goal) => set((state) => ({
    spendingGoals: [...state.spendingGoals, goal],
  })),
  removeSpendingGoal: (category) => set((state) => ({
    spendingGoals: state.spendingGoals.filter((g) => g.category !== category),
  })),

  customCategories: [],
  setCustomCategories: (categories) => set({ customCategories: categories }),
  addCustomCategory: (category) => set((state) => ({
    customCategories: [...state.customCategories, category],
  })),
  removeCustomCategory: (name) => set((state) => ({
    customCategories: state.customCategories.filter((c) => c.name !== name),
  })),

  budgetHistory: [],
  addBudgetSnapshot: (snapshot) => set((state) => ({
    budgetHistory: [...state.budgetHistory, snapshot],
  })),

  savingsGoals: [],
  setSavingsGoals: (goals) => set({ savingsGoals: goals }),
  addSavingsGoal: (goal) => set((state) => ({
    savingsGoals: [...state.savingsGoals, goal],
  })),
  updateSavingsGoal: (id, updates) => set((state) => ({
    savingsGoals: state.savingsGoals.map((goal) =>
      goal.id === id ? { ...goal, ...updates } : goal
    ),
  })),

  billSchedules: [],
  setBillSchedules: (bills) => set({ billSchedules: bills }),
  addBillSchedule: (bill) => set((state) => ({
    billSchedules: [...state.billSchedules, bill],
  })),
  updateBillSchedule: (id, updates) => set((state) => ({
    billSchedules: state.billSchedules.map((bill) =>
      bill.id === id ? { ...bill, ...updates } : bill
    ),
  })),
}));
