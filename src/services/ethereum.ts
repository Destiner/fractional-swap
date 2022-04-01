import { providers, BigNumber } from 'ethers';

import { Connector } from '@/stores/wallet';

const CHAIN_ID = 1;

class EthereumService {
  address: string | undefined;
  ens: string | undefined;
  connector: Connector;
  provider: providers.Provider;

  constructor(connector: Connector) {
    this.address = undefined;
    this.ens = undefined;
    this.connector = connector;
    this.provider = getProvider();
  }

  async connect(): Promise<string | null> {
    const ethereum = window.ethereum as providers.ExternalProvider;
    if (!ethereum.request) {
      return null;
    }
    const accounts: string[] = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const [address] = accounts;
    this.address = address;
    return address;
  }

  async getBalance(): Promise<BigNumber | null> {
    if (!this.address) {
      return null;
    }
    return await this.provider.getBalance(this.address);
  }
}

function getProvider() {
  return new providers.Web3Provider(window.ethereum, CHAIN_ID);
}

export default EthereumService;
