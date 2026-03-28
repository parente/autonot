<svelte:options runes={true} />

<script lang="ts">
  import { getInputUnits, unitLabelToValue } from '$lib/utils/units';
  import UnitSelect from './UnitSelect.svelte';

  type Props = {
    costRateUsd?: string;
    costRateUnit?: number;
    savingsRateUsd?: string;
    savingsRateUnit?: number;
    lifetime?: string;
    lifetimeUnit?: number;
    savingsRateInput?: HTMLInputElement | null;
  };

  let {
    costRateUsd = $bindable('70'),
    costRateUnit = $bindable(unitLabelToValue('hour')),
    savingsRateUsd = $bindable('25000'),
    savingsRateUnit = $bindable(unitLabelToValue('year')),
    lifetime = $bindable('1'),
    lifetimeUnit = $bindable(unitLabelToValue('year')),
    savingsRateInput = $bindable(null),
  }: Props = $props();

  const inputUnits = getInputUnits();
</script>

<p>
  We think we can save $
  <input
    type="text"
    bind:this={savingsRateInput}
    bind:value={savingsRateUsd}
    aria-label="Money saved per period in US dollars"
    required
    class="form-input
      w-24
      bg-transparent
      border-0 border-b-2 border-emerald-300
      focus:ring-0 focus:border-emerald-500
      px-3 py-0"
  />
  per
  <UnitSelect
    bind:value={savingsRateUnit}
    units={inputUnits}
    ariaLabel="Unit for money saved per period"
    class="border-emerald-300 focus:border-emerald-500"
  />
  by optimizing a workflow. Resourcing the optimization costs us $
  <input
    type="text"
    bind:value={costRateUsd}
    aria-label="Resourcing cost per period in US dollars"
    required
    class="form-input
      w-20
      bg-transparent
      border-0 border-b-2 border-sky-300
      focus:ring-0 focus:border-sky-500
      px-3 py-0"
  />
  per
  <UnitSelect
    bind:value={costRateUnit}
    units={inputUnits}
    ariaLabel="Unit for resourcing cost per period"
    class="border-sky-300 focus:border-sky-500"
  />
  of sustained effort. We want to recoup our optimization investment within
  <input
    type="text"
    bind:value={lifetime}
    aria-label="Recoup window length"
    required
    class="form-input
      w-16
      bg-transparent
      border-0 border-b-2 border-chrome-300
      focus:ring-0 focus:border-chrome-500
      px-3 py-0"
  />
  <UnitSelect
    bind:value={lifetimeUnit}
    units={inputUnits}
    ariaLabel="Recoup window unit"
    class="border-chrome-300 focus:border-chrome-500"
    quantity={lifetime}
  /> of completing it.
</p>
