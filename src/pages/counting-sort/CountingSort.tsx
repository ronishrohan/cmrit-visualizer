import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Stepper from "@/components/Main/Stepper";
import Layout from "@/components/Main/Layout";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const DURATION = 700;

const CountingSort2 = () => {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState([]);
  const inputRef = useRef(null);
  const [stack, setStack] = useState([]);
  const [result, setResult] = useState([]);
  const [inputSelected, setInputSelected] = useState(null);
  const [stackSelected, setStackSelected] = useState(null);
  useEffect(() => {
    console.log(current);
    if (current == 1) {
      let largest = Math.max(...input);
      setStack(Array(largest).fill(0));
    } else if (current == 3) {
      input.forEach((num, index) => {
        setTimeout(() => {
          setInputSelected(index);
          setStack((prev) => {
            const updatedStack = [...prev];
            updatedStack[num - 1] += 1;
            return updatedStack;
          });
        }, index * DURATION);
      });
    } else if (current == 4) {
      let counter = 1;
      stack.forEach((num, index) => {
        for (let i = 0; i < num; i++) {
          setTimeout(() => {
            setStackSelected(index);
            setResult((prev) => [...prev, index + 1]);
          }, counter * DURATION);
          counter++;
        }
      });
    }
  }, [current]);

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

  const navigate = useNavigate();

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
          <Button onClick={() => setCurrent(1)} className="mt-6">
            Perform Counting Sort
          </Button>
        </div>
        <div className="flex-col flex gap-2 items-center justify-center">
          <div className="text-xl font-bold mb-4">
            1. Find the largest number in the array
          </div>
          <div className="flex gap-2">
            {input.map((number, index) => {
              return <Cell number={number} index={index}></Cell>;
            })}
          </div>

          <div>Largest number in array: {Math.max(...input)}</div>

          <Button className="mt-4" onClick={() => setCurrent(2)}>
            Next Step{" "}
          </Button>
        </div>
        <div className="flex-col flex gap-2 items-center justify-center">
          <div className="text-xl font-bold mb-4">
            2. Create an array of largest number + 1 elements
          </div>
          <div className="flex gap-2 flex-wrap">
            {stack.map((number, index) => {
              return (
                <div className="flex flex-col gap-1 items-center justify-center">
                  <div className="text-sm">{index + 1}</div>
                  <Cell number={number} index={index}></Cell>
                </div>
              );
            })}
          </div>
          <Button className="mt-4" onClick={() => setCurrent(3)}>
            Next Step{" "}
          </Button>
        </div>
        <div className="flex-col flex gap-2 items-center justify-center">
          <div className="text-xl font-bold mb-4">
            3. Count number of occurences based on the indices of the new array
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            {input.map((number, index) => {
              return (
                <Cell
                  type={index == inputSelected && "pop"}
                  number={number}
                  index={index}
                ></Cell>
              );
            })}
          </div>

          <div className="flex gap-2 flex-wrap">
            {stack.map((number, index) => {
              return (
                <div className="flex flex-col gap-1 items-center justify-center">
                  <div className="text-sm">{index + 1}</div>
                  <Cell type="pop" number={number} index={index}></Cell>
                </div>
              );
            })}
          </div>
          <Button className="mt-4" onClick={() => setCurrent(4)}>
            Next Step{" "}
          </Button>
        </div>
        <div className="flex-col flex gap-2 items-center justify-center">
          <div className="text-xl font-bold mb-4">
            4. Pop each index from the array until the counts are empty
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            {stack.map((number, index) => {
              return (
                <div className="flex flex-col gap-1 items-center justify-center">
                  <div className="text-sm">{index + 1}</div>
                  <Cell
                    type={index == stackSelected && "pop"}
                    number={number}
                    index={index}
                  ></Cell>
                </div>
              );
            })}
          </div>
          <div>Result Array: </div>

          <div className="flex gap-2 flex-wrap">
            {result.map((number, index) => {
              return <Cell number={number} index={index}></Cell>;
            })}
          </div>

          <Button className="mt-4" onClick={() => setCurrent(5)}>
            Show result{" "}
          </Button>
        </div>
        <div className="flex-col flex gap-2 items-center justify-center">
          <div className="text-xl font-bold mb-4">Result</div>
          {/* <div>Result Array: </div> */}

          <div className="flex gap-2 ">
            {result.map((number, index) => {
              return <Cell number={number} index={index}></Cell>;
            })}
          </div>

          <Button
            className="mt-4"
            onClick={() => navigate("/lab/counting-sort")}
          >
            Back to description
          </Button>
        </div>
      </Stepper>
    </Layout>
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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      // transition={{ delay: index * 0.02 }}
      className={`size-9 flex transition-colors items-center justify-center border-2 border-border   rounded-sm ${type === "pop" && number > 0 ? "bg-primary text-background" : ""}`}
    >
      {number}
    </motion.div>
  );
}

export { CountingSort2 };
