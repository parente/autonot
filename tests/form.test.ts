import { describe, expect, it } from 'vitest';

import {
  normalizeMoneyInput,
  normalizeTimeInput,
  parsePositiveNumber,
} from '../src/lib/domain/calculator/form';
import { unitLabelToValue } from '../src/lib/utils/units';

describe('parsePositiveNumber', () => {
  it('returns the number for a positive finite string', () => {
    expect(parsePositiveNumber('1')).toBe(1);
    expect(parsePositiveNumber('0.001')).toBeCloseTo(0.001);
    expect(parsePositiveNumber('1000')).toBe(1000);
  });

  it('returns null for zero', () => {
    expect(parsePositiveNumber('0')).toBeNull();
  });

  it('returns null for negative numbers', () => {
    expect(parsePositiveNumber('-1')).toBeNull();
  });

  it('returns null for non-numeric strings', () => {
    expect(parsePositiveNumber('')).toBeNull();
    expect(parsePositiveNumber('abc')).toBeNull();
    expect(parsePositiveNumber('1e')).toBeNull();
  });

  it('returns null for Infinity', () => {
    expect(parsePositiveNumber('Infinity')).toBeNull();
  });
});

describe('normalizeTimeInput', () => {
  const validRaw = {
    tasks: '1',
    frequencyUnit: unitLabelToValue('week'),
    savings: '30',
    savingsUnit: unitLabelToValue('minute'),
    lifetime: '1',
    lifetimeUnit: unitLabelToValue('year'),
  };

  it('normalizes valid inputs', () => {
    const result = normalizeTimeInput(validRaw);
    expect(result).not.toBeNull();
    expect(result?.tasks).toBe(1);
    expect(result?.savings).toBe(30);
  });

  it('returns null when tasks is non-positive', () => {
    expect(normalizeTimeInput({ ...validRaw, tasks: '0' })).toBeNull();
    expect(normalizeTimeInput({ ...validRaw, tasks: '-1' })).toBeNull();
  });

  it('returns null when savings is non-positive', () => {
    expect(normalizeTimeInput({ ...validRaw, savings: '0' })).toBeNull();
  });

  it('returns null when lifetime is invalid', () => {
    expect(normalizeTimeInput({ ...validRaw, lifetime: 'abc' })).toBeNull();
  });
});

describe('normalizeMoneyInput', () => {
  const validRaw = {
    costRateUsd: '70',
    costRateUnit: unitLabelToValue('hour'),
    savingsRateUsd: '25000',
    savingsRateUnit: unitLabelToValue('year'),
    lifetime: '1',
    lifetimeUnit: unitLabelToValue('year'),
  };

  it('normalizes valid inputs', () => {
    const result = normalizeMoneyInput(validRaw);
    expect(result).not.toBeNull();
    expect(result?.costRateUsd).toBe(70);
  });

  it('returns null when a single field is invalid', () => {
    expect(normalizeMoneyInput({ ...validRaw, costRateUsd: '0' })).toBeNull();
    expect(normalizeMoneyInput({ ...validRaw, savingsRateUsd: '-5' })).toBeNull();
    expect(normalizeMoneyInput({ ...validRaw, lifetime: 'NaN' })).toBeNull();
  });
});
