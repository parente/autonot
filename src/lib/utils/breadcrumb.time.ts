import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { TimeSolutionType } from '$types/solution.type';
import { buildTimePath } from './paths';

export function updateTimeBreadcrumb(solution: TimeSolutionType) {
  if (browser && solution.investment) {
    const nextPath = buildTimePath(solution);
    if (window.location.pathname === nextPath) {
      return;
    }
    goto(nextPath, {
      replaceState: true,
      keepFocus: true,
    });
  }
}
