<template>
  <BaseModal
    :open="open"
    :title="'Wallet'"
    @close="close"
  >
    <div class="body">
      <div
        v-if="address"
        class="meta"
      >
        <div class="icon">
          <WalletIcon
            :address="address"
            :size="32"
          />
        </div>
        <div class="address">
          {{ label }}
        </div>
      </div>
      <button @click="disconnect">Disconnect</button>
    </div>
  </BaseModal>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue';

import BaseModal from './BaseModal.vue';
import WalletIcon from './WalletIcon.vue';

import { useWalletStore } from '@/stores';

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close']);

const store = useWalletStore();
const address = computed(() => store.address);
const label = computed(() => {
  if (!address.value) {
    return;
  }
  return address.value.substring(0, 16);
});

function close() {
  emit('close');
}

function disconnect() {
  store.disconnect();
  emit('close');
}
</script>

<style scoped>
.body {
  padding: 0 8px;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: white;
}
</style>
