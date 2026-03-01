<svelte:options runes={true} />

<script lang="ts">
  import { unitValueToLabel } from '$lib/utils/units';

  type Props = {
    investment?: string | null;
    investmentUnit?: number;
  };

  let { investment = null, investmentUnit = 1 }: Props = $props();
</script>

<p>
  To fulfill these criteria, we can spend no more than <strong class="underline decoration-2 decoration-rose-300"
    >{investment ? investment : '???'} {unitValueToLabel(investment, investmentUnit)}</strong
  > optimizing.
</p>

<p>Should we invest our time?</p>
