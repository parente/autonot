<script type="ts"> 
  import { createEventDispatcher } from 'svelte';
  import { units, unitLabelToValue, unitValueToLabel } from '$lib/utils/units';
  import type { SolutionType } from "$types/solution.type";

  const dispatch = createEventDispatcher();

  export let tasks: string = "1";
  export let frequencyUnit: number = unitLabelToValue("week");
  export let savings: string = "30";
  export let savingsUnit: number = unitLabelToValue("second");
  
  const lifetime: number = 5;
  const lifetimeUnit: string = "years";

  let investment: string;
  let investmentUnit: string;

  const secondsPerLifetime = lifetime * unitLabelToValue(lifetimeUnit);

  /**
   * Reacts to a change in any form value by computing the optimization investment allowed in order
   * to break even in `secondsPerLifetime`.
   *  
   * tasks         | secondsPerLifetime | savings | savingsUnit |
   * ------------- | ------------------ | ------- | ------------|
   * frqeuencyUnit |                    | 1 task  |             |
   **/
  $: {
    const limit = Number(tasks) / frequencyUnit * secondsPerLifetime * Number(savings) * savingsUnit;
    // Invalid value in one of the fields
    if(isNaN(limit)) {
      investment = null;
    } else {
      for(let i=0; i <= units.length; i++) {
        if((i === units.length) || (units[i].value > limit)) {
          if(i === 0) {
            // Less than a second savings
            investment = null;
          } else {
            // Use the largest unit that results in a value > 1
            investment = (limit / units[i-1].value).toFixed(1);
            investmentUnit = (investment === "1") ? units[i-1].singular : units[i-1].plural;
          }
          break;
        }
      }

      dispatch('solve', <SolutionType>{
        tasks: tasks,
        frequencyUnit: frequencyUnit,
        frequencyUnitLabel: unitValueToLabel("1", frequencyUnit),
        savings: savings,
        savingsUnit: savingsUnit,
        savingsUnitLabel: unitValueToLabel(savings, savingsUnit),
        investment: investment,
        investmentUnitLabel: investmentUnit, // TODO: fix inconsistency
      });
    }
  }
</script>

<div class="prose prose-headings:font-medium
  leading-8
  w-11/12
  mx-auto 
  px-8 py-8 
  rounded 
  bg-chrome-50
  shadow-xl shadow-chrome-900">
      
  <h1 class="mb-1">Is it worth the time?</h1>
  <small>A calculator based on <a href="https://xkcd.com/1205/">xkcd #1205</a></small>

  <p>We perform a routine task 
    <input type="text" bind:value={tasks} required autofocus class="form-input 
      w-16
      bg-transparent
      border-0 border-b-2 border-sky-300
      focus:ring-0 focus:border-sky-500
      px-3 py-0"/> 
    {tasks === "1" ? "time" : "times"} every
    <select bind:value={frequencyUnit} class="form-select
      w-28
      bg-transparent
      border-0 border-b-2 border-sky-300
      focus:ring-0 focus:border-sky-500
      px-3 py-0">
      {#each units as unit}
        <option value={unit.value} selected={frequencyUnit === unit.value}>{unit.singular}</option>
      {/each}
    </select>. We think we can save <input type="text" bind:value={savings} required class="form-input 
      w-16
      bg-transparent
      border-0 border-b-2 border-emerald-300
      focus:ring-0 focus:border-emerald-500
      px-3 py-0" />
    <select bind:value={savingsUnit} class="form-select
      w-28
      bg-transparent
      border-0 border-b-2 border-emerald-300
      focus:ring-0 focus:border-emerald-500
      px-3 py-0">
      {#each units as unit}
        <option value={unit.value} selected={savingsUnit === unit.value}>{savings === "1" ? unit.singular : unit.plural}</option>
      {/each}
    </select> each time we perform this task if we invest time into optimizing it.
  </p>

  <p>If we want to recoup our investment by saving <span class="underline decoration-2
  decoration-emerald-300">{isNaN(Number(savings)) ? "???" : savings || "???"} {unitValueToLabel(savings,
  savingsUnit)}</span> per task over <span class="underline decoration-2
  decoration-chrome-300">{lifetime} {lifetimeUnit}</span>, we can spend no more than <strong
  class="underline decoration-2 decoration-rose-300">{investment ? investment : '???'} {investmentUnit}</strong>
  performing the optimization.</p>
  
  <p>Should we invest our time?</p>
</div>