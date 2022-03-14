<script type="ts">
  import Calculator from "$lib/components/Calculator.svelte";
  import { updateBreadcrumb } from "$lib/utils/breadcrumb";
</script>

<Calculator on:solve={(event) => {updateBreadcrumb(event.detail)}} />