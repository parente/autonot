export type TimeSolutionType = {
  mode: 'time';
  tasks: string;
  frequencyUnit: number;
  frequencyUnitLabel: string;
  savings: string;
  savingsUnit: number;
  savingsUnitLabel: string;
  investment: string;
  investmentUnit: number;
  investmentUnitLabel: string;
  lifetime: string;
  lifetimeUnit: number;
  lifetimeUnitLabel: string;
};

export type MoneySolutionType = {
  mode: 'money';
  costRateUsd: string;
  costRateUnit: number;
  costRateUnitLabel: string;
  savingsRateUsd: string;
  savingsRateUnit: number;
  savingsRateUnitLabel: string;
  lifetime: string;
  lifetimeUnit: number;
  lifetimeUnitLabel: string;
  investment: string | null;
  investmentUnit: number;
  investmentUnitLabel: string | null;
};

export type SolutionType = TimeSolutionType | MoneySolutionType;
