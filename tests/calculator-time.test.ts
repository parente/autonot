import { describe, expect, it } from 'vitest';

import { calculateTime } from '../src/lib/domain/calculator/time';
import { unitLabelToValue } from '../src/lib/utils/units';

describe('calculateTime', () => {
  const baseInput = {
    tasks: 10,
    frequencyUnit: unitLabelToValue('week'),
    savings: 1,
    savingsUnit: unitLabelToValue('hour'),
    lifetime: 8,
    lifetimeUnit: unitLabelToValue('week'),
  };

  it('produces both calendar and person outputs for valid input', () => {
    const result = calculateTime(baseInput);

    expect(result.kind).toBe('valid');
    if (result.kind === 'valid') {
      expect(result.investment).toBe('3.3');
      expect(result.investmentUnit).toBe(unitLabelToValue('day'));
      expect(result.personInvestment).toBe('1.0');
      expect(result.personInvestmentUnit).toBe(unitLabelToValue('person-sprint'));
    }
  });

  it('returns invalid result for invalid inputs', () => {
    const result = calculateTime({
      ...baseInput,
      tasks: 0,
    });

    expect(result.kind).toBe('invalid');
  });
});
