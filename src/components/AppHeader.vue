<template>
  <div class="header">
    <div class="brand">fractional.swap</div>
    <div v-if="!address">
      <SButton
        :label="'Connect'"
        @click="connect"
      />
    </div>
    <div v-else>
      <WalletChip
        :address="address"
        @click="openModal"
      />
      <WalletModal
        :open="isModalOpen"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed, ref } from 'vue';

import SButton from './SButton.vue';
import WalletChip from './WalletChip.vue';
import WalletModal from './WalletModal.vue';

import { EthereumService } from '@/services';
import { useWalletStore } from '@/stores';

const store = useWalletStore();
const address = computed(() => store.address);

async function connect() {
  const service = new EthereumService('metamask');
  const address = await service.connect();
  store.connect('metamask');
  if (address) {
    store.setAddress(address);
  }
  const balance = await service.getBalance();
  if (balance) {
    store.setBalance(balance);
  }
}

const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  margin: 0 16px;
}

.brand {
  font-size: 18px;
  font-weight: 700;
}
</style>
