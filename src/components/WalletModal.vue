<template>
  <BaseModal
    :open="open"
    :title="'Wallet'"
    @close="close"
  >
    <div class="body">
      <div
        v-if="address"
        class="wallet"
      >
        <div class="meta">
          <div class="wallet-icon">
            <WalletIcon
              :address="address"
              :size="48"
            />
          </div>
          <div class="details">
            <div class="address">
              {{ label }}
            </div>
            <div class="connector">
              MetaMask
            </div>
          </div>
        </div>
        <div class="actions">
          <IconClipboard class="icon" />
          <IconExternalLink class="icon" />
        </div>
      </div>
      <SButton
        :label="'Disconnect'"
        flat
        @click="disconnect"
      />
    </div>
  </BaseModal>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue';

import BaseModal from './BaseModal.vue';
import SButton from './SButton.vue';
import WalletIcon from './WalletIcon.vue';
import IconClipboard from './icons/IconClipboard.vue';
import IconExternalLink from './icons/IconExternalLink.vue';

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

.wallet {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.meta {
  display: flex;
  gap: 8px;
  align-items: center;
}

.wallet-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.address {
  font-size: 18px;
}

.connector {
  font-size: 12px;
}

.actions {
  display: flex;
}

.icon {
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 8px;
}

.icon:hover {
  background: #ddd;

}
</style>
