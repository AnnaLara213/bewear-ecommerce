"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const handDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const handIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Quantidade</h3>
      <div className="item-center flex w-[100px] justify-between rounded-lg border">
        <Button size="icon" variant="ghost" onClick={handDecrement}>
          <MinusIcon />
        </Button>
        <p>{quantity}</p>
        <Button size="icon" variant="ghost" onClick={handIncrement}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
