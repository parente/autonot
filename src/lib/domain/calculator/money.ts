import { isPositiveFinite } from '../../utils/math';
import { formatDurationFromSeconds } from '../../utils/units';
import type { MoneyInput, MoneyResult } from './types';

function isPositive(value: number): boolean {
  return isPositiveFinite(value);
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

  const calendarResult = formatDurationFromSeconds(investmentSeconds, 'calendar');
  const personResult = formatDurationFromSeconds(investmentSeconds, 'person');

  return {
    kind: 'valid',
    investment: calendarResult.value,
    investmentUnit: calendarResult.unit,
    personInvestment: personResult.value,
    personInvestmentUnit: personResult.unit,
  };
}
