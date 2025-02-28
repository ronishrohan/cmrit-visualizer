import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";

const App = () => {
  const [numbers, setNumbers] = useState<number[] | null>(null);
  function handleGenerateRandom() {
    const randomNumbers = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 10 + 1)
    );
    console.log(randomNumbers);
    setNumbers(randomNumbers);
  }
  return (
    <div className="size-full flex items-center justify-center font-geist-mono flex-col gap-2">
      {numbers === null && (
        <>
          <Button onClick={handleGenerateRandom}>Generate random</Button>
        </>
      )}
      {numbers && (
        <>
          <div className="flex gap-1">
            {numbers.map((number, index) => {
              return (
                <Cell
                  key={index + "number-random"}
                  index={index}
                  number={number}
                ></Cell>
              );
            })}
          </div>
          <Button>Run counting sort</Button>
        </>
      )}
    </div>
  );
};

function Cell({ number, index }: { number: number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      className="size-9 flex items-center justify-center border-2 border-border rounded-md"
    >
      {number}
    </motion.div>
  );
}

export default App;
