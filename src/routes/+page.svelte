<script lang="ts">
  import Calculator from '$lib/components/Calculator.svelte';
  import { updateBreadcrumb } from '$lib/utils/breadcrumb';
</script>

<Calculator onSolve={updateBreadcrumb} />
