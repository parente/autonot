import { getOutputUnitsByBasis } from '../../utils/units';
import type { TimeInput, TimeResult } from './types';

function formatForBasis(
  seconds: number,
  basis: 'calendar' | 'person'
): { value: string; unit: number } {
  const units = getOutputUnitsByBasis(basis);

  for (let i = 0; i <= units.length; i++) {
    if (i === units.length || units[i].valueSeconds > seconds) {
      if (i === 0) {
        return {
          value: '1.0',
          unit: units[0].valueSeconds,
        };
      }
      return {
        value: (seconds / units[i - 1].valueSeconds).toFixed(1),
        unit: units[i - 1].valueSeconds,
      };
    }
  }

  return {
    value: '1.0',
    unit: units[0].valueSeconds,
  };
}

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

  const calendarResult = formatForBasis(limit, 'calendar');
  const personResult = formatForBasis(limit, 'person');

  return {
    kind: 'valid',
    investment: calendarResult.value,
    investmentUnit: calendarResult.unit,
    personInvestment: personResult.value,
    personInvestmentUnit: personResult.unit,
  };
}
