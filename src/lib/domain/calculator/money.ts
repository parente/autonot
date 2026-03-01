import { formatDurationFromSeconds } from '../../utils/units';
import type { MoneyInput, MoneyResult } from './types';

function isPositive(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

export function calculateMoneyInvestmentLimit(input: MoneyInput): MoneyResult {
  const costRateUsd = Number(input.costRateUsd);
  const savingsRateUsd = Number(input.savingsRateUsd);
  const lifetime = Number(input.lifetime);

  if (!isPositive(lifetime) || !isPositive(costRateUsd) || !isPositive(savingsRateUsd)) {
    return {
      investment: null,
      investmentUnit: 1,
    };
  }

  const savingsPerSecond = savingsRateUsd / input.savingsRateUnit;
  const costPerSecond = costRateUsd / input.costRateUnit;
  const savingsOverLifetime = lifetime * input.lifetimeUnit * savingsPerSecond;
  const investmentSeconds = savingsOverLifetime / costPerSecond;

  if (
    !isPositive(savingsPerSecond) ||
    !isPositive(costPerSecond) ||
    !isPositive(savingsOverLifetime) ||
    !isPositive(investmentSeconds)
  ) {
    return {
      investment: null,
      investmentUnit: 1,
    };
  }

  const { value, unit } = formatDurationFromSeconds(investmentSeconds);

  return {
    investment: value,
    investmentUnit: unit,
  };
}
