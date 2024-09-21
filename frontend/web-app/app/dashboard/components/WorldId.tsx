import type { ISuccessResult } from "@worldcoin/idkit";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { verify } from "./Verify";

export default function WorldIdPopup({ setVerify }) {
  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID;
  const action = "test1"; // process.env.NEXT_PUBLIC_WLD_ACTION;

  if (!app_id) {
    throw new Error("app_id is not set in environment variables!");
  }
  if (!action) {
    throw new Error("action is not set in environment variables!");
  }

  const onSuccess = () => {
    setVerify(true);
  };

  const handleProof = async (result: ISuccessResult) => {
    console.log("Proof received from IDKit, sending to backend:\n", JSON.stringify(result)); // Log the proof from IDKit to the console for visibility
    const data = await verify(result);
    if (data.success) {
      console.log("Successful response from backend:\n", JSON.stringify(data)); // Log the response from our backend for visibility
    } else {
      throw new Error(`Verification failed: ${data.detail}`);
    }
  };

  return (
    <IDKitWidget
      action={action}
      app_id={app_id}
      onSuccess={onSuccess}
      handleVerify={handleProof}
      verification_level={VerificationLevel.Device} // Change this to VerificationLevel.Device to accept Orb- and Device-verified users
    />
  );
}
