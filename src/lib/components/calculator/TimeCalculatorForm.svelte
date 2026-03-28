<svelte:options runes={true} />

<script lang="ts">
  import { getInputUnits, unitLabelToValue } from '$lib/utils/units';
  import UnitSelect from './UnitSelect.svelte';

  type Props = {
    tasks?: string;
    frequencyUnit?: number;
    savings?: string;
    savingsUnit?: number;
    lifetime?: string;
    lifetimeUnit?: number;
    tasksInput?: HTMLInputElement | null;
  };

  let {
    tasks = $bindable('1'),
    frequencyUnit = $bindable(unitLabelToValue('week')),
    savings = $bindable('30'),
    savingsUnit = $bindable(unitLabelToValue('minute')),
    lifetime = $bindable('1'),
    lifetimeUnit = $bindable(unitLabelToValue('year')),
    tasksInput = $bindable(null),
  }: Props = $props();

  const inputUnits = getInputUnits();
</script>

<p>
  We perform a routine task
  <input
    type="text"
    bind:this={tasksInput}
    bind:value={tasks}
    aria-label="Number of times the task is performed"
    required
    class="form-input
      w-16
      bg-transparent
      border-0 border-b-2 border-sky-300
      focus:ring-0 focus:border-sky-500
      px-3 py-0"
  />
  {tasks === '1' ? 'time' : 'times'} every
  <UnitSelect
    bind:value={frequencyUnit}
    units={inputUnits}
    ariaLabel="Frequency unit for task repetition"
    class="border-sky-300 focus:border-sky-500"
  />. We think we can save
  <input
    type="text"
    bind:value={savings}
    aria-label="Time saved per task"
    required
    class="form-input
      w-16
      bg-transparent
      border-0 border-b-2 border-emerald-300
      focus:ring-0 focus:border-emerald-500
      px-3 py-0"
  />
  <UnitSelect
    bind:value={savingsUnit}
    units={inputUnits}
    ariaLabel="Unit for time saved per task"
    class="border-emerald-300 focus:border-emerald-500"
    quantity={savings}
  />
  each time we perform this task by optimizing it. We want to recoup our optimization investment within
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
  /> through time saved performing the task.
</p>
