import { unitValueToLabel } from '$lib/utils/units';
import type { MoneyFormRaw, TimeFormRaw } from './form';
import type { MoneyResult, TimeResult } from './types';
import type { MoneySolutionType, TimeSolutionType } from '$types/solution.type';

export function toTimeSolution(raw: TimeFormRaw, result: TimeResult): TimeSolutionType {
  const investment = result.kind === 'valid' ? result.investment : null;
  const investmentUnit = result.kind === 'valid' ? result.investmentUnit : 1;

  return {
    mode: 'time',
    tasks: raw.tasks,
    frequencyUnit: raw.frequencyUnit,
    frequencyUnitLabel: unitValueToLabel('1', raw.frequencyUnit),
    savings: raw.savings,
    savingsUnit: raw.savingsUnit,
    savingsUnitLabel: unitValueToLabel(raw.savings, raw.savingsUnit),
    investment,
    investmentUnit,
    investmentUnitLabel: investment ? unitValueToLabel(investment, investmentUnit) : null,
    lifetime: raw.lifetime,
    lifetimeUnit: raw.lifetimeUnit,
    lifetimeUnitLabel: unitValueToLabel(raw.lifetime, raw.lifetimeUnit),
  };
}

export function toMoneySolution(raw: MoneyFormRaw, result: MoneyResult): MoneySolutionType {
  const investment = result.kind === 'valid' ? result.investment : null;
  const investmentUnit = result.kind === 'valid' ? result.investmentUnit : 1;

  return {
    mode: 'money',
    costRateUsd: raw.costRateUsd,
    costRateUnit: raw.costRateUnit,
    costRateUnitLabel: unitValueToLabel('1', raw.costRateUnit),
    savingsRateUsd: raw.savingsRateUsd,
    savingsRateUnit: raw.savingsRateUnit,
    savingsRateUnitLabel: unitValueToLabel('1', raw.savingsRateUnit),
    lifetime: raw.lifetime,
    lifetimeUnit: raw.lifetimeUnit,
    lifetimeUnitLabel: unitValueToLabel(raw.lifetime, raw.lifetimeUnit),
    investment,
    investmentUnit,
    investmentUnitLabel: investment ? unitValueToLabel(investment, investmentUnit) : null,
  };
}
