import { beforeEach, describe, expect, it, vi } from 'vitest';

const { goto } = vi.hoisted(() => ({ goto: vi.fn() }));

vi.mock('$app/environment', () => ({
  browser: true,
}));

vi.mock('$app/navigation', () => ({
  goto,
}));

import { updateMoneyBreadcrumb } from '../src/lib/utils/breadcrumb.money';
import { updateTimeBreadcrumb } from '../src/lib/utils/breadcrumb.time';

describe('breadcrumb sync guards', () => {
  beforeEach(() => {
    goto.mockReset();
  });

  it('does not navigate when time path is unchanged', () => {
    history.pushState({}, '', '/save/30/minutes/on/1/per/week/over/1/year');

    updateTimeBreadcrumb({
      mode: 'time',
      tasks: '1',
      frequencyUnit: 604800,
      frequencyUnitLabel: 'week',
      savings: '30',
      savingsUnit: 60,
      savingsUnitLabel: 'minutes',
      investment: '1.1',
      investmentUnit: 86400,
      investmentUnitLabel: 'days',
      lifetime: '1',
      lifetimeUnit: 31536000,
      lifetimeUnitLabel: 'year',
    });

    expect(goto).not.toHaveBeenCalled();
  });

  it('navigates when money path changes and result is valid', () => {
    history.pushState({}, '', '/');

    updateMoneyBreadcrumb({
      mode: 'money',
      costRateUsd: '70',
      costRateUnit: 3600,
      costRateUnitLabel: 'hour',
      savingsRateUsd: '25000',
      savingsRateUnit: 31536000,
      savingsRateUnitLabel: 'year',
      lifetime: '1',
      lifetimeUnit: 31536000,
      lifetimeUnitLabel: 'year',
      investment: '2.3',
      investmentUnit: 86400,
      investmentUnitLabel: 'days',
    });

    expect(goto).toHaveBeenCalledTimes(1);
    expect(goto.mock.calls[0]?.[0]).toBe('/money/save/25000/per/year/cost/70/per/hour/over/1/year');
  });

  it('does not navigate for invalid (null) investment', () => {
    history.pushState({}, '', '/');

    updateMoneyBreadcrumb({
      mode: 'money',
      costRateUsd: '70',
      costRateUnit: 3600,
      costRateUnitLabel: 'hour',
      savingsRateUsd: '25000',
      savingsRateUnit: 31536000,
      savingsRateUnitLabel: 'year',
      lifetime: '1',
      lifetimeUnit: 31536000,
      lifetimeUnitLabel: 'year',
      investment: null,
      investmentUnit: 1,
      investmentUnitLabel: null,
    });

    expect(goto).not.toHaveBeenCalled();
  });
});
