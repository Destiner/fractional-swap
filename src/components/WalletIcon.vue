<template>
  <div ref="icon" />
</template>

<script
  setup
  lang="ts"
>
import jazzicon from '@metamask/jazzicon';
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  address: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

const icon = ref<HTMLElement | null>(null);

onMounted(() => {
  update();
});

watch(props, () => {
  update();
});

function update(): void {
  const address = props.address;
  if (!icon.value) {
    return;
  }
  icon.value.innerHTML = '';
  icon.value.appendChild(
    jazzicon(props.size, parseInt(address.slice(2, 10), 16)),
  );
}
</script>
