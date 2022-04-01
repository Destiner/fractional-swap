<template>
  <div />
</template>

<script
  setup
  lang="ts"
>
import { onMounted } from 'vue';

import { FractionalService } from '@/services';
import { useNiftyStore } from '@/stores';

const fractionalService = new FractionalService();

const niftyStore = useNiftyStore();

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
