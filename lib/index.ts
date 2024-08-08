import { ethers } from "ethers";
import PersonIdentify from "./PersonIdentify.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      "0xA627Bb57128bCdcADdf0E71F163DC8Cfb38E3732",
      PersonIdentify.abi,
      signer,
    );

    return contractReader;
  }
};
