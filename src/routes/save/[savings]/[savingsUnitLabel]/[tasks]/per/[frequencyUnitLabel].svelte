<script type="ts">
  import { page } from "$app/stores";
  import Calculator from "$lib/components/Calculator.svelte";
  import { updateBreadcrumb } from "$lib/utils/breadcrumb";
  import { unitLabelToValue } from "$lib/utils/units";
</script>

<Calculator on:solve={(event) => {updateBreadcrumb(event.detail)}}
  tasks={$page.params.tasks} 
  frequencyUnit={unitLabelToValue($page.params.frequencyUnitLabel)}
  savings={$page.params.savings}
  savingsUnit={unitLabelToValue($page.params.savingsUnitLabel)} />