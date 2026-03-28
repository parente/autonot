<svelte:options runes={true} />

<script lang="ts">
  import type { UnitDefinition } from '$lib/utils/units';

  type Props = {
    value: number;
    units: UnitDefinition[];
    ariaLabel: string;
    /** Extra Tailwind border/focus classes, e.g. "border-sky-300 focus:border-sky-500" */
    class?: string;
    /**
     * Companion quantity string used to pick singular vs. plural option labels.
     * When undefined, always uses singular.
     */
    quantity?: string;
  };

  let {
    value = $bindable(),
    units,
    ariaLabel,
    class: extraClass = '',
    quantity = undefined,
  }: Props = $props();

  function labelFor(unit: UnitDefinition): string {
    return quantity === undefined || quantity === '1' ? unit.singular : unit.plural;
  }
</script>

<select
  bind:value
  aria-label={ariaLabel}
  class="form-select w-28 bg-transparent border-0 border-b-2 {extraClass} focus:ring-0 px-3 py-0"
>
  {#each units as unit (unit.key)}
    <option value={unit.valueSeconds}>{labelFor(unit)}</option>
  {/each}
</select>
