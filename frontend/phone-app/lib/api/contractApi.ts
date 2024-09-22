import { initWeb3Airdao, initWeb3Oasis } from "@/lib/contract/contract";
import AirDAO_ABI from "../../../contracts/airdao-abi.json";
import Oasis_ABI from "../../../contracts/oasis-abi.json";
import { AirDAOAddress, OasisAddress } from "@/lib/contract/contractAddress";

const AirDAO_instance = initWeb3Airdao();
const Oasis_instance = initWeb3Oasis();

const AirDAO_ContractInstance = new AirDAO_instance.eth.Contract(AirDAO_ABI, AirDAOAddress);
const Oasis_ContractInstance = new Oasis_instance.eth.Contract(Oasis_ABI, OasisAddress);

// export async function getAllReviews(walletAddress: string) {
//   try {
//     console.log("walletAddress", walletAddress);
//     console.log("contractInstance", contractInstance);

//     const result = contractInstance.methods.getAllReviews(walletAddress).call();
//     console.log("result", result);
//     return result;
//   } catch (error) {
//     console.error("Error fetching services:", error);
//   }
// }

export { AirDAO_ContractInstance, Oasis_ContractInstance };

export async function testContract1() {
  try {
    const result = await AirDAO_ContractInstance.methods.name().call();
    console.log("result1", result);
    return result;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
}
export async function testContract2() {
  try {
    const result = await Oasis_ContractInstance.methods.name().call();
    console.log("result2", result);
    return result;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
}
