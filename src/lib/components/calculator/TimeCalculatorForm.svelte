<svelte:options runes={true} />

<script lang="ts">
  import { units } from '$lib/utils/units';

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
    frequencyUnit = $bindable(1),
    savings = $bindable('30'),
    savingsUnit = $bindable(60),
    lifetime = $bindable('1'),
    lifetimeUnit = $bindable(31536000),
    tasksInput = $bindable(null),
  }: Props = $props();
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
  <select
    bind:value={frequencyUnit}
    aria-label="Frequency unit for task repetition"
    class="form-select
      w-28
      bg-transparent
      border-0 border-b-2 border-sky-300
      focus:ring-0 focus:border-sky-500
      px-3 py-0"
  >
    {#each units as unit (unit.value)}
      <option value={unit.value} selected={frequencyUnit === unit.value}>{unit.singular}</option>
    {/each}
  </select>. We think we can save
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
  <select
    bind:value={savingsUnit}
    aria-label="Unit for time saved per task"
    class="form-select
      w-28
      bg-transparent
      border-0 border-b-2 border-emerald-300
      focus:ring-0 focus:border-emerald-500
      px-3 py-0"
  >
    {#each units as unit (unit.value)}
      <option value={unit.value} selected={savingsUnit === unit.value}>{savings === '1' ? unit.singular : unit.plural}</option>
    {/each}
  </select>
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
  </select> through time saved performing the task.
</p>
