import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("");
  const [crypto, setCrypto] = useState("");

  const handleStart = async () => {
    if (step === 0) {
      const directions = ["long", "short"];
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      setDirection(randomDirection);
      setStep(1);
      toast(`Selected direction: ${randomDirection}`);
    } else if (step === 1) {
      try {
        const response = await fetch("https://api.bingx.com/api/v1/market/symbols");
        const data = await response.json();
        const symbols = data.data.map((item) => item.symbol);
        const randomCrypto = symbols[Math.floor(Math.random() * symbols.length)];
        setCrypto(randomCrypto);
        toast(`Selected cryptocurrency: ${randomCrypto}`);
      } catch (error) {
        toast.error("Failed to fetch cryptocurrencies");
      }
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">Random Crypto Selector</h1>
      <Button onClick={handleStart}>Start</Button>
      {direction && <p className="mt-4">Direction: {direction}</p>}
      {crypto && <p className="mt-2">Cryptocurrency: {crypto}</p>}
    </div>
  );
};

export default Index;