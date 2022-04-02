import { BigNumber } from 'ethers';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

type Connector = 'metamask';

const useStore = defineStore('counter', () => {
  const connector = ref<Connector | null>(null);
  const address = ref<string | null>(null);
  const balance = ref<BigNumber | null>(null);

  const isConnected = computed(() => connector.value !== null);

  function connect(newConnector: Connector) {
    connector.value = newConnector;
  }

  function setAddress(newAddress: string) {
    address.value = newAddress;
  }

  function setBalance(newBalance: BigNumber) {
    balance.value = newBalance;
  }

  function disconnect() {
    connector.value = null;
    address.value = null;
    balance.value = null;
  }

  return {
    connector,
    address,
    balance,
    isConnected,
    connect,
    setAddress,
    setBalance,
    disconnect,
  };
});

export type { Connector };

export default useStore;
