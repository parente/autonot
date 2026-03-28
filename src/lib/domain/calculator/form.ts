import { isPositiveFinite } from '$lib/utils/math';
import type { MoneyInput, TimeInput } from './types';

export type TimeFormRaw = {
  tasks: string;
  frequencyUnit: number;
  savings: string;
  savingsUnit: number;
  lifetime: string;
  lifetimeUnit: number;
};

export type MoneyFormRaw = {
  costRateUsd: string;
  costRateUnit: number;
  savingsRateUsd: string;
  savingsRateUnit: number;
  lifetime: string;
  lifetimeUnit: number;
};

export function parsePositiveNumber(input: string): number | null {
  const parsed = Number(input);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

function isPositiveUnit(value: number): boolean {
  return isPositiveFinite(value);
}

export function normalizeTimeInput(raw: TimeFormRaw): TimeInput | null {
  const tasks = parsePositiveNumber(raw.tasks);
  const savings = parsePositiveNumber(raw.savings);
  const lifetime = parsePositiveNumber(raw.lifetime);

  if (
    tasks === null ||
    savings === null ||
    lifetime === null ||
    !isPositiveUnit(raw.frequencyUnit) ||
    !isPositiveUnit(raw.savingsUnit) ||
    !isPositiveUnit(raw.lifetimeUnit)
  ) {
    return null;
  }

  return {
    tasks,
    frequencyUnit: raw.frequencyUnit,
    savings,
    savingsUnit: raw.savingsUnit,
    lifetime,
    lifetimeUnit: raw.lifetimeUnit,
  };
}

export function normalizeMoneyInput(raw: MoneyFormRaw): MoneyInput | null {
  const costRateUsd = parsePositiveNumber(raw.costRateUsd);
  const savingsRateUsd = parsePositiveNumber(raw.savingsRateUsd);
  const lifetime = parsePositiveNumber(raw.lifetime);

  if (
    costRateUsd === null ||
    savingsRateUsd === null ||
    lifetime === null ||
    !isPositiveUnit(raw.costRateUnit) ||
    !isPositiveUnit(raw.savingsRateUnit) ||
    !isPositiveUnit(raw.lifetimeUnit)
  ) {
    return null;
  }

  return {
    costRateUsd,
    costRateUnit: raw.costRateUnit,
    savingsRateUsd,
    savingsRateUnit: raw.savingsRateUnit,
    lifetime,
    lifetimeUnit: raw.lifetimeUnit,
  };
}
