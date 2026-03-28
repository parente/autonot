<svelte:options runes={true} />

<script lang="ts">
  import { onMount } from 'svelte';
  import { calculatorModes } from '$lib/config/calculatorModes';
  import {
    calculateMoneyInvestmentLimit,
    calculateTime,
    normalizeMoneyInput,
    normalizeTimeInput,
    toMoneySolution,
    toTimeSolution,
  } from '$lib/domain/calculator';
  import type { MoneyFormRaw, TimeFormRaw } from '$lib/domain/calculator';
  import { unitLabelToValue } from '$lib/utils/units';
  import type { CalculatorProps } from './types';
  import MoneyCalculatorForm from './MoneyCalculatorForm.svelte';
  import ResultSummary from './ResultSummary.svelte';
  import TimeCalculatorForm from './TimeCalculatorForm.svelte';

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
  }: CalculatorProps = $props();

  let tasksInput = $state<HTMLInputElement | null>(null);
  let savingsRateInput = $state<HTMLInputElement | null>(null);
  let shouldSync = $state(false);

  const computed = $derived.by(() => {
    if (mode === 'time') {
      const raw: TimeFormRaw = { tasks, frequencyUnit, savings, savingsUnit, lifetime, lifetimeUnit };
      const normalized = normalizeTimeInput(raw);
      const result = normalized ? calculateTime(normalized) : { kind: 'invalid' as const };
      return { mode: 'time' as const, raw, result };
    }
    const raw: MoneyFormRaw = { costRateUsd, costRateUnit, savingsRateUsd, savingsRateUnit, lifetime, lifetimeUnit };
    const normalized = normalizeMoneyInput(raw);
    const result = normalized ? calculateMoneyInvestmentLimit(normalized) : { kind: 'invalid' as const };
    return { mode: 'money' as const, raw, result };
  });

  const investment = $derived(computed.result.kind === 'valid' ? computed.result.investment : null);
  const investmentUnit = $derived(computed.result.kind === 'valid' ? computed.result.investmentUnit : unitLabelToValue('second'));
  const personInvestment = $derived(computed.result.kind === 'valid' ? computed.result.personInvestment : null);
  const personInvestmentUnit = $derived(computed.result.kind === 'valid' ? computed.result.personInvestmentUnit : unitLabelToValue('person-day'));

  $effect(() => {
    if (!shouldSync) return;
    if (computed.mode === 'time') {
      onSolve(toTimeSolution(computed.raw, computed.result));
    } else {
      onSolve(toMoneySolution(computed.raw, computed.result));
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
    <TimeCalculatorForm
      bind:tasks
      bind:frequencyUnit
      bind:savings
      bind:savingsUnit
      bind:lifetime
      bind:lifetimeUnit
      bind:tasksInput
    />
  {:else}
    <MoneyCalculatorForm
      bind:costRateUsd
      bind:costRateUnit
      bind:savingsRateUsd
      bind:savingsRateUnit
      bind:lifetime
      bind:lifetimeUnit
      bind:savingsRateInput
    />
  {/if}

  <ResultSummary {investment} {investmentUnit} {personInvestment} {personInvestmentUnit} />
</div>
