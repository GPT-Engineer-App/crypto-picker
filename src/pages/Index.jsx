import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const [history, setHistory] = useState([]);
  const [direction, setDirection] = useState("");
  const [crypto, setCrypto] = useState("");

  const handleStart = async () => {
    const directions = ["多", "空"];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    setDirection(randomDirection);

    try {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      const symbols = data.map((item) => item.symbol.toUpperCase());
      const randomCrypto = symbols[Math.floor(Math.random() * symbols.length)];
      setCrypto(randomCrypto);

      const newSelection = { direction: randomDirection, crypto: randomCrypto };
      setHistory((prevHistory) => {
        const updatedHistory = [newSelection, ...prevHistory];
        return updatedHistory.slice(0, 10);
      });

      toast(`選擇的方向: ${randomDirection}, 虛擬貨幣: ${randomCrypto}`);
    } catch (error) {
      toast.error("獲取虛擬貨幣失敗");
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">隨機虛擬貨幣選擇器</h1>
      <Button onClick={handleStart}>開始</Button>
      {direction && <p className="mt-4">方向: {direction}</p>}
      {crypto && <p className="mt-2">虛擬貨幣: {crypto}</p>}
      <div className="mt-4">
        <h2 className="text-2xl mb-2">歷史紀錄</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {index + 1}. 方向: {item.direction}, 虛擬貨幣: {item.crypto}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;