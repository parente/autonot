import type { MoneySolutionType } from '$types/solution.type';
import { navigateTo } from './navigate';
import { buildMoneyPath } from './paths';

export function updateMoneyBreadcrumb(solution: MoneySolutionType) {
  if (solution.investment) {
    navigateTo(buildMoneyPath(solution));
  }
}
