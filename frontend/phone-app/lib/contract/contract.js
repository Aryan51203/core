import Web3 from "web3";

export function initWeb3Airdao() {
  const web3 = new Web3(process.env.NEXT_PUBLIC_AIRDAO_RPC_URL);
  return web3;
}

export function initWeb3Oasis() {
  const web3 = new Web3(process.env.NEXT_PUBLIC_OASIS_RPC_URL);
  return web3;
}
