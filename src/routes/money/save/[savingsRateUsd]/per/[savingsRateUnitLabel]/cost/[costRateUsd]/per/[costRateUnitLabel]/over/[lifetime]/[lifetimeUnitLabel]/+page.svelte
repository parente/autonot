<script lang="ts">
  import type { PageProps } from './$types';
  import CalculatorContainer from '$lib/components/calculator/CalculatorContainer.svelte';
  import { updateBreadcrumb } from '$lib/utils/breadcrumb';
  import { unitLabelToValue } from '$lib/utils/units';

  let { params }: PageProps = $props();
</script>

<CalculatorContainer
  onSolve={updateBreadcrumb}
  syncOnInit={true}
  mode="money"
  costRateUsd={params.costRateUsd}
  costRateUnit={unitLabelToValue(params.costRateUnitLabel)}
  savingsRateUsd={params.savingsRateUsd}
  savingsRateUnit={unitLabelToValue(params.savingsRateUnitLabel)}
  lifetime={params.lifetime}
  lifetimeUnit={unitLabelToValue(params.lifetimeUnitLabel)}
/>
