import { units } from '../../utils/units';
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

  for (let i = 0; i <= units.length; i++) {
    if (i === units.length || units[i].value > limit) {
      if (i === 0) {
        return {
          kind: 'valid',
          investment: '1.0',
          investmentUnit: 1,
        };
      }

      return {
        kind: 'valid',
        investment: (limit / units[i - 1].value).toFixed(1),
        investmentUnit: units[i - 1].value,
      };
    }
  }

  return { kind: 'invalid' };
}
