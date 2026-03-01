<svelte:options runes={true} />

<script lang="ts">
  import { onMount } from 'svelte';
  import { calculatorModes } from '$lib/config/calculatorModes';
  import { calculateMoneyInvestmentLimit, calculateTime } from '$lib/domain/calculator';
  import type { CalculatorMode } from '$lib/domain/calculator';
  import { units, unitLabelToValue, unitValueToLabel } from '$lib/utils/units';
  import type { SolutionType } from '$types/solution.type';

  type Props = {
    onSolve?: (solution: SolutionType) => void;
    syncOnInit?: boolean;
    mode?: CalculatorMode;
    tasks?: string;
    frequencyUnit?: number;
    savings?: string;
    savingsUnit?: number;
    lifetime?: string;
    lifetimeUnit?: number;
    costRateUsd?: string;
    costRateUnit?: number;
    savingsRateUsd?: string;
    savingsRateUnit?: number;
  };

  let {
    onSolve = () => {},
    syncOnInit = false,
    mode = $bindable('time'),
    tasks = $bindable('1'),
    frequencyUnit = $bindable(unitLabelToValue('week')),
    savings = $bindable('30'),
    savingsUnit = $bindable(unitLabelToValue('minute')),
    lifetime = $bindable('1'),
    lifetimeUnit = $bindable(unitLabelToValue('year')),
    costRateUsd = $bindable('70'),
    costRateUnit = $bindable(unitLabelToValue('hour')),
    savingsRateUsd = $bindable('25000'),
    savingsRateUnit = $bindable(unitLabelToValue('year')),
  }: Props = $props();

  let investment = $state<string | null>(null);
  let investmentUnit = $state(unitLabelToValue('hour'));

  let tasksInput = $state<HTMLInputElement | null>(null);
  let savingsRateInput = $state<HTMLInputElement | null>(null);
  let shouldSync = $state(false);

  $effect(() => {
    if (mode === 'time') {
      const timeResult = calculateTime({
        tasks,
        frequencyUnit,
        savings,
        savingsUnit,
        lifetime,
        lifetimeUnit,
      });

      investment = timeResult.investment;
      investmentUnit = timeResult.investmentUnit;

      if (shouldSync) {
        onSolve({
          mode,
          tasks,
          frequencyUnit,
          frequencyUnitLabel: unitValueToLabel('1', frequencyUnit),
          savings,
          savingsUnit,
          savingsUnitLabel: unitValueToLabel(savings, savingsUnit),
          investment,
          investmentUnit,
          investmentUnitLabel: unitValueToLabel(investment, investmentUnit),
          lifetime,
          lifetimeUnit,
          lifetimeUnitLabel: unitValueToLabel(lifetime, lifetimeUnit),
        });
      }
      return;
    }

    const moneyResult = calculateMoneyInvestmentLimit({
      costRateUsd,
      costRateUnit,
      savingsRateUsd,
      savingsRateUnit,
      lifetime,
      lifetimeUnit,
    });

    investment = moneyResult.investment;
    investmentUnit = moneyResult.investmentUnit;

    if (shouldSync) {
      onSolve({
        mode,
        costRateUsd,
        costRateUnit,
        costRateUnitLabel: unitValueToLabel('1', costRateUnit),
        savingsRateUsd,
        savingsRateUnit,
        savingsRateUnitLabel: unitValueToLabel('1', savingsRateUnit),
        lifetime,
        lifetimeUnit,
        lifetimeUnitLabel: unitValueToLabel(lifetime, lifetimeUnit),
        investment,
        investmentUnit,
        investmentUnitLabel: investment ? unitValueToLabel(investment, investmentUnit) : null,
      });
    }
  });

  onMount(() => {
    shouldSync = syncOnInit;

    if (mode === 'time') {
      tasksInput?.focus();
      return;
    }

    savingsRateInput?.focus();
  });
</script>

<div
  class="prose prose-headings:font-medium
  leading-8
  w-11/12
  mx-auto
  px-8 py-8
  rounded
  bg-chrome-50
  shadow-xl shadow-chrome-900"
  oninput={() => (shouldSync = true)}
  onchange={() => (shouldSync = true)}
>
  <div class="flex justify-between items-center mb-3">
    <h1 class="mb-0">{calculatorModes[mode].title}</h1>
    <label class="text-sm not-prose">
      <select
        bind:value={mode}
        aria-label="Calculation mode"
        class="form-select text-sm bg-transparent border-0 border-b-2 border-indigo-300 focus:ring-0 focus:border-indigo-500 pl-3 pr-8 py-0"
      >
        <option value="time">Time</option>
        <option value="money">Money</option>
      </select>
    </label>
  </div>

  <small>A calculator based on <a href="https://xkcd.com/1205/">xkcd #1205</a></small>

  {#if mode === 'time'}
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
          <option value={unit.value} selected={frequencyUnit === unit.value}>{unit.singular}</option
          >
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
          <option value={unit.value} selected={savingsUnit === unit.value}
            >{savings === '1' ? unit.singular : unit.plural}</option
          >
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
          <option value={unit.value} selected={lifetimeUnit === unit.value}
            >{lifetime === '1' ? unit.singular : unit.plural}</option
          >
        {/each}
      </select> through time saved performing the task.
    </p>

    <p>
      To fulfill these criteria, we can spend no more than <strong
        class="underline decoration-2 decoration-rose-300"
        >{investment ? investment : '???'} {unitValueToLabel(investment, investmentUnit)}</strong
      > optimizing.
    </p>

    <p>Should we invest our time?</p>
  {:else}
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
          <option value={unit.value} selected={savingsRateUnit === unit.value}
            >{unit.singular}</option
          >
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
          <option value={unit.value} selected={lifetimeUnit === unit.value}
            >{lifetime === '1' ? unit.singular : unit.plural}</option
          >
        {/each}
      </select> of completing it.
    </p>

    <p>
      To fulfill these criteria, we can spend no more than <strong
        class="underline decoration-2 decoration-rose-300"
        >{investment ? investment : '???'} {unitValueToLabel(investment, investmentUnit)}</strong
      > optimizing.
    </p>

    <p>Should we invest our time?</p>
  {/if}
</div>
