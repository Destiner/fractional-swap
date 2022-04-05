<template>
  <div class="page">
    <SwapInput
      :amount-in="amountIn"
      :asset-out="assetOut"
      @amount-in-change="handleAmountChange"
      @asset-out-change="handleAssetChange"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, onMounted } from 'vue';

import SwapInput from '@/components/SwapInput.vue';
import { FractionalService } from '@/services';
import { useNiftyStore } from '@/stores';

const fractionalService = new FractionalService();

const niftyStore = useNiftyStore();

const amountIn = ref('0');

function handleAmountChange(newAmount: string) {
  amountIn.value = newAmount;
}

const assetOut = ref('0x8cA9a0fbd8DB501F013F2e9e33a1B9dC129A48E0');

function handleAssetChange(newAsset: string) {
  assetOut.value = newAsset;
}

onMounted(async () => {
  const collections = [
    'cryptopunks',
    // 'meebits',
    // 'bored-ape-yacht-club',
    // 'cool-cats',
    // 'pudgy-penguins',
  ];
  for (const collection of collections) {
    const vaults = await fractionalService.listVaults(collection);
    niftyStore.addCollection(collection, vaults);
  }
});
</script>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
}
</style>
