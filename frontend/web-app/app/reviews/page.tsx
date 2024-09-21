"use client";
import Navbar from "@/app/components/Navbar";
// import { useEffect } from "react";
import { getAllReviews } from "@/lib/api/contractApi";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { AlertTriangle, CheckCircle, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function DisplayReviews() {
  const { primaryWallet } = useDynamicContext();
  const walletAddress = primaryWallet?.address;

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchAllServices() {
      try {
        const result = await getAllReviews(walletAddress);
        console.log("RES", result);
        setReviews(result);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchAllServices();
  }, [walletAddress]);

  return (
    <div className="bg-[#e3e3d0] min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Reviews</h1>

        <main className="flex-1 py-12 px-8">
          <h1 className="text-3xl font-bold text-green-800 mb-8">Customer Reviews</h1>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  {review.isScam ? (
                    <div className="flex items-center text-red-500">
                      <AlertTriangle className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">Potential Scam</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600">{review.text}</p>
              </div>
            ))}
          </div>
        </main>
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">Reviews</div>
        </footer>
      </div>
    </div>
  );
}
