import { goto } from '$app/navigation';
import type { SolutionType } from "$types/solution.type";

export function updateBreadcrumb(solution: SolutionType) {
  if(solution.investment) {
    goto(`/${encodeURIComponent(solution.taskText)}/save/${solution.savings}/${solution.savingsUnitLabel}` +
         `/on/${solution.tasks}/per/${solution.frequencyUnitLabel}` +
         `/over/${solution.lifetime}/${solution.lifetimeUnitLabel}`, {
      replaceState: true,
      keepfocus: true
    });
  }
}