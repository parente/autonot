import { describe, expect, it } from 'vitest';

import {
  buildMoneyPath,
  buildTimePath,
  parseMoneyPath,
  parseTimePath,
} from '../src/lib/utils/paths';

describe('route path helpers', () => {
  it('time path build/parse round-trip', () => {
    const original = {
      tasks: '12',
      frequencyUnitLabel: 'week',
      savings: '45',
      savingsUnitLabel: 'seconds',
      lifetime: '2',
      lifetimeUnitLabel: 'years',
    };

    const path = buildTimePath(original);
    const parsed = parseTimePath(path);

    expect(parsed).toEqual(original);
  });

  it('money path build/parse round-trip', () => {
    const original = {
      savingsRateUsd: '25000',
      savingsRateUnitLabel: 'year',
      costRateUsd: '100000',
      costRateUnitLabel: 'year',
      lifetime: '5',
      lifetimeUnitLabel: 'years',
    };

    const path = buildMoneyPath(original);
    const parsed = parseMoneyPath(path);

    expect(parsed).toEqual(original);
  });

  it('parse returns null for non-matching paths', () => {
    expect(parseTimePath('/money/save/25000/per/year')).toBeNull();
    expect(parseMoneyPath('/save/30/seconds/on/1/per/week/over/5/years')).toBeNull();
  });
});
