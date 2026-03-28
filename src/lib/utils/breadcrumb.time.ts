import type { TimeSolutionType } from '$types/solution.type';
import { navigateTo } from './navigate';
import { buildTimePath } from './paths';

export function updateTimeBreadcrumb(solution: TimeSolutionType) {
  if (solution.investment) {
    navigateTo(buildTimePath(solution));
  }
}
