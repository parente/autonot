<script type="ts">
  let frequency: string = "1";
  let frequency_unit: string = "hour";
  let optimization: string = "1";
  let optimization_unit: string = "minute";
  let optimization_plural: boolean = false;
  let investment: number = 5;
  let investment_unit: string = "hours";
  let lifetime: number = 5;
  let lifetime_unit: string = "years";

  const optimization_units = [
    "second",
    "minute",
    "hour",
    "day",
    "week"
	];

  // Correct pluralization of optimization unit options
  $: if(optimization === "1" && optimization_plural) {
    optimization_plural = false;
    optimization_unit = optimization_unit.substring(0, optimization_unit.length-1);
  } else if(optimization !== "1" && !optimization_plural) {
    optimization_unit += "s";
    optimization_plural = true;
  }
</script>

<div class="h-screen min-h-screen
  flex flex-col 
  justify-center 
  overflow-hidden
  bg-gradient-to-br from-chrome-800 to-chrome-700">
  <div class="prose
    mx-auto
    w-11/12
    px-8 py-8 
    rounded 
    bg-chrome-50
    shadow-xl shadow-chrome-900">
        
    <h1 class="mb-1">Is it worth the time?</h1>
    <small>A calculator based on <a href="https://xkcd.com/1205/">xkcd #1205</a></small>

    <form on:submit|preventDefault>
      <p>We perform a routine task 
        <input type="text" bind:value={frequency} required autofocus class="form-input 
          w-16
          bg-transparent
          border-0 border-b-2 border-sky-300
          focus:ring-0 focus:border-sky-500
          px-3 py-0
          text-sm"/> 
        {frequency === "1" ? "time" : "times"} every
        <select bind:value={frequency_unit} class="form-select
          w-28
          bg-transparent
          border-0 border-b-2 border-sky-300
          focus:ring-0 focus:border-sky-500
          px-3 py-0
          text-sm">
          <option>hour</option>
          <option>day</option>
          <option>week</option>
          <option>month</option>
          <option>quarter</option>
          <option>year</option>
        </select>. We think we can save <input type="text" bind:value={optimization} required class="form-input 
          w-16
          bg-transparent
          border-0 border-b-2 border-emerald-300
          focus:ring-0 focus:border-emerald-500
          px-3 py-0
          text-sm" />
        <select bind:value={optimization_unit} class="form-select
          w-28
          bg-transparent
          border-0 border-b-2 border-emerald-300
          focus:ring-0 focus:border-emerald-500
          px-3 py-0
          text-sm">
          {#each optimization_units as unit}
            <option>{optimization === "1" ? unit : `${unit}s`}</option>
          {/each}
        </select> each time we perform this task if we invest time in optimizing it.
      </p>

      <p>If we want to recoup our investment by saving <span class="underline decoration-2
      decoration-emerald-300">{optimization} {optimization_unit}</span> per task over <span
      class="underline decoration-2 decoration-chrome-300">{lifetime} {lifetime_unit}</span>, we can spend no more
      than <strong class="underline decoration-2 decoration-rose-300">{investment} {investment_unit}</strong>
      performing the optimization.</p>
      
      <p>Should we invest our time?</p>
    </form>
  </div>
</div>