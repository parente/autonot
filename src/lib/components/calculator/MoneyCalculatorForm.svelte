<svelte:options runes={true} />

<script lang="ts">
  import { units } from '$lib/utils/units';

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
    costRateUnit = $bindable(3600),
    savingsRateUsd = $bindable('25000'),
    savingsRateUnit = $bindable(31536000),
    lifetime = $bindable('1'),
    lifetimeUnit = $bindable(31536000),
    savingsRateInput = $bindable(null),
  }: Props = $props();
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
  <select
    bind:value={savingsRateUnit}
    aria-label="Unit for money saved per period"
    class="form-select
      w-28
      bg-transparent
      border-0 border-b-2 border-emerald-300
      focus:ring-0 focus:border-emerald-500
      px-3 py-0"
  >
    {#each units as unit (unit.value)}
      <option value={unit.value} selected={savingsRateUnit === unit.value}>{unit.singular}</option>
    {/each}
  </select>
  by optimizing a workflow. Resourcing the optimization costs us $
  <input
    type="text"
    bind:value={costRateUsd}
    aria-label="Resourcing cost per period in US dollars"
    required
    class="form-input
      w-16
      bg-transparent
      border-0 border-b-2 border-sky-300
      focus:ring-0 focus:border-sky-500
      px-3 py-0"
  />
  per
  <select
    bind:value={costRateUnit}
    aria-label="Unit for resourcing cost per period"
    class="form-select
      w-28
      bg-transparent
      border-0 border-b-2 border-sky-300
      focus:ring-0 focus:border-sky-500
      px-3 py-0"
  >
    {#each units as unit (unit.value)}
      <option value={unit.value} selected={costRateUnit === unit.value}>{unit.singular}</option>
    {/each}
  </select>
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
  <select
    bind:value={lifetimeUnit}
    aria-label="Recoup window unit"
    class="form-select
      w-28
      bg-transparent
      border-0 border-b-2 border-chrome-300
      focus:ring-0 focus:border-chrome-500
      px-3 py-0"
  >
    {#each units as unit (unit.value)}
      <option value={unit.value} selected={lifetimeUnit === unit.value}>{lifetime === '1' ? unit.singular : unit.plural}</option>
    {/each}
  </select> of completing it.
</p>
