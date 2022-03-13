<script type="ts">
  let tasks: string = "1";
  let frequencyUnit: number = 604800;
  let savings: string = "30";
  let savingsUnit: number = 1;
  let investment: string;
  let investmentUnit: string;
  const lifetime: number = 5;
  const lifetimeUnit: string = "years";

  const units = [
    {value: 1, singular: "second", plural: "seconds"},
    {value: 60, singular: "minute", plural: "minutes"},
    {value: 3600, singular: "hour", plural: "hours"},
    {value: 86400, singular: "day", plural: "days"},
    {value: 604800, singular: "week", plural: "weeks"},
    {value: 2592000, singular: "month", plural: "months"},
    {value: 7776000, singular: "quarter", plural: "quarters"},
    {value: 31536000, singular: "year", plural: "years"},
	];

  function unitValueToLabel(value: string, unitValue: number): string {
    for(let i=0; i < units.length; i++) {
      if(units[i].value === unitValue) {
        return (value === "1") ? units[i].singular : units[i].plural;
      }
    }
    throw new Error("unexpected unit value");
  }

  function unitLabelToValue(label: string) {
    for(let i=0; i < units.length; i++) {
      if(units[i].singular === label || units[i].plural === label) {
        return units[i].value;
      }
    }
    throw new Error("unexpected unit label");
  }

  const secondsPerLifetime = lifetime * unitLabelToValue(lifetimeUnit);

  /* 
   * tasks         | secondsPerLifetime | savings | savingsUnit |
   * ------------- | ------------------ | ------- | ------------|
   * frqeuencyUnit |                    | 1 task  |             |
   */
  $: {
    const limit = Number(tasks) / frequencyUnit * secondsPerLifetime * Number(savings) * savingsUnit;
    // Invalid value in one of the fields
    if(isNaN(limit)) {
      investment = '???';
    } else {
      for(let i=0; i <= units.length; i++) {
        if((i === units.length) || (units[i].value > limit)) {
          if(i === 0) {
            // Less than a second savings
            investment = '???';
          } else {
            // Use the largest unit that results in a value > 1
            investment = (limit / units[i-1].value).toFixed(1);
            investmentUnit = (investment === "1") ? units[i-1].singular : units[i-1].plural;
          }
          break;
        }
      }
    }
  }
</script>

<div class="h-screen min-h-screen
  flex flex-col 
  justify-center 
  overflow-hidden
  bg-gradient-to-br from-chrome-800 to-chrome-700">
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
          <option value={unit.value}>{unit.singular}</option>
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
          <option value={unit.value}>{savings === "1" ? unit.singular : unit.plural}</option>
        {/each}
      </select> each time we perform this task if we invest time in optimizing it.
    </p>

    <p>If we want to recoup our investment by saving <span class="underline decoration-2
    decoration-emerald-300">{savings} {unitValueToLabel(savings,
    savingsUnit)}</span> per task over <span class="underline decoration-2
    decoration-chrome-300">{lifetime} {lifetimeUnit}</span>, we can spend no more than <strong
    class="underline decoration-2 decoration-rose-300">{investment} {investmentUnit}</strong>
    performing the optimization.</p>
    
    <p>Should we invest our time?</p>
  </div>
  <div class="prose prose-a:text-chrome-300 
    mx-auto mt-5
    px-8 py-2 
    rounded 
    text-chrome-100 text-xs
    bg-chrome-50/10">
    <a href="https://github.com/parente/autonot">Source on GitHub</a>
  </div>
</div>

