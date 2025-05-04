import * as React from "react";
import { Route, Routes } from "react-router-dom";
import KnapsackDescription from "./pages/knapsack/KnapsackDescription";
import Knapsack from "./pages/knapsack/Knapsack";

const MainPage = () => {
  return (
    <Routes>
      <Route path="lab">
        <Route path="knapsack">
          <Route index element={<KnapsackDescription />} />
          <Route path="simulate" element={<Knapsack />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default MainPage;
