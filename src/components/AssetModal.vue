<template>
  <BaseModal
    :open="open"
    :title="title"
    @close="close"
  >
    <div
      v-if="!activeCollection"
      class="body"
    >
      <div
        v-for="collection in collections"
        :key="collection"
        class="option"
        @click="selectCollection(collection)"
      >
        <img
          class="icon"
          :src="getCollectionIcon(collection)"
        />
        {{ getCollectionTitle(collection) }}
      </div>
    </div>
    <div
      v-else
      class="body"
    >
      <div
        v-for="vault in activeVaults"
        :key="vault.address"
        class="option"
        @click="select(vault)"
      >
        {{ vault.nft.id }}
      </div>
    </div>
  </BaseModal>
</template>

<script
  setup
  lang="ts"
>
import { computed, ref } from 'vue';

import BaseModal from './BaseModal.vue';

import { Vault } from '@/services';
import { useNiftyStore } from '@/stores';
import {
  getTitle as getCollectionTitle,
  getIcon as getCollectionIcon,
} from '@/utils/collections';

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close', 'select']);

const niftyStore = useNiftyStore();

const title = computed(() =>
  activeCollection.value ? 'Assets' : 'Collections',
);

const collections = computed(() => niftyStore.collections);

const activeCollection = ref<string | null>(null);

const activeVaults = computed(() => {
  if (!activeCollection.value) {
    return [];
  }
  return niftyStore.getVaults(activeCollection.value);
});

function selectCollection(newCollection: string) {
  activeCollection.value = newCollection;
}

function select(vault: Vault) {
  activeCollection.value = null;
  emit('select', vault.address);
}

function close() {
  activeCollection.value = null;
  emit('close');
}
</script>

<style scoped>
.body {
  height: 340px;
  padding: 4px;
  overflow-x: hidden;
  overflow-y: auto;
}

.option {
  display: flex;
  align-items: center;
  padding: 8px 4px;
  border-radius: 8px;
  cursor: pointer;
  gap: 8px;
}

.option:hover {
  background: #eee;
}

.icon {
  width: 24px;
  height: 24px;
  border-radius: 12px;
}
</style>
