import { describe, expect, it } from 'vitest';

import { toMoneySolution, toTimeSolution } from '../src/lib/domain/calculator/solution-mappers';
import { unitLabelToValue } from '../src/lib/utils/units';

describe('solution mappers', () => {
  it('maps valid time result with correct labels', () => {
    const solution = toTimeSolution(
      {
        tasks: '1',
        frequencyUnit: unitLabelToValue('week'),
        savings: '30',
        savingsUnit: unitLabelToValue('minute'),
        lifetime: '1',
        lifetimeUnit: unitLabelToValue('year'),
      },
      {
        kind: 'valid',
        investment: '1.1',
        investmentUnit: unitLabelToValue('day'),
        personInvestment: '8.2',
        personInvestmentUnit: unitLabelToValue('person-day'),
      }
    );

    expect(solution.mode).toBe('time');
    expect(solution.frequencyUnitLabel).toBe('week');
    expect(solution.savingsUnitLabel).toBe('minutes');
    expect(solution.investmentUnitLabel).toBe('days');
  });

  it('maps invalid time result to null investment fields', () => {
    const solution = toTimeSolution(
      {
        tasks: '0',
        frequencyUnit: unitLabelToValue('week'),
        savings: '30',
        savingsUnit: unitLabelToValue('minute'),
        lifetime: '1',
        lifetimeUnit: unitLabelToValue('year'),
      },
      { kind: 'invalid' }
    );

    expect(solution.investment).toBeNull();
    expect(solution.investmentUnitLabel).toBeNull();
  });

  it('maps valid money result with unit labels', () => {
    const solution = toMoneySolution(
      {
        costRateUsd: '70',
        costRateUnit: unitLabelToValue('hour'),
        savingsRateUsd: '25000',
        savingsRateUnit: unitLabelToValue('year'),
        lifetime: '1',
        lifetimeUnit: unitLabelToValue('year'),
      },
      {
        kind: 'valid',
        investment: '2.3',
        investmentUnit: unitLabelToValue('day'),
        personInvestment: '1.0',
        personInvestmentUnit: unitLabelToValue('person-week'),
      }
    );

    expect(solution.mode).toBe('money');
    expect(solution.costRateUnitLabel).toBe('hour');
    expect(solution.savingsRateUnitLabel).toBe('year');
    expect(solution.investmentUnitLabel).toBe('days');
  });
});
