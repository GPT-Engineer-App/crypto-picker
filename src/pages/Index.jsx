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
      toast(`选择的方向: ${randomDirection}`);
    } else if (step === 1) {
      try {
        const response = await fetch("https://api.bingx.com/api/v1/market/symbols");
        const data = await response.json();
        const symbols = data.data.map((item) => item.symbol);
        const randomCrypto = symbols[Math.floor(Math.random() * symbols.length)];
        setCrypto(randomCrypto);
        toast(`选择的加密货币: ${randomCrypto}`);
      } catch (error) {
        toast.error("获取加密货币失败");
      }
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">随机加密货币选择器</h1>
      <Button onClick={handleStart}>开始</Button>
      {direction && <p className="mt-4">方向: {direction}</p>}
      {crypto && <p className="mt-2">加密货币: {crypto}</p>}
    </div>
  );
};

export default Index;