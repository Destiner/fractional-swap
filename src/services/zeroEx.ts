import { BigNumber } from 'ethers';

const ENDPOINT = 'https://api.0x.org';

interface QuoteResponse {
  chainId: number;
  to: string;
  data: string;
  value: string;
  gas: string;
  estimatedGas: string;
  gasPrice: string;
  buyAmount: string;
  sellAmount: string;
}

interface Quote {
  amountOut: BigNumber;
  to: string;
  data: string;
  value: BigNumber;
  gasLimit: BigNumber;
  gasPrice: BigNumber;
}

class Service {
  async getQuote(amountIn: BigNumber, assetOut: string): Promise<Quote> {
    const params: Record<string, any> = {
      sellToken: 'ETH',
      buyToken: assetOut,
      sellAmount: amountIn.toString(),
    };
    const url = new URL(`${ENDPOINT}/swap/v1/quote`);
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url.toString());
    const quoteResponse = (await response.json()) as QuoteResponse;
    const { buyAmount, to, data, value, gas, gasPrice } = quoteResponse;
    const quote = {
      amountOut: BigNumber.from(buyAmount),
      to: to,
      data: data,
      value: BigNumber.from(value),
      gasLimit: BigNumber.from(gas),
      gasPrice: BigNumber.from(gasPrice),
    };
    return quote;
  }
}

export default Service;

export type { Quote };
