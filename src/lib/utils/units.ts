export type OutputBasis = 'calendar' | 'person';

export type UnitDefinition = {
  key: string;
  valueSeconds: number;
  singular: string;
  plural: string;
  basis: OutputBasis;
  allowedInInput: boolean;
};

const unitDefinitions: UnitDefinition[] = [
  {
    key: 'second',
    valueSeconds: 1,
    singular: 'second',
    plural: 'seconds',
    basis: 'calendar',
    allowedInInput: true,
  },
  {
    key: 'minute',
    valueSeconds: 60,
    singular: 'minute',
    plural: 'minutes',
    basis: 'calendar',
    allowedInInput: true,
  },
  {
    key: 'hour',
    valueSeconds: 3600,
    singular: 'hour',
    plural: 'hours',
    basis: 'calendar',
    allowedInInput: true,
  },
  {
    key: 'person-day',
    valueSeconds: 28800,
    singular: 'person-day',
    plural: 'person-days',
    basis: 'person',
    allowedInInput: true,
  },
  {
    key: 'day',
    valueSeconds: 86400,
    singular: 'day',
    plural: 'days',
    basis: 'calendar',
    allowedInInput: true,
  },
  {
    key: 'person-week',
    valueSeconds: 144000,
    singular: 'person-week',
    plural: 'person-weeks',
    basis: 'person',
    allowedInInput: true,
  },
  {
    key: 'person-sprint',
    valueSeconds: 288000,
    singular: 'person-sprint',
    plural: 'person-sprints',
    basis: 'person',
    allowedInInput: true,
  },
  {
    key: 'week',
    valueSeconds: 604800,
    singular: 'week',
    plural: 'weeks',
    basis: 'calendar',
    allowedInInput: true,
  },
  {
    key: 'month',
    valueSeconds: 2592000,
    singular: 'month',
    plural: 'months',
    basis: 'calendar',
    allowedInInput: true,
  },
  {
    key: 'quarter',
    valueSeconds: 7776000,
    singular: 'quarter',
    plural: 'quarters',
    basis: 'calendar',
    allowedInInput: true,
  },
  {
    key: 'year',
    valueSeconds: 31536000,
    singular: 'year',
    plural: 'years',
    basis: 'calendar',
    allowedInInput: true,
  },
];

export function getInputUnits(): UnitDefinition[] {
  return unitDefinitions.filter((unit) => unit.allowedInInput);
}

export function getOutputUnitsByBasis(basis: OutputBasis): UnitDefinition[] {
  return unitDefinitions.filter((unit) => unit.basis === basis);
}

/** Looks up the label associated with `unitValue` and returns the singular or plural form based
 * on `value`.
 */
export function unitValueToLabel(value: string | null, unitValue: number): string {
  const def = unitDefinitions.find((u) => u.valueSeconds === unitValue);
  if (!def) throw new Error(`unexpected unit value: ${unitValue}`);
  return value === '1' || value === '1.0' ? def.singular : def.plural;
}

/** Looks up the value in seconds associated with the given singular or plural `label`. **/
export function unitLabelToValue(label: string): number {
  const def = unitDefinitions.find((u) => u.singular === label || u.plural === label);
  if (!def) throw new Error(`unexpected unit label: ${label}`);
  return def.valueSeconds;
}

/** Formats a value < 1 with enough decimal places to show at least one significant digit. */
function formatFractional(value: number): string {
  if (value === 0) return '0.0';
  if (value >= 0.1) return value.toFixed(1);
  const leadingZeros = Math.floor(-Math.log10(value));
  return value.toFixed(leadingZeros + 1);
}

/** Formats seconds into a human-friendly unit/value pair, preferring the largest unit with value >= 1. */
export function formatDurationFromSeconds(
  seconds: number,
  basis: OutputBasis = 'calendar'
): { value: string; unit: number } {
  if (!Number.isFinite(seconds) || seconds < 0) {
    throw new Error('unexpected duration');
  }

  const outputUnits = getOutputUnitsByBasis(basis);

  for (let i = 0; i <= outputUnits.length; i++) {
    if (i === outputUnits.length || outputUnits[i].valueSeconds > seconds) {
      if (i === 0) {
        return {
          value: formatFractional(seconds / outputUnits[0].valueSeconds),
          unit: outputUnits[0].valueSeconds,
        };
      }
      return {
        value: (seconds / outputUnits[i - 1].valueSeconds).toFixed(1),
        unit: outputUnits[i - 1].valueSeconds,
      };
    }
  }

  throw new Error('unreachable');
}
