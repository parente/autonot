<svelte:options runes={true} />

<script lang="ts">
  import type { CalculatorProps } from './calculator/types';
  import CalculatorContainer from './calculator/CalculatorContainer.svelte';

  let props: CalculatorProps = $props();
</script>

<CalculatorContainer {...props} />
