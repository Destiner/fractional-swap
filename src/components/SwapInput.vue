<template>
  <div class="pair">
    <div class="input">
      <input
        :value="amountIn"
        type="text"
        @input="handleInputChange"
      />
      <div class="coin">
        <img
          class="coin-icon"
          src="/assets/eth.svg"
          alt="Ethereum logo"
        />
        ETH
      </div>
    </div>
    <div class="swap-direction-label">
      <IconArrowDown class="arrow-icon" />
    </div>
    <div class="output">
      <div class="amount-label">{{ formatAmount(quote?.amountOut) }}</div>
      <div
        class="coin"
        @click="openModal"
      >
        <img
          class="coin-icon"
          :src="vault?.nft.imageUrl"
          alt="NFT image"
        />
        {{ vault?.nft.collection.symbol }}
      </div>
      <AssetModal
        :open="isModalOpen"
        @close="closeModal"
        @select="handleModalSelect"
      />
    </div>
    <div class="button">
      <SwapButton @click="swap" />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { parseEther, formatEther } from '@ethersproject/units';
import { BigNumber } from 'ethers';
import { ref, computed } from 'vue';

import AssetModal from './AssetModal.vue';
import SwapButton from './SwapButton.vue';
import IconArrowDown from './icons/IconArrowDown.vue';

import { EthereumService, ZeroExService, Quote } from '@/services';
import { useNiftyStore } from '@/stores';

const props = defineProps({
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

const store = useNiftyStore();

const ethereumService = new EthereumService('metamask');
const zeroExService = new ZeroExService();

const vault = computed(() => {
  const collections = store.collections;
  for (const collection of collections) {
    const collectionVaults = store.getVaults(collection);
    for (const vault of collectionVaults) {
      if (vault.address === props.assetOut) {
        return vault;
      }
    }
  }
  return null;
});

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
  const assetOut = props.assetOut;
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
  quote.value = null;
  emit('amount-in-change', '0');
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
  gap: 16px;
  padding: 16px;
  border: 1px solid #ffffff2e;
  border-radius: 8px;
  background: #ffffff40;
  box-shadow: 0 8px 32px 0 #1f26872f;
  backdrop-filter: blur(4px);
  font-size: 16px;
}

.input,
.output {
  display: flex;
  align-items: center;
  gap: 8px;
}

input {
  width: 200px;
  padding: 0;
  border: none;
  outline: none;
  background: none;
  font-size: 20px;
  font-weight: 700;
}

.coin {
  display: flex;
  align-items: center;
  width: 110px;
  padding: 4px;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 4px;
  text-overflow: ellipsis;
  white-space: normal;
  gap: 8px;
}

.coin-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.output .coin:hover {
  border-color: #aaa;
  cursor: pointer;
}

.swap-direction-label {
  display: flex;
  justify-content: center;
}

.arrow-icon {
  width: 16px;
  height: 16px;
}

.amount-label {
  width: 200px;
  overflow: hidden;
  font-size: 20px;
  font-weight: 700;
  text-overflow: none;
  white-space: nowrap;
}

.button {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
</style>
