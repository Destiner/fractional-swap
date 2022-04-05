<template>
  <div class="chip">
    <div class="icon">
      <WalletIcon
        :address="address"
        :size="16"
      />
    </div>
    <div class="address">
      {{ label }}
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue';

import WalletIcon from './WalletIcon.vue';

const props = defineProps({
  address: {
    type: String,
    required: true,
  },
});

const label = computed(() => {
  return props.address.substring(0, 8);
});
</script>

<style scoped>
.chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  transition: transform 0.25s;
  border: 1px solid #ffffff2e;
  border-radius: 18px;
  background: #ffffff40;
  box-shadow: 0 8px 32px 0 #1f26875f;
  font-size: 16px;
  cursor: pointer;
  backdrop-filter: blur(4px);
}

.chip:hover {
  transform: translateY(-4px);
}

.icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
}
</style>
