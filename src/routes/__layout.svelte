<script lang="ts">
  import '../app.css';
</script>

<svelte:head>
  <title>Is it worth the time?</title>
</svelte:head>

<main class="h-screen min-h-screen
  flex flex-col 
  justify-center 
  overflow-hidden
  bg-gradient-to-br from-chrome-800 to-chrome-700">
  <slot />
  <div class="prose prose-a:text-chrome-300 
    mx-auto mt-5
    px-8 py-2 
    rounded 
    text-chrome-100 text-xs
    bg-chrome-50/10">
    <a href="https://github.com/parente/autonot">Source and attribution on GitHub</a>
  </div>
</main>
