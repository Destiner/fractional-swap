import { providers, BigNumber } from 'ethers';

import { Connector } from '@/stores/wallet';

const CHAIN_ID = 1;

class EthereumService {
  address: string | null;
  ens: string | null;
  connector: Connector;
  provider: providers.Web3Provider | null;

  constructor(connector: Connector) {
    this.address = null;
    this.ens = null;
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
    if (!this.address || !this.provider) {
      return null;
    }
    return await this.provider.getBalance(this.address);
  }

  async send(
    to: string,
    gasLimit: BigNumber,
    gasPrice: BigNumber,
    data: string,
    value: BigNumber,
  ): Promise<providers.TransactionReceipt | null> {
    if (!this.provider) {
      return null;
    }
    const tx = await this.provider.getSigner().sendTransaction({
      to,
      gasLimit,
      gasPrice,
      data,
      value,
    });
    return await tx.wait(1);
  }
}

function getProvider(): providers.Web3Provider | null {
  if (!window.ethereum) {
    return null;
  }
  return new providers.Web3Provider(window.ethereum, CHAIN_ID);
}

export default EthereumService;
