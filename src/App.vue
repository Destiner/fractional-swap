<template>
  <div id="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<script
  setup
  lang="ts"
>
import AppHeader from '@/components/AppHeader.vue';
</script>

<style>
body {
  background-image: url('./assets/bg.png');
  background-repeat: no-repeat;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif;
}

/* Reset */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

#app {
  isolation: isolate;
}
</style>
