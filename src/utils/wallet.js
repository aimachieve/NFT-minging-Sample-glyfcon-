import { nodes } from "./getRpcUrl";

export const BASE_METIS_SCAN_URLS = {
  Mainnet: "https://andromeda-explorer.metis.io"
};

export const BASE_METIS_SCAN_URL = BASE_METIS_SCAN_URLS["Mainnet"];

export const registerToken = async (
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage
) => {
  const tokenAdded = await window.ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage
      }
    }
  });

  return tokenAdded;
};

export const setupNetwork = async (chainId = 1) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }]
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    // handle other "switch" errors
  }
};
