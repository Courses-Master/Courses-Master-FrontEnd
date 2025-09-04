"use client"

import { encryptStorage } from "@/utils/storage";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function QrCode({ id }) {
  const storeAuth = encryptStorage.getItem('auth')
  const qrData = `http://192.168.1.6:3001/qr-scanned?email=${storeAuth?.data?.email}&eventId=${id}`;
  const [serverResponse, setServerResponse] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const fetchQr = async () => {
      try {
        const res = await fetch(`http://localhost:3001/qr-scanned`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storeAuth?.token}`,
          },
          body: JSON.stringify({
            eventId: id,
            email: storeAuth?.data?.email
          })
        });

        const data = await res.json();
        console.log("📥 Server Response:", data);
      } catch (err) {
        console.error("Error fetching Events:", err);
      }
    };

    fetchQr();
  }, [id]);


  useEffect(() => {
    const socket = new WebSocket("ws://192.168.1.6:3001");

    socket.onopen = () => {
      console.log("✅ Connected to server");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📥 QR Result:", data);
        setServerResponse(data);
      } catch (err) {
        console.log(err);

        console.error("Error parsing message:", err);
      }
    };

    socket.onclose = () => {
      console.log("🔌 Disconnected from server");
      setIsConnected(false);
    };

    return () => socket.close();
  }, [id]);
  console.log(serverResponse);

  return (
    <div className="flex flex-col min-w-[100px] mx-4 rounded-[15px] border border-[#ADADAD] p-8 items-center mt-2 gap-4">
      <div className="flex items-center gap-5">
        <QRCode className="w-[124px] h-[124px] basis-[70%]" value={storeAuth?.data?.role !== "admin" ? qrData : null} size={200} />
        <p>
          Scan QR code for easy payments
        </p>
      </div>
      {serverResponse && (
        <div className=" p-2  rounded text-center">
          {serverResponse.status === "success"
            ? "✅ Payment Successful"
            : "❌ Payment Failed: This code scanned before"}
        </div>
      )}
    </div>
  );
}
