import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { MoneySolutionType } from '$types/solution.type';
import { buildMoneyPath } from './paths';

export function updateMoneyBreadcrumb(solution: MoneySolutionType) {
  if (
    browser &&
    solution.investment &&
    solution.costRateUnitLabel &&
    solution.savingsRateUnitLabel &&
    solution.lifetimeUnitLabel
  ) {
    const nextPath = buildMoneyPath(solution);
    if (window.location.pathname === nextPath) {
      return;
    }
    goto(nextPath, {
      replaceState: true,
      keepFocus: true,
    });
  }
}
