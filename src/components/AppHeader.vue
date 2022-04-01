<template>
  <div class="header">
    <div>fractional.swap</div>
    <div v-if="!isConnected">
      <button @click="connect">connect</button>
    </div>
    <div v-else>
      <button @click="disconnect">disconnect</button>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue';

import { EthereumService } from '../services';
import { useWalletStore } from '../stores';

const store = useWalletStore();

const isConnected = computed(() => store.isConnected);

async function connect() {
  const service = new EthereumService('metamask');
  await service.connect();
  const balance = await service.getBalance();
  store.connect('metamask');
  if (balance) {
    store.setBalance(balance);
  }
}

function disconnect() {
  store.disconnect();
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  margin: 0 16px;
}
</style>
