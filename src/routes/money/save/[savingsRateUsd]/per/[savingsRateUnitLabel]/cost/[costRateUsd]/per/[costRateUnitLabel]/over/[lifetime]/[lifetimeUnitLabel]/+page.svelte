<script lang="ts">
  import { page } from '$app/state';
  import CalculatorContainer from '$lib/components/calculator/CalculatorContainer.svelte';
  import { updateBreadcrumb } from '$lib/utils/breadcrumb';
  import { unitLabelToValue } from '$lib/utils/units';
</script>

<CalculatorContainer
  onSolve={updateBreadcrumb}
  syncOnInit={true}
  mode="money"
  costRateUsd={page.params.costRateUsd}
  costRateUnit={unitLabelToValue(page.params.costRateUnitLabel)}
  savingsRateUsd={page.params.savingsRateUsd}
  savingsRateUnit={unitLabelToValue(page.params.savingsRateUnitLabel)}
  lifetime={page.params.lifetime}
  lifetimeUnit={unitLabelToValue(page.params.lifetimeUnitLabel)}
/>
