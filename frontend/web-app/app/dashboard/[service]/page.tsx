"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bell, Check, Copy, MessageSquare, Search } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [isCopied, setIsCopied] = useState(false);
  const product = {
    name: "Customer Service",
    date: "Jul 12th 2024",
    description: "A comprehensive customer service solution for businesses of all sizes.",
    features: ["24/7 support", "Multi-channel communication", "AI-powered chatbot", "Customer feedback analysis"],
    iframeCode:
      '<iframe src="https://nori.com/embed/customer-service" width="100%" height="500" frameborder="0"></iframe>',
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(product.iframeCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  return (
    <main className="flex-1 p-8 overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Service Details</h1>
          <p className="text-gray-500">View and manage Service information</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input className="pl-8" placeholder="Search anything in Nori..." />
          </div>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button>
            Add new service <span className="ml-2">+</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <Card className="mb-8 col-span-6">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">{product.date}</p>
            <p className="mb-4">{product.description}</p>
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside mb-4">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="col-span-4 row-span-1">
          <CardHeader>
            <CardTitle>Iframe Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <code className="text-sm">{product.iframeCode}</code>
            </div>
            <Button onClick={copyToClipboard} className="w-full">
              {isCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copy Iframe Code
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
