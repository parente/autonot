import type { CalculatorMode } from '$lib/domain/calculator';
import type { SolutionType } from '$types/solution.type';

export type CalculatorProps = {
  onSolve?: (solution: SolutionType) => void;
  syncOnInit?: boolean;
  mode?: CalculatorMode;
  tasks?: string;
  frequencyUnit?: number;
  savings?: string;
  savingsUnit?: number;
  lifetime?: string;
  lifetimeUnit?: number;
  costRateUsd?: string;
  costRateUnit?: number;
  savingsRateUsd?: string;
  savingsRateUnit?: number;
};
