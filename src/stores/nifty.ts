import { defineStore } from 'pinia';

import type { Vault } from '../services';

const useStore = defineStore('nifty', () => {
  const collectionVaults: Record<string, Vault[]> = {};

  function addCollection(collection: string, vaults: Vault[]) {
    collectionVaults[collection] = vaults;
  }

  function getVaults(collection: string) {
    return collectionVaults[collection];
  }

  return { addCollection, getVaults };
});

export default useStore;
