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
import '@fontsource/nunito/variable.css';

import AppHeader from '@/components/AppHeader.vue';
</script>

<style>
body {
  background-image: url('/assets/bg.png');
  background-repeat: no-repeat;
  background-position-x: 100%;
  color: #333;
  font-family: Nunito, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif;
}

@media (max-width: 1023px) {
  body {
    background-position-x: -300px;
  }
}

@media (max-width: 767px) {
  body {
    background-position-x: -600px;
  }
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
