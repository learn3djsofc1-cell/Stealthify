import { Buffer } from 'buffer';
if (typeof window !== 'undefined' && !window.Buffer) {
  (window as any).Buffer = Buffer;
}

import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

export interface GeneratedWallet {
  publicKey: string;
  privateKey: string;
}

export function generateSolanaWallet(): GeneratedWallet {
  const keypair = Keypair.generate();
  return {
    publicKey: keypair.publicKey.toBase58(),
    privateKey: bs58.encode(keypair.secretKey),
  };
}
