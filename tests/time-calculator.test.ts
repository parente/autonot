import { describe, expect, it } from 'vitest';

import { calculateTime } from '../src/lib/domain/calculator/time';
import { unitLabelToValue } from '../src/lib/utils/units';

describe('calculateTime', () => {
  it('calculates investment time for normal scenario', () => {
    const result = calculateTime({
      tasks: 1,
      frequencyUnit: unitLabelToValue('week'),
      savings: 30,
      savingsUnit: unitLabelToValue('minute'),
      lifetime: 1,
      lifetimeUnit: unitLabelToValue('year'),
    });

    expect(result.kind).toBe('valid');
    if (result.kind === 'valid') {
      expect(result.investment).toBe('1.1');
      expect(result.investmentUnit).toBe(unitLabelToValue('day'));
    }
  });

  it('returns invalid for non-positive values', () => {
    const result = calculateTime({
      tasks: 0,
      frequencyUnit: unitLabelToValue('week'),
      savings: 30,
      savingsUnit: unitLabelToValue('minute'),
      lifetime: 1,
      lifetimeUnit: unitLabelToValue('year'),
    });

    expect(result.kind).toBe('invalid');
  });

  it('handles boundary where result is less than one second', () => {
    const result = calculateTime({
      tasks: 1,
      frequencyUnit: unitLabelToValue('year'),
      savings: 0.00001,
      savingsUnit: unitLabelToValue('second'),
      lifetime: 1,
      lifetimeUnit: unitLabelToValue('year'),
    });

    expect(result.kind).toBe('valid');
    if (result.kind === 'valid') {
      expect(result.investment).toBe('0.000010');
      expect(result.investmentUnit).toBe(unitLabelToValue('second'));
    }
  });

  it('uses largest unit where value is >= 1 for large values', () => {
    const result = calculateTime({
      tasks: 100,
      frequencyUnit: unitLabelToValue('day'),
      savings: 1,
      savingsUnit: unitLabelToValue('hour'),
      lifetime: 10,
      lifetimeUnit: unitLabelToValue('year'),
    });

    expect(result.kind).toBe('valid');
    if (result.kind === 'valid') {
      expect(result.investmentUnit).toBe(unitLabelToValue('year'));
    }
  });
});
