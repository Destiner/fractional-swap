import { BigNumber } from 'ethers';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

type Connector = 'metamask';

const useStore = defineStore('counter', () => {
  const connector = ref<Connector | null>(null);
  const balance = ref<BigNumber | null>(null);

  const isConnected = computed(() => connector.value !== null);

  function connect(newConnector: Connector) {
    connector.value = newConnector;
  }

  function setBalance(newBalance: BigNumber) {
    balance.value = newBalance;
  }

  function disconnect() {
    connector.value = null;
  }

  return { connector, balance, isConnected, connect, setBalance, disconnect };
});

export type { Connector };

export default useStore;
