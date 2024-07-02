import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("");
  const [crypto, setCrypto] = useState("");

  const handleStart = async () => {
    if (step === 0) {
      const directions = ["多", "空"];
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      setDirection(randomDirection);
      setStep(1);
      toast(`選擇的方向: ${randomDirection}`);
    } else if (step === 1) {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1
          }
        });
        const data = await response.json();
        const symbols = data.map((item) => item.symbol.toUpperCase());
        const randomCrypto = symbols[Math.floor(Math.random() * symbols.length)];
        setCrypto(randomCrypto);
        toast(`選擇的虛擬貨幣: ${randomCrypto}`);
      } catch (error) {
        toast.error("獲取虛擬貨幣失敗");
      }
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">隨機虛擬貨幣選擇器</h1>
      <Button onClick={handleStart}>開始</Button>
      {direction && <p className="mt-4">方向: {direction}</p>}
      {crypto && <p className="mt-2">虛擬貨幣: {crypto}</p>}
    </div>
  );
};

export default Index;