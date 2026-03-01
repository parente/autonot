export type CalculatorMode = 'time' | 'money';

export type TimeInput = {
  tasks: string;
  frequencyUnit: number;
  savings: string;
  savingsUnit: number;
  lifetime: string;
  lifetimeUnit: number;
};

export type TimeResult = {
  investment: string | null;
  investmentUnit: number;
};

export type MoneyInput = {
  costRateUsd: string;
  costRateUnit: number;
  savingsRateUsd: string;
  savingsRateUnit: number;
  lifetime: string;
  lifetimeUnit: number;
};

export type MoneyResult = {
  investment: string | null;
  investmentUnit: number;
};
