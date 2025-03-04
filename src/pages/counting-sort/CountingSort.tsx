import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Stepper from "@/components/Main/Stepper";
import Layout from "@/components/Main/Layout";
import { Input } from "@/components/ui/input";

const DURATION = 700;

const CountingSort2 = () => {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState([]);
  const inputRef = useRef(null);

  const handleAdd = () => {
    if (inputRef.current && inputRef.current.value) {
      const value = parseInt(inputRef.current.value, 10);
      if (!isNaN(value)) {
        setInput((prev) => [...prev, value]);
        inputRef.current.value = ""; // Clear the input after adding
      } else {
        alert("Please enter a valid number");
      }
    }
  };

  return (
    <Layout>
      <div className="text-2xl font-bold w-full text-center">Counting Sort</div>
      <Stepper current={current}>
        <div className="flex gap-2 flex-col w-full justify-center items-center">
          <div className="flex gap-2">
            {input.map((number, index) => (
              <Cell number={number} key={index} className="border p-2"></Cell>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.keyCode == 13) handleAdd();
              }}
              className="w-[90px]"
              placeholder="Value"
              type="number" // Use type="number" for numeric input
            />
            <Button onClick={handleAdd}>Add</Button>
          </div>
          <Button className="mt-6">Perform Counting Sort</Button>
        </div>
        <div>test2</div>
      </Stepper>
    </Layout>
  );
};

const CountingSort = () => {
  const [numbers, setNumbers] = useState<number[] | null>(null);
  const [running, setRunning] = useState<boolean>(false);
  const [largest, setLargest] = useState<number>();
  const [arrowCounter1, setArrowCounter1] = useState<number>(-1);
  const [counted, setCounted] = useState<boolean>(false);
  const [count, setCount] = useState<number[]>();
  const [result, setResult] = useState<number[]>([]);
  function handleGenerateRandom() {
    const randomNumbers = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 10 + 1),
    );
    console.log(randomNumbers);
    setNumbers(randomNumbers);
  }

  function handleStartRun() {
    const l = Math.max(...numbers);
    setLargest(l);
    setCount(Array(l).fill(0));
    // setResult(Array(numbers.length).fill(0));

    setRunning(true);
  }

  useEffect(() => {
    if (running && numbers) {
      numbers.forEach((num, index) => {
        setTimeout(() => {
          setCount((prevCount) => {
            const updatedCount = [...prevCount];
            updatedCount[num - 1] += 1; // Increment count for the number
            return updatedCount;
          });
          setArrowCounter1((prev) => prev + 1);
        }, index * DURATION); // Delay each update by 500ms
      });
      setTimeout(() => {
        setCounted(true);
      }, numbers.length * DURATION);
    }
  }, [running, numbers]);

  useEffect(() => {
    if (counted) {
      let counter2 = 0;
      let delayCounter = 0; // Separate counter for delay
      count.forEach((countValue, index) => {
        for (let i = 0; i < countValue; i++) {
          setTimeout(() => {
            setResult((prev) => [...prev, index]);
          }, DURATION * delayCounter); // Delay increases for each item
          delayCounter++;
        }
        counter2 += countValue; // Maintain counter2 as in original logic
      });
    }
  }, [counted]);
  return (
    <div className="size-full flex items-center justify-center font-geist-mono flex-col gap-2">
      <div className="text-2xl font-medium mb-4">COUNTING SORT</div>
      {numbers === null && (
        <>
          <Button onClick={handleGenerateRandom}>Generate random</Button>
        </>
      )}
      {numbers && (
        <>
          <motion.div
            initial={{ height: "0px" }}
            animate={{ height: "40px" }}
            className="flex gap-1  relative"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                x: `${arrowCounter1 * 40}px`,
                opacity: running && counted === false ? 1 : 0,
              }}
              className="absolute left-0 bottom-full size-9 flex items-center justify-center"
            >
              <ArrowDown size={18}></ArrowDown>
            </motion.div>
            {numbers.map((number, index) => {
              return (
                <Cell
                  key={index + "number-random"}
                  index={index}
                  number={number}
                ></Cell>
              );
            })}
          </motion.div>
          {running === false ? (
            <>
              <Button onClick={handleStartRun}>Run counting sort</Button>
            </>
          ) : (
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="flex gap-2 items-center">
                Largest element: <Cell number={largest}></Cell>
              </div>
              <div>Creating an array of {largest} elements</div>
              <div>
                Count number of occurences of each element according to index
              </div>
              <div className="flex gap-1 mt-4">
                {count.map((countValue, index) => {
                  return (
                    <div className="flex flex-col gap-1 items-center">
                      <AnimatePresence mode="wait">
                        <Cell
                          index={index}
                          key={"animate-cell-" + countValue}
                          number={countValue}
                          type="pop"
                        ></Cell>
                      </AnimatePresence>
                      <div className="text-sm">{index + 1}</div>
                    </div>
                  );
                })}
              </div>
              <div>Pop from the array until the counts are empty</div>
              <div>Final array:</div>
              <div className="flex gap-1 mt-6">
                {result.map((number, index) => {
                  return (
                    <AnimatePresence mode="wait">
                      <Cell type="pop" number={number + 1}></Cell>
                    </AnimatePresence>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

function Cell({
  number,
  index,
  type,
}: {
  number: number;
  index: number;
  type?: "pop";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      // transition={{ delay: index * 0.02 }}
      className={`size-9 flex items-center justify-center border-2 border-border   rounded-sm ${type === "pop" && number > 0 ? "bg-primary text-background" : ""}`}
    >
      {number}
    </motion.div>
  );
}

export { CountingSort, CountingSort2 };
