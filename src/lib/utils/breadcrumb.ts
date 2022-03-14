import { goto } from '$app/navigation';
import type { SolutionType } from "$types/solution.type";

export function updateBreadcrumb(solution: SolutionType) {
  if(solution.investment) {
    goto(`/save/${solution.savings}/${solution.savingsUnitLabel}/${solution.tasks}/per/${solution.frequencyUnitLabel}`, {
      replaceState: true,
      keepfocus: true
    });
  }
}