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
        v-if="!assetOut"
        class="coin"
        @click="openModal"
      >
        Select
      </div>
      <div
        v-else
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
    <div class="label">
      <span v-if="share">
        You are buying {{ formatShare(share) }} of the NFT
      </span>
      <span v-else-if="share === 0">You are buying 0.0001% of the NFT</span>
      <span v-else>&nbsp;</span>
    </div>
    <div class="button">
      <SwapButton
        :disabled="!swapAllowed"
        @click="swap"
      />
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
import { useNiftyStore, useWalletStore } from '@/stores';

const props = defineProps({
  amountIn: {
    type: String,
    required: true,
  },
  assetOut: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['amount-in-change', 'asset-out-change']);

const niftyStore = useNiftyStore();
const walletStore = useWalletStore();

const address = computed(() => walletStore.address);

const ethereumService = new EthereumService('metamask');
const zeroExService = new ZeroExService();

const vault = computed(() => {
  const collections = niftyStore.collections;
  for (const collection of collections) {
    const collectionVaults = niftyStore.getVaults(collection);
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
  if (!assetOut) {
    return;
  }
  const swapQuote = await zeroExService.getQuote(amountIn, assetOut);
  quote.value = swapQuote;
}

function formatAmount(amountOut: BigNumber | undefined): string {
  if (!amountOut) {
    return '0';
  }
  return formatEther(amountOut);
}

const share = computed(() => {
  const amountOut = quote.value?.amountOut;
  const amountTotal = vault.value?.totalSupply;
  if (!amountOut || !amountTotal) {
    return null;
  }
  return amountOut.mul(1e6).div(amountTotal).toNumber() / 1e6;
});

function formatShare(share: number) {
  const valueFormat = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 4,
  });
  return valueFormat.format(share);
}

const swapAllowed = computed(() => {
  if (!address.value) {
    return false;
  }
  if (!props.assetOut) {
    return false;
  }
  if (!quote.value) {
    return false;
  }
  return true;
});

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
  -webkit-backdrop-filter: blur(4px);
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

.label {
  color: #666;
  font-size: 14px;
}

.button {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
</style>
