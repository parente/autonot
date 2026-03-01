import { describe, expect, it } from 'vitest';

import { calculateMoneyInvestmentLimit } from '../src/lib/domain/calculator/money';
import { unitLabelToValue } from '../src/lib/utils/units';

describe('calculateMoneyInvestmentLimit', () => {
  it('calculates max investment duration from rates and lifetime', () => {
    const result = calculateMoneyInvestmentLimit({
      costRateUsd: 100000,
      costRateUnit: unitLabelToValue('year'),
      savingsRateUsd: 30000,
      savingsRateUnit: unitLabelToValue('year'),
      lifetime: 5,
      lifetimeUnit: unitLabelToValue('year'),
    });

    expect(result.kind).toBe('valid');
    if (result.kind === 'valid') {
      expect(result.investment).toBe('1.5');
      expect(result.investmentUnit).toBe(unitLabelToValue('year'));
    }
  });

  it('calculates max investment for identical units', () => {
    const result = calculateMoneyInvestmentLimit({
      costRateUsd: 5000,
      costRateUnit: unitLabelToValue('month'),
      savingsRateUsd: 1000,
      savingsRateUnit: unitLabelToValue('month'),
      lifetime: 2,
      lifetimeUnit: unitLabelToValue('month'),
    });

    expect(result.kind).toBe('valid');
    if (result.kind === 'valid') {
      expect(result.investment).toBe('1.7');
      expect(result.investmentUnit).toBe(unitLabelToValue('week'));
    }
  });

  it('returns invalid result for non-positive derived values', () => {
    const result = calculateMoneyInvestmentLimit({
      costRateUsd: -1000,
      costRateUnit: unitLabelToValue('month'),
      savingsRateUsd: 50,
      savingsRateUnit: unitLabelToValue('month'),
      lifetime: 1,
      lifetimeUnit: unitLabelToValue('day'),
    });

    expect(result.kind).toBe('invalid');
  });

  it('handles tiny and large values', () => {
    const result = calculateMoneyInvestmentLimit({
      costRateUsd: 1000000,
      costRateUnit: unitLabelToValue('year'),
      savingsRateUsd: 1,
      savingsRateUnit: unitLabelToValue('day'),
      lifetime: 10,
      lifetimeUnit: unitLabelToValue('year'),
    });

    expect(result.kind).toBe('valid');
    if (result.kind === 'valid') {
      expect(result.investmentUnit).toBe(unitLabelToValue('day'));
    }
  });

  it('returns invalid when savings equals cost over any period', () => {
    const result = calculateMoneyInvestmentLimit({
      costRateUsd: 100,
      costRateUnit: unitLabelToValue('hour'),
      savingsRateUsd: 100,
      savingsRateUnit: unitLabelToValue('hour'),
      lifetime: 0,
      lifetimeUnit: unitLabelToValue('day'),
    });

    expect(result.kind).toBe('invalid');
  });
});
