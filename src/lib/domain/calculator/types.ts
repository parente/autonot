export type CalculatorMode = 'time' | 'money';

export type TimeInput = {
  tasks: number;
  frequencyUnit: number;
  savings: number;
  savingsUnit: number;
  lifetime: number;
  lifetimeUnit: number;
};

export type MoneyInput = {
  costRateUsd: number;
  costRateUnit: number;
  savingsRateUsd: number;
  savingsRateUnit: number;
  lifetime: number;
  lifetimeUnit: number;
};

export type InvestmentValidResult = {
  kind: 'valid';
  investment: string;
  investmentUnit: number;
  personInvestment: string;
  personInvestmentUnit: number;
};

export type InvestmentInvalidResult = {
  kind: 'invalid';
};

export type TimeResult = InvestmentValidResult | InvestmentInvalidResult;
export type MoneyResult = InvestmentValidResult | InvestmentInvalidResult;
