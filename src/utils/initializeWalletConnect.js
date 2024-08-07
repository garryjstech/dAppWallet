import 'react-native-get-random-values';
import WalletConnect from "@walletconnect/client";
import * as SecureStore from 'expo-secure-store';
import { ethers } from 'ethers';

const initializeWalletConnect = async () => {
    let connector;
    const savedSession = await SecureStore.getItemAsync("walletconnect");

    if (savedSession) {
        const session = JSON.parse(savedSession);
        if (session) {
            connector = new WalletConnect({ session, storage: SecureStore });
        }
    } else {
        connector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            storage: SecureStore,
        });
    }

    if (connector && !connector.connected) {
        await connector.createSession();
    }

    if (connector) {
        connector.on("connect", (error, payload) => {
            if (error) {
                throw error;
            }
            const { accounts, chainId } = payload.params[0];
            SecureStore.setItemAsync("walletconnect", JSON.stringify(connector?.session));
        });

        connector.on("disconnect", (error, payload) => {
            if (error) {
                throw error;
            }
            SecureStore.deleteItemAsync("walletconnect");
        });
    }

    return connector;
};

const injectWeb3Provider = (connector) => {
    if (!connector) return '';

    const provider = new ethers.providers.Web3Provider(connector);
    const signer = provider.getSigner();
    return `
    window.ethereum = {
      isMetaMask: true,
      enable: async () => {
        return ['${signer.getAddress()}'];
      },
      request: async ({ method, params }) => {
        if (method === 'eth_requestAccounts') {
          return ['${signer.getAddress()}'];
        } else if (method === 'eth_chainId') {
          return '${connector.chainId}';
        } else if (method === 'eth_sendTransaction') {
          const tx = await signer.sendTransaction(params[0]);
          return tx.hash;
        }
      }
    };
  `;
};

export { initializeWalletConnect, injectWeb3Provider };