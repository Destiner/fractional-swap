<template>
  <button
    :class="{ disabled }"
    :disabled="disabled"
  >
    Swap
  </button>
</template>

<script
  setup
  lang="ts"
>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
button {
  width: 100%;
  padding: 8px 16px;
  transition: transform 0.25s;
  border: none;
  border-radius: 16px;
  background: #3db53d;
  color: #eee;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  transform: translateY(-2px);
}

button.disabled {
  background: grey;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
