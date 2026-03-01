import { formatDurationFromSeconds } from '../../utils/units';
import type { MoneyInput, MoneyResult } from './types';

function isPositive(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

export function calculateMoneyInvestmentLimit(input: MoneyInput): MoneyResult {
  const savingsPerSecond = input.savingsRateUsd / input.savingsRateUnit;
  const costPerSecond = input.costRateUsd / input.costRateUnit;
  const savingsOverLifetime = input.lifetime * input.lifetimeUnit * savingsPerSecond;
  const investmentSeconds = savingsOverLifetime / costPerSecond;

  if (
    !isPositive(savingsPerSecond) ||
    !isPositive(costPerSecond) ||
    !isPositive(savingsOverLifetime) ||
    !isPositive(investmentSeconds)
  ) {
    return { kind: 'invalid' };
  }

  const { value, unit } = formatDurationFromSeconds(investmentSeconds);

  return {
    kind: 'valid',
    investment: value,
    investmentUnit: unit,
  };
}
