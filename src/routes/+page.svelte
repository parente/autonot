<script lang="ts">
  import CalculatorContainer from '$lib/components/calculator/CalculatorContainer.svelte';
  import { updateBreadcrumb } from '$lib/utils/breadcrumb';
</script>

<CalculatorContainer onSolve={updateBreadcrumb} />
