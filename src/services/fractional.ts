const ENDPOINT = 'https://api-production.fractional.xyz';

interface VaultResponse {
  status: boolean;
  data: VaultItem[];
}

interface VaultItem {
  tokenAddress: string;
  nftCount: number;
  collectables: {
    tokenId: string;
    imageUrl: string;
    collection: {
      slug: string;
      name: string;
    };
  }[];
}

interface Vault {
  address: string;
  nft: {
    id: string;
    imageUrl: string;
    collection: {
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
      closed: true,
      orderBy: 'popular',
    };
    const url = new URL(`${ENDPOINT}/vaults`);
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url.toString());
    const data = (await response.json()) as VaultResponse;
    return data.data
      .filter((item) => item.nftCount === 1)
      .map((item) => {
        const { tokenAddress, collectables } = item;
        const { tokenId, imageUrl, collection } = collectables[0];
        return {
          address: tokenAddress,
          nft: {
            id: tokenId,
            imageUrl,
            collection: {
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
