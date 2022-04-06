import { BigNumber } from 'ethers';

const ENDPOINT = 'https://api-production.fractional.xyz';

interface VaultResponse {
  status: boolean;
  data: VaultItem[];
}

interface VaultItem {
  contractAddress: string;
  nftCount: number;
  supply: string;
  collectables: {
    tokenId: string;
    imageUrl: string;
    symbol: string;
    collection: {
      slug: string;
      name: string;
    };
  }[];
}

interface Vault {
  address: string;
  totalSupply: BigNumber;
  nft: {
    id: string;
    imageUrl: string;
    collection: {
      symbol: string;
      slug: string;
      name: string;
    };
  };
}

class FractionalService {
  async listVaults(collection: string): Promise<Vault[]> {
    const params: Record<string, any> = {
      perPage: 100,
      page: 1,
      collections: [collection],
      liveSale: true,
      orderBy: 'popular',
    };
    const url = new URL(`${ENDPOINT}/vaults`);
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url.toString());
    const data = (await response.json()) as VaultResponse;
    return data.data
      .filter((item) => item.nftCount === 1)
      .map((item) => {
        const { contractAddress, supply, collectables } = item;
        const { tokenId, imageUrl, symbol, collection } = collectables[0];
        return {
          address: contractAddress,
          totalSupply: BigNumber.from(supply),
          nft: {
            id: tokenId,
            imageUrl,
            collection: {
              symbol,
              slug: collection.slug,
              name: collection.name,
            },
          },
        };
      });
  }
}

export type { Vault };

export default FractionalService;
