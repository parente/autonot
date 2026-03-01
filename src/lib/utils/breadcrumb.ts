import type { SolutionType } from '$types/solution.type';
import { updateMoneyBreadcrumb } from './breadcrumb.money';
import { updateTimeBreadcrumb } from './breadcrumb.time';

export function updateBreadcrumb(solution: SolutionType) {
  if (solution.mode === 'time') {
    updateTimeBreadcrumb(solution);
    return;
  }

  updateMoneyBreadcrumb(solution);
}
