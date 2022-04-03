import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { Vault } from '../services';

const useStore = defineStore('nifty', () => {
  const collectionVaults = ref<Record<string, Vault[]>>({});

  function addCollection(collection: string, vaults: Vault[]) {
    collectionVaults.value[collection] = vaults;
  }

  const collections = computed(() => Object.keys(collectionVaults.value));

  function getVaults(collection: string): Vault[] {
    return collectionVaults.value[collection];
  }

  return { addCollection, collections, getVaults };
});

export default useStore;
