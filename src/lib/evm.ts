import { ethers } from 'ethers';

export interface GeneratedWallet {
  publicKey: string;
  privateKey: string;
}

export function generateEvmWallet(): GeneratedWallet {
  const wallet = ethers.Wallet.createRandom();
  return {
    publicKey: wallet.address,
    privateKey: wallet.privateKey,
  };
}
