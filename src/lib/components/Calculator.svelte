<script type="ts"> 
  import { createEventDispatcher } from 'svelte';
  import { units, unitLabelToValue, unitValueToLabel } from '$lib/utils/units';
  import type { SolutionType } from "$types/solution.type";

  const dispatch = createEventDispatcher();

  export let taskText: string = "perform a routine task";
  export let tasks: string = "1";
  export let frequencyUnit: number = unitLabelToValue("week");
  export let savings: string = "30";
  export let savingsUnit: number = unitLabelToValue("second");
  export let lifetime: string = "5";
  export let lifetimeUnit: number = unitLabelToValue("year");

  let investment: string;
  let investmentUnit: number = unitLabelToValue("hour");;

  /**
   * Reacts to a change in any form value by computing the optimization investment allowed in order
   * to break even in `secondsPerLifetime`.
   *  
   * tasks         | secondsPerLifetime | savings | savingsUnit |
   * ------------- | ------------------ | ------- | ------------|
   * frqeuencyUnit |                    | 1 task  |             |
   **/
  $: {
    const limit = Number(tasks) / frequencyUnit * Number(lifetime) * lifetimeUnit * Number(savings) * savingsUnit;
    // Invalid value in one of the fields
    if(isNaN(limit) || !limit) {
      investment = null;
    } else {
      for(let i=0; i <= units.length; i++) {
        if((i === units.length) || (units[i].value > limit)) {
          if(i === 0) {
            // Less than a second savings
            investment = "1.0";
            investmentUnit = 1;
          } else {
            // Use the largest unit that results in a value > 1
            investment = (limit / units[i-1].value).toFixed(1);
            investmentUnit = units[i-1].value;
          }
          break;
        }
      }

      dispatch('solve', <SolutionType>{
        taskText: taskText,
        tasks: tasks,
        frequencyUnit: frequencyUnit,
        frequencyUnitLabel: unitValueToLabel("1", frequencyUnit),
        savings: savings,
        savingsUnit: savingsUnit,
        savingsUnitLabel: unitValueToLabel(savings, savingsUnit),
        investment: investment,
        investmentUnit: investmentUnit,
        investmentUnitLabel: unitValueToLabel(investment, investmentUnit),
        lifetime: lifetime,
        lifetimeUnit: lifetimeUnit,
        lifetimeUnitLabel: unitValueToLabel(lifetime, lifetimeUnit),
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

  <p>
    We 
    <span bind:innerHTML={taskText} contenteditable="true" class="inline-block
      leading-6 
      bg-transparent
      border-0 border-b-2 border-gray-300
      outline outline-0 focus:border-gray-500
      px-0 py-0"></span>
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
    </select>.
    
    We think we can save 
    <input type="text" bind:value={savings} required class="form-input 
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
    </select> each time we perform this task by optimizing it.
    
    We want to recoup our optimization investment within 
    <input type="text" bind:value={lifetime} required class="form-input 
      w-16
      bg-transparent
      border-0 border-b-2 border-purple-300
      focus:ring-0 focus:border-purple-500
      px-3 py-0" />
    <select bind:value={lifetimeUnit} class="form-select
      w-28
      bg-transparent
      border-0 border-b-2 border-purple-300
      focus:ring-0 focus:border-purple-500
      px-3 py-0">
      {#each units as unit}
        <option value={unit.value} selected={lifetimeUnit === unit.value}>{lifetime === "1" ? unit.singular : unit.plural}</option>
      {/each}
    </select>.
  </p>

  <p>To fulfill these criteria, we can spend no more than <strong
  class="underline decoration-2 decoration-rose-300">{investment ? investment : '???'}
  {unitValueToLabel(investment, investmentUnit)}</strong> optimizing.</p>
  
  <p>Should we invest our time?</p>
</div>