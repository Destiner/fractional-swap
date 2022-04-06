<template>
  <button :class="{ flat }">{{ label }}</button>
</template>

<script
  setup
  lang="ts"
>
defineProps({
  label: {
    type: String,
    required: true,
  },
  flat: {
    type: Boolean,
    default: false,
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
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  font-size: 16px;
}

button.flat {
  background: #3db53d;
  box-shadow: none;
  backdrop-filter: inherit;
  color: #eee;
}

button:hover {
  transform: translateY(-4px);
}
</style>
