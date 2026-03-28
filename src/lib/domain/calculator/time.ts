import { formatDurationFromSeconds } from '../../utils/units';
import type { TimeInput, TimeResult } from './types';

export function calculateTime(input: TimeInput): TimeResult {
  const limit =
    (input.tasks / input.frequencyUnit) *
    input.lifetime *
    input.lifetimeUnit *
    input.savings *
    input.savingsUnit;

  if (!Number.isFinite(limit) || limit <= 0) {
    return { kind: 'invalid' };
  }

  const calendarResult = formatDurationFromSeconds(limit, 'calendar');
  const personResult = formatDurationFromSeconds(limit, 'person');

  return {
    kind: 'valid',
    investment: calendarResult.value,
    investmentUnit: calendarResult.unit,
    personInvestment: personResult.value,
    personInvestmentUnit: personResult.unit,
  };
}
