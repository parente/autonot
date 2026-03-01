export type TimePathParts = {
  tasks: string;
  frequencyUnitLabel: string;
  savings: string;
  savingsUnitLabel: string;
  lifetime: string;
  lifetimeUnitLabel: string;
};

export type MoneyPathParts = {
  costRateUsd: string;
  costRateUnitLabel: string;
  savingsRateUsd: string;
  savingsRateUnitLabel: string;
  lifetime: string;
  lifetimeUnitLabel: string;
};

export function buildTimePath(parts: TimePathParts): string {
  return (
    `/save/${encodeURIComponent(parts.savings)}/${encodeURIComponent(parts.savingsUnitLabel)}` +
    `/on/${encodeURIComponent(parts.tasks)}/per/${encodeURIComponent(parts.frequencyUnitLabel)}` +
    `/over/${encodeURIComponent(parts.lifetime)}/${encodeURIComponent(parts.lifetimeUnitLabel)}`
  );
}

export function buildMoneyPath(parts: MoneyPathParts): string {
  return (
    `/money/save/${encodeURIComponent(parts.savingsRateUsd)}/per/${encodeURIComponent(parts.savingsRateUnitLabel)}` +
    `/cost/${encodeURIComponent(parts.costRateUsd)}/per/${encodeURIComponent(parts.costRateUnitLabel)}` +
    `/over/${encodeURIComponent(parts.lifetime)}/${encodeURIComponent(parts.lifetimeUnitLabel)}`
  );
}

export function parseTimePath(path: string): TimePathParts | null {
  const match = path.match(
    /^\/save\/([^/]+)\/([^/]+)\/on\/([^/]+)\/per\/([^/]+)\/over\/([^/]+)\/([^/]+)$/
  );
  if (!match) {
    return null;
  }

  return {
    savings: decodeURIComponent(match[1]),
    savingsUnitLabel: decodeURIComponent(match[2]),
    tasks: decodeURIComponent(match[3]),
    frequencyUnitLabel: decodeURIComponent(match[4]),
    lifetime: decodeURIComponent(match[5]),
    lifetimeUnitLabel: decodeURIComponent(match[6]),
  };
}

export function parseMoneyPath(path: string): MoneyPathParts | null {
  const match = path.match(
    /^\/money\/save\/([^/]+)\/per\/([^/]+)\/cost\/([^/]+)\/per\/([^/]+)\/over\/([^/]+)\/([^/]+)$/
  );
  if (!match) {
    return null;
  }

  return {
    savingsRateUsd: decodeURIComponent(match[1]),
    savingsRateUnitLabel: decodeURIComponent(match[2]),
    costRateUsd: decodeURIComponent(match[3]),
    costRateUnitLabel: decodeURIComponent(match[4]),
    lifetime: decodeURIComponent(match[5]),
    lifetimeUnitLabel: decodeURIComponent(match[6]),
  };
}
