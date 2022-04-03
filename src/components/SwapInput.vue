<template>
  <div class="pair">
    <div class="input">
      <input
        :value="amountIn"
        type="text"
      />
      <div class="coin">ETH</div>
    </div>
    <div class="icon-wrapper">
      <IconArrowDown class="icon" />
    </div>
    <div class="output">
      <div class="amount-label">{{ amountOut }}</div>
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
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue';

import AssetModal from './AssetModal.vue';
import IconArrowDown from './icons/IconArrowDown.vue';

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

const amountOut = ref('0');

const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function handleModalSelect() {
  isModalOpen.value = false;
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
}

input {
  width: 160px;
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
  align-items: center;
  justify-content: center;
}

.icon {
  width: 16px;
  height: 16px;
}

.amount-label {
  width: 160px;
}
</style>
