import * as React from "react";
import Layout from "@/components/Main/Layout";
import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const code = `function knapsack(items, capacity) {
  // Sort items by value/weight ratio
  items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
  
  let totalValue = 0;
  let totalWeight = 0;
  const selectedItems = [];
  
  for (const item of items) {
    if (totalWeight + item.weight <= capacity) {
      selectedItems.push(item);
      totalValue += item.value;
      totalWeight += item.weight;
    }
  }
  
  return {
    selectedItems,
    totalValue,
    totalWeight
  };
}`;

const KnapsackDescription = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="text-4xl font-semibold flex sm:flex-row flex-col gap-4 justify-between">
        <div>Study Schedule Optimizer</div>
        <Button
          onClick={() => navigate("/lab/knapsack/simulate")}
          className="text-xl !h-fit !px-6 py-2"
        >
          Try it out <ArrowRight />
        </Button>
      </div>
      <div className="my-6">
        <div className="text-2xl font-semibold underline">Introduction</div>
        <p className="text-xl">
          The Study Schedule Optimizer uses the Knapsack algorithm to help students maximize their study efficiency. 
          Given a limited amount of time (the knapsack capacity) and multiple topics with different importance levels 
          (values) and time requirements (weights), it creates an optimal study schedule that maximizes the total 
          importance of topics covered within the available time.
        </p>
      </div>
      <div className="my-6">
        <div className="text-2xl font-semibold underline">How It Works</div>
        <div className="space-y-4 text-xl">
          <p>1. Input Collection:</p>
          <ul className="list-disc pl-8">
            <li>Enter topic names</li>
            <li>Assign importance levels (1-10)</li>
            <li>Specify time required for each topic</li>
            <li>Set total available study time</li>
          </ul>
          <p>2. Ratio Calculation:</p>
          <ul className="list-disc pl-8">
            <li>Calculate importance-to-time ratio for each topic</li>
            <li>This helps identify which topics give the most value per time unit</li>
          </ul>
          <p>3. Sorting:</p>
          <ul className="list-disc pl-8">
            <li>Sort topics by their importance-to-time ratio</li>
            <li>Higher ratios indicate more efficient use of study time</li>
          </ul>
          <p>4. Schedule Generation:</p>
          <ul className="list-disc pl-8">
            <li>Select topics in order of their ratios</li>
            <li>Add topics until the time limit is reached</li>
            <li>Generate final optimized schedule</li>
          </ul>
        </div>
      </div>
      <div className="my-6">
        <div className="text-2xl font-semibold underline">Algorithm</div>
        <SyntaxHighlighter language="javascript" style={theme}>
          {code}
        </SyntaxHighlighter>
      </div>
      <div className="my-6">
        <div className="text-2xl font-semibold underline">Time Complexity</div>
        <div className="min-h-[200px] h-fit flex flex-col gap-2 w-full items-center justify-center">
          <p className="mb-4">
            The fractional knapsack algorithm using the greedy approach has the following time complexity:
          </p>
          <div className="text-2xl font-bold">Sorting items by ratio: O(n log n)</div>
          <div className="text-2xl font-bold">Processing items: O(n)</div>
          <div className="text-2xl font-bold">Overall: O(n log n)</div>
        </div>
      </div>
      <div className="my-6">
        <div className="text-2xl font-semibold underline">Real World Applications</div>
        <ul className="space-y-2 text-lg">
          <li>
            <strong>Study Planning:</strong> Creating efficient study schedules
          </li>
          <li>
            <strong>Project Management:</strong> Selecting tasks based on priority and time constraints
          </li>
          <li>
            <strong>Resource Allocation:</strong> Optimizing resource distribution in limited time
          </li>
          <li>
            <strong>Time Management:</strong> Making the most of limited time slots
          </li>
          <li>
            <strong>Course Selection:</strong> Choosing courses based on credit hours and importance
          </li>
          <li>
            <strong>Exam Preparation:</strong> Allocating review time for different subjects
          </li>
        </ul>
      </div>
      <div className="w-full flex justify-end">
        <Button
          onClick={() => navigate("/lab/knapsack/simulate")}
          className="text-xl w-full sm:w-fit !h-fit !px-6 !py-4"
        >
          Try it out <ArrowRight />
        </Button>
      </div>
    </Layout>
  );
};

export default KnapsackDescription;