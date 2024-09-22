import { pinata } from "./pinataConfig";

async function uploadJsonToIPFS(object) {
  try {
    console.log(process.env.NEXT_PUBLIC_PINATA_JWT);
    const upload = await pinata.upload.json(object);
    console.log(upload);
    return upload.IpfsHash;
  } catch (error) {
    console.log(error);
  }
}

async function uploadImageToIPFS(file) {
  try {
    const upload = await pinata.upload.file(file);
    console.log(upload);
    return upload.IpfsHash;
  } catch (error) {
    console.log(error);
  }
}

async function retriveJsonFromIPFS(IpfsHash: string) {
  try {
    const ipfsUrl = await pinata.gateways.convert(IpfsHash);
    const response = await fetch(ipfsUrl);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function RetriveImageFromIPFS(IpfsHash: string) {
  const ipfsUrl = await pinata.gateways.convert(IpfsHash);
  return ipfsUrl;
}

export { uploadJsonToIPFS, uploadImageToIPFS, retriveJsonFromIPFS, RetriveImageFromIPFS };
