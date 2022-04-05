<template>
  <button>{{ label }}</button>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
button {
  padding: 8px 16px;
  transition: transform 0.25s;
  border: 1px solid #ffffff2e;
  border-radius: 10px;
  background: #ffffff40;
  box-shadow: 0 8px 32px 0 #1f26875f;
  backdrop-filter: blur(4px);
  font-size: 16px;
}

button:hover {
  transform: translateY(-4px);
}
</style>
