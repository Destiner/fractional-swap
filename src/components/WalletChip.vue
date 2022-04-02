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
}

.icon {
  width: 16px;
  height: 16px;
  border: 1px solid #333;
  border-radius: 50%;
  background: white;
}
</style>
