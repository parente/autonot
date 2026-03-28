import { describe, expect, it } from 'vitest';

import {
  formatDurationFromSeconds,
  unitLabelToValue,
  unitValueToLabel,
} from '../src/lib/utils/units';

describe('units helpers', () => {
  it('resolves person-based unit labels', () => {
    expect(unitLabelToValue('person-day')).toBe(28800);
    expect(unitLabelToValue('person-weeks')).toBe(144000);
    expect(unitLabelToValue('person-sprint')).toBe(288000);
  });

  it('pluralizes person-based labels', () => {
    const unit = unitLabelToValue('person-week');
    expect(unitValueToLabel('1', unit)).toBe('person-week');
    expect(unitValueToLabel('2', unit)).toBe('person-weeks');
  });

  it('formats durations in calendar basis by default', () => {
    const result = formatDurationFromSeconds(31536000);
    expect(result.value).toBe('1.0');
    expect(result.unit).toBe(unitLabelToValue('year'));
  });

  it('formats durations in person basis when requested', () => {
    const result = formatDurationFromSeconds(288000, 'person');
    expect(result.value).toBe('1.0');
    expect(result.unit).toBe(unitLabelToValue('person-sprint'));
  });

  it('formats sub-person-day durations as fractional person-days', () => {
    // 1 task/week × 15s × 1 year = 780 seconds = 0.027 person-days
    const result = formatDurationFromSeconds(780, 'person');
    expect(result.value).toBe('0.03');
    expect(result.unit).toBe(unitLabelToValue('person-day'));
  });

  it('formats zero seconds as 0.0 of the smallest unit', () => {
    const result = formatDurationFromSeconds(0, 'person');
    expect(result.value).toBe('0.0');
    expect(result.unit).toBe(unitLabelToValue('person-day'));
  });
});
