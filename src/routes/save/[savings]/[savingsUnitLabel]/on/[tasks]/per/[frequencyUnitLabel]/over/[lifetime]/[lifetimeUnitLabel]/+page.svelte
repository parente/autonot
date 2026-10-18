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
  mode="time"
  tasks={params.tasks}
  frequencyUnit={unitLabelToValue(params.frequencyUnitLabel)}
  savings={params.savings}
  savingsUnit={unitLabelToValue(params.savingsUnitLabel)}
  lifetime={params.lifetime}
  lifetimeUnit={unitLabelToValue(params.lifetimeUnitLabel)}
/>
