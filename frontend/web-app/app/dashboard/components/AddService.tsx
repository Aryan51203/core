"use client";
import React, { useState } from "react";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CategoryTags from "./CategoryTags";
import axios from "axios";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4OWZjYWFlYi0wMGM1LTQyOWMtYjYwMC04ZDU0YzIwM2ExYTgiLCJlbWFpbCI6ImRpdnlhbnNoamFpbi4yMjA2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjNTY0MDZiYzFjZDlkYmZlNTcxYSIsInNjb3BlZEtleVNlY3JldCI6IjQ3YmIxNTRkN2E3MjNkYWYzNTQ0NGNjZWE2ZTRmNjBlMDQ2Y2Y0MmI3MmE0MWYzN2M4Y2VhMDlmMWQzMzQ0M2QiLCJleHAiOjE3NTgwOTEyNDl9.2i2tP8DJf_tYHwsM5wyBy3L46yZAp9PTTEMFMh8ofDM";

interface ServiceData {
  name: string;
  phoneNumber: string;
  logo: File | null;
  categories: string[];
}

function AddService({ setDialogOpen, setServices }) {
  const { primaryWallet } = useDynamicContext();
  const walletAddress = primaryWallet?.address;

  const [serviceData, setServiceData] = useState<ServiceData>({
    name: "",
    phoneNumber: "",
    logo: null,
    categories: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setServiceData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCategoriesChange = (newCategories: string[]) => {
    setServiceData((prev) => ({ ...prev, categories: newCategories }));
  };

  async function pinImageToIPFS(input: File | Blob) {
    try {
      const data = new FormData();
      data.append("file", input);

      const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
        headers: { Authorization: `Bearer ${JWT}` },
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  // async function pinJsonToIPFS() {
  //   try {
  //     const jsonString = JSON.stringify(serviceData, null, 2); // Converts JSON object to string
  //     const file = new File([jsonString], "data.json", { type: "application/json" }); // Creates a File object
  //     const data = new FormData();
  //     data.append("file", file);

  //     const request = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${JWT}`,
  //       },
  //       body: data,
  //     });
  //     const response = await request.json();
  //     return response;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async function handleSubmit(e: React.FormEvent) {
    try {
      e.preventDefault();
      if (serviceData.logo) {
        const imageResponse = await pinImageToIPFS(serviceData.logo);
        serviceData.logo = imageResponse.IpfsHash;
      }

      const res = await axios.post(`/api/company/service?walletId=${walletAddress}`, serviceData);
      console.log(res);

      setServices((old) => [...old, { serviceName: serviceData.name, serviceLink: serviceData.phoneNumber }]);

      setDialogOpen(false);
    } catch (error) {
      console.error("Error creating service", error);
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add New Service</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <Label htmlFor="name">Service Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Service Name"
            value={serviceData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            value={serviceData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="logo">Service Logo</Label>
          <Input id="logo" name="logo" type="file" accept="image/*" onChange={handleInputChange} />
        </div>
        <div>
          <Label>Categories</Label>
          <CategoryTags initialTags={serviceData.categories} onTagsChange={handleCategoriesChange} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default AddService;
