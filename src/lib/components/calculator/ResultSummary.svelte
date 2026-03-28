<svelte:options runes={true} />

<script lang="ts">
  import { getOutputUnitsByBasis, unitLabelToValue, unitValueToLabel } from '$lib/utils/units';

  type Props = {
    investment?: string | null;
    investmentUnit?: number;
    personInvestment?: string | null;
    personInvestmentUnit?: number;
  };

  let {
    investment = null,
    investmentUnit = unitLabelToValue('second'),
    personInvestment = null,
    personInvestmentUnit = unitLabelToValue('person-day'),
  }: Props = $props();

  const personUnitDefinitions = getOutputUnitsByBasis('person').map(
    (u) => `${u.singular} = ${u.valueSeconds / 3600} hours`
  );

  function calendarLabel(value: string | null, unit: number): string {
    return `calendar-${unitValueToLabel(value, unit)}`;
  }
</script>

<div class="mb-2 flex items-center gap-1">
  <span>To fulfill these criteria, our optimization budget is:</span>
  <details class="inline-block relative align-middle ml-1 not-prose group">
    <summary
      class="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold text-chrome-600 border border-chrome-300 cursor-pointer list-none select-none hover:bg-chrome-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      aria-label="Explain person units"
    >
      i
    </summary>
    <div
      class="absolute z-10 top-7 right-0 w-64 rounded border border-chrome-200 bg-white shadow-lg px-3 py-2 text-sm leading-5 text-chrome-700"
    >
      <p class="m-0 mb-1 font-medium">Person unit definitions</p>
      <ul class="m-0 pl-4">
        {#each personUnitDefinitions as definition (definition)}
          <li>{definition}</li>
        {/each}
      </ul>
    </div>
  </details>
</div>
<div class="not-prose mt-2 mb-6 border-l-2 border-rose-200 pl-4 space-y-1 text-base leading-7 text-chrome-800">
  <div>
    <span class="font-medium text-chrome-600">Calendar:</span>
    <span class="font-semibold whitespace-nowrap"
      >{investment ? investment : '???'} {calendarLabel(investment, investmentUnit)}</span
    >
  </div>
  <div>
    <span class="font-medium text-chrome-600">Person:</span>
    <span class="font-semibold whitespace-nowrap"
      >{personInvestment ? personInvestment : '???'} {unitValueToLabel(personInvestment, personInvestmentUnit)}</span
    >
  </div>
</div>

<p>Should we invest our time?</p>
