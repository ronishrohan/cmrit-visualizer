import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@/components/Main/Layout";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const DURATION = 700;

interface Topic {
  name: string;
  importance: number;
  time: number;
  ratio?: number;
}

interface StepperProps {
  children: React.ReactNode;
  current: number;
}

const Knapsack = () => {
  const [current, setCurrent] = useState(0);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  
  const nameRef = useRef<HTMLInputElement>(null);
  const importanceRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const totalTimeRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (nameRef.current?.value && importanceRef.current?.value && timeRef.current?.value) {
      const newTopic: Topic = {
        name: nameRef.current.value,
        importance: Number(importanceRef.current.value),
        time: Number(timeRef.current.value)
      };
      setTopics(prev => [...prev, newTopic]);
      nameRef.current.value = "";
      importanceRef.current.value = "";
      timeRef.current.value = "";
    }
  };

  const calculateRatios = () => {
    const topicsWithRatios = topics.map(topic => ({
      ...topic,
      ratio: topic.importance / topic.time
    }));
    setTopics(topicsWithRatios);
    setCurrent(2);
  };

  const sortByRatio = () => {
    const sortedTopics = [...topics].sort((a, b) => (b.ratio || 0) - (a.ratio || 0));
    setTopics(sortedTopics);
    setCurrent(3);
  };

  const solveKnapsack = () => {
    let remainingTime = totalTime;
    const selected: Topic[] = [];
    
    for (const topic of topics) {
      if (remainingTime >= topic.time) {
        selected.push(topic);
        remainingTime -= topic.time;
      }
      if (remainingTime <= 0) break;
    }
    
    setSelectedTopics(selected);
    setCurrent(4);
  };

  const navigate = useNavigate();

  return (
    <Layout>
      <div className="text-2xl font-bold w-full text-center">Study Schedule Optimizer</div>
      <Stepper current={current}>
        <div className="flex gap-4 flex-col w-full justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input ref={nameRef} placeholder="Topic Name" type="text" />
            <Input ref={importanceRef} placeholder="Importance (1-10)" type="number" min="1" max="10" />
            <Input ref={timeRef} placeholder="Time needed (hours)" type="number" min="1" />
          </div>
          <Button onClick={handleAdd}>Add Topic</Button>
          
          {topics.length > 0 && (
            <div className="mt-4 w-full max-w-2xl">
              <h3 className="text-xl font-semibold mb-2">Added Topics:</h3>
              <div className="grid grid-cols-3 gap-2 font-semibold mb-2">
                <div>Topic</div>
                <div>Importance</div>
                <div>Time (hrs)</div>
              </div>
              {topics.map((topic, index) => (
                <div key={index} className="grid grid-cols-3 gap-2">
                  <div>{topic.name}</div>
                  <div>{topic.importance}</div>
                  <div>{topic.time}</div>
                </div>
              ))}
            </div>
          )}

          {topics.length > 0 && (
            <div className="mt-4 flex gap-4 items-center">
              <Input 
                ref={totalTimeRef} 
                placeholder="Total available time (hours)" 
                type="number" 
                min="1"
                onChange={(e) => setTotalTime(Number(e.target.value))}
              />
              <Button onClick={() => setCurrent(1)} disabled={!totalTime}>
                Start Optimization
              </Button>
            </div>
          )}
        </div>

        <div className="flex-col flex gap-4 items-center justify-center">
          <div className="text-xl font-bold mb-4">Step 1: Calculate Importance/Time Ratio</div>
          <div className="w-full max-w-2xl">
            <div className="grid grid-cols-3 gap-2 font-semibold mb-2">
              <div>Topic</div>
              <div>Importance</div>
              <div>Time (hrs)</div>
            </div>
            {topics.map((topic, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <div>{topic.name}</div>
                <div>{topic.importance}</div>
                <div>{topic.time}</div>
              </div>
            ))}
          </div>
          <Button onClick={calculateRatios}>Calculate Ratios</Button>
        </div>

        <div className="flex-col flex gap-4 items-center justify-center">
          <div className="text-xl font-bold mb-4">Step 2: Topics with Ratios</div>
          <div className="w-full max-w-2xl">
            <div className="grid grid-cols-4 gap-2 font-semibold mb-2">
              <div>Topic</div>
              <div>Importance</div>
              <div>Time (hrs)</div>
              <div>Ratio</div>
            </div>
            {topics.map((topic, index) => (
              <div key={index} className="grid grid-cols-4 gap-2">
                <div>{topic.name}</div>
                <div>{topic.importance}</div>
                <div>{topic.time}</div>
                <div>{topic.ratio?.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <Button onClick={sortByRatio}>Sort by Ratio</Button>
        </div>

        <div className="flex-col flex gap-4 items-center justify-center">
          <div className="text-xl font-bold mb-4">Step 3: Sorted by Importance/Time Ratio</div>
          <div className="w-full max-w-2xl">
            <div className="grid grid-cols-4 gap-2 font-semibold mb-2">
              <div>Topic</div>
              <div>Importance</div>
              <div>Time (hrs)</div>
              <div>Ratio</div>
            </div>
            {topics.map((topic, index) => (
              <div key={index} className="grid grid-cols-4 gap-2">
                <div>{topic.name}</div>
                <div>{topic.importance}</div>
                <div>{topic.time}</div>
                <div>{topic.ratio?.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <Button onClick={solveKnapsack}>Generate Schedule</Button>
        </div>

        <div className="flex-col flex gap-4 items-center justify-center">
          <div className="text-xl font-bold mb-4">Your Optimized Study Schedule</div>
          <div className="w-full max-w-2xl">
            <div className="grid grid-cols-4 gap-2 font-semibold mb-2">
              <div>Topic</div>
              <div>Importance</div>
              <div>Time (hrs)</div>
              <div>Ratio</div>
            </div>
            {selectedTopics.map((topic, index) => (
              <div key={index} className="grid grid-cols-4 gap-2">
                <div>{topic.name}</div>
                <div>{topic.importance}</div>
                <div>{topic.time}</div>
                <div>{topic.ratio?.toFixed(2)}</div>
              </div>
            ))}
            <div className="mt-4 font-semibold">
              Total Time: {selectedTopics.reduce((sum, topic) => sum + topic.time, 0)} hours
            </div>
            <div className="font-semibold">
              Total Importance: {selectedTopics.reduce((sum, topic) => sum + topic.importance, 0)} points
            </div>
          </div>
          <Button onClick={() => navigate("/lab/knapsack")} className="mt-4">
            Back to Description
          </Button>
        </div>
      </Stepper>
    </Layout>
  );
};

const Stepper: React.FC<StepperProps> = ({ children, current }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`slides-${current}`}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full min-h-[400px] flex flex-col gap-2 items-center justify-center"
      >
        {children[current]}
      </motion.div>
    </AnimatePresence>
  );
};

export default Knapsack;