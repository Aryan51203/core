import { PinataSDK } from "pinata-web3"

export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.NEXT_PUBLIC_PINATA_JWT}`,
  pinataGateway: `${import.meta.env.NEXT_PUBLIC_GATEWAY_URL}`
})
