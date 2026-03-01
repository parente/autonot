import { units } from '../../utils/units';
import type { TimeInput, TimeResult } from './types';

export function calculateTime(input: TimeInput): TimeResult {
  const limit =
    (Number(input.tasks) / input.frequencyUnit) *
    Number(input.lifetime) *
    input.lifetimeUnit *
    Number(input.savings) *
    input.savingsUnit;

  if (isNaN(limit) || !limit) {
    return {
      investment: null,
      investmentUnit: 1,
    };
  }

  for (let i = 0; i <= units.length; i++) {
    if (i === units.length || units[i].value > limit) {
      if (i === 0) {
        return {
          investment: '1.0',
          investmentUnit: 1,
        };
      }

      return {
        investment: (limit / units[i - 1].value).toFixed(1),
        investmentUnit: units[i - 1].value,
      };
    }
  }

  return {
    investment: null,
    investmentUnit: 1,
  };
}
