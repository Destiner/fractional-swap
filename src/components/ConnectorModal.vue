<template>
  <BaseModal
    :open="open"
    :title="'Wallet'"
    @close="close"
  >
    <div
      v-for="connector in connectors"
      :key="connector.id"
    >
      <div
        class="option"
        @click="select(connector.id)"
      >
        {{ connector.title }}
      </div>
    </div>
  </BaseModal>
</template>

<script
  setup
  lang="ts"
>
import BaseModal from './BaseModal.vue';

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close', 'select']);

const connectors: {
  id: string;
  title: string;
}[] = [
  {
    id: 'metamask',
    title: 'Metamask',
  },
  {
    id: 'tally',
    title: 'Tally',
  },
  {
    id: 'walletconnect',
    title: 'Wallet Connect',
  },
  {
    id: 'coinbasewallet',
    title: 'Coinbase Wallet',
  },
];

function close() {
  emit('close');
}

function select(id: string) {
  emit('select', id);
}
</script>

<style>
.option {
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
}

.option:hover {
  background: #eee;
}
</style>
