"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, MessageSquare, Search } from "lucide-react";
import Link from "next/link";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useIDKit } from "@worldcoin/idkit";
import { useEffect, useState } from "react";
import AutocompleteField from "../components/AutocompleteField";
import AddService from "./components/AddService";
import WorldIdPopup from "./components/WorldId";

export default function Dashboard() {
  const [verify, setVerify] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [services, setServices] = useState([
    {
      serviceName: "AWS",
      serviceLink: "9311502794",
      serviceKeywords: [Array],
      _id: "66eef85c43d358bffb8fc0f9",
    },
    {
      serviceName: "Llama",
      serviceLink: "123456789",
      serviceKeywords: [Array],
      _id: "66ef1a640f5a8febb24eac35",
    },
    {
      serviceName: "Kapa",
      serviceLink: "4139244134",
      serviceKeywords: [Array],
      _id: "66ef1b440f5a8febb24eac3a",
    },
  ]);

  // useEffect(() => {
  //   async function callContract() {
  //     const result1 = await testContract1();
  //     const result2 = await testContract2();

  //     console.log("result1", result1);
  //     console.log("result2", result2);
  //   }

  //   callContract();
  // }, []);

  const { open, setOpen } = useIDKit();

  // useEffect(() => {
  //   async function getAllServices() {
  //     try {
  //       console.log(walletId);
  //       const result = await axios.get(`/api/company/service?walletId=${walletId}`);
  //       console.log(result.data);

  //       setServices(result.data);
  //       console.log("YOOOOO", result.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   getAllServices();
  // }, []);

  useEffect(() => {
    if (verify) {
      setDialogOpen(true);
    }
  }, [verify]);

  return (
    <>
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mt-2">Dashboard</h1>
            <p className="text-gray-500">An easy way to manage services securely.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <AutocompleteField />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>

            <Button onClick={() => setOpen(true)}>
              Add new customer service <span className="ml-2">+</span>
            </Button>
            {open ? <WorldIdPopup setVerify={setVerify} /> : null}

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent>
                <AddService setDialogOpen={setDialogOpen} setServices={setServices} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <Card className="col-span-6">
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <tbody>
                  {services?.map((item, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded mr-2"></div>
                          <div>
                            <p className="font-medium">{item.serviceName}</p>
                            <p className="text-xs text-gray-500">{item.serviceLink}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <Link href={"dashboard/123"}>
                          <Button variant="outline" size="sm" className="bg-[#0A3622] text-white">
                            view
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
