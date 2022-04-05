<template>
  <div class="pair">
    <div class="input">
      <input
        :value="amountIn"
        type="text"
        @input="handleInputChange"
      />
      <div class="coin">ETH</div>
    </div>
    <div class="icon-wrapper">
      <IconArrowDown class="icon" />
    </div>
    <div class="output">
      <div class="amount-label">{{ formatAmount(quote?.amountOut) }}</div>
      <div
        class="coin"
        @click="openModal"
      >
        {{ assetOut }}
      </div>
      <AssetModal
        :open="isModalOpen"
        @close="closeModal"
        @select="handleModalSelect"
      />
    </div>
    <div class="button">
      <button @click="swap">swap</button>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { parseEther, formatEther } from '@ethersproject/units';
import { BigNumber } from 'ethers';
import { ref } from 'vue';

import AssetModal from './AssetModal.vue';
import IconArrowDown from './icons/IconArrowDown.vue';

import { EthereumService, ZeroExService, Quote } from '@/services';

defineProps({
  amountIn: {
    type: String,
    required: true,
  },
  assetOut: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['amount-in-change', 'asset-out-change']);

const ethereumService = new EthereumService('metamask');
const zeroExService = new ZeroExService();

const quote = ref<Quote | null>(null);

async function handleInputChange(e: any) {
  const value = e.target.value as string;
  emit('amount-in-change', value);
  if (!value) {
    quote.value = null;
    return;
  }
  const amountIn = parseEther(value);
  if (amountIn.isZero() || amountIn.isNegative()) {
    quote.value = null;
    return;
  }
  const assetOut = '0x8cA9a0fbd8DB501F013F2e9e33a1B9dC129A48E0';
  const swapQuote = await zeroExService.getQuote(amountIn, assetOut);
  quote.value = swapQuote;
}

function formatAmount(amountOut: BigNumber | undefined): string {
  if (!amountOut) {
    return '0';
  }
  return formatEther(amountOut);
}

const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function handleModalSelect(asset: string) {
  isModalOpen.value = false;
  emit('asset-out-change', asset);
}

async function swap() {
  if (!quote.value) {
    return;
  }
  await ethereumService.connect();
  const { to, data, value, gasLimit, gasPrice } = quote.value;
  await ethereumService.send(to, gasLimit, gasPrice, data, value);
}
</script>

<style>
.pair {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border: 1px solid black;
  border-radius: 8px;
}

.input,
.output {
  display: flex;
  align-items: center;
}

input {
  width: 160px;
  padding: 0;
  border: none;
  outline: none;
}

.coin {
  width: 80px;
  padding: 4px;
  overflow: hidden;
  border-radius: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.coin:hover {
  background: #eee;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
}

.icon {
  width: 16px;
  height: 16px;
}

.amount-label {
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.button {
  display: flex;
  justify-content: center;
}
</style>
