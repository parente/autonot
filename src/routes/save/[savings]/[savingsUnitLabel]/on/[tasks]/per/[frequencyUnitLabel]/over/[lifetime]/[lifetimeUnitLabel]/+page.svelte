<script lang="ts">
  import { page } from '$app/state';
  import CalculatorContainer from '$lib/components/calculator/CalculatorContainer.svelte';
  import { updateBreadcrumb } from '$lib/utils/breadcrumb';
  import { unitLabelToValue } from '$lib/utils/units';
</script>

<CalculatorContainer
  onSolve={updateBreadcrumb}
  syncOnInit={true}
  mode="time"
  tasks={page.params.tasks}
  frequencyUnit={unitLabelToValue(page.params.frequencyUnitLabel)}
  savings={page.params.savings}
  savingsUnit={unitLabelToValue(page.params.savingsUnitLabel)}
  lifetime={page.params.lifetime}
  lifetimeUnit={unitLabelToValue(page.params.lifetimeUnitLabel)}
/>
