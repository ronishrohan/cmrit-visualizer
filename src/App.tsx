import { Route, Routes } from "react-router-dom";

import CountingSortDescription from "./pages/counting-sort/CountingSortDescription";
import { CountingSort2 } from "./pages/counting-sort/CountingSort";

const MainPage = () => {
  return (
    <Routes>
      <Route path="lab">
        <Route path="counting-sort">
          <Route index element={<CountingSortDescription />} />
          <Route path="simulate" element={<CountingSort2 />}></Route>
        </Route>
      </Route>
      {/* <Route path="/counting-sort"></Route> */}
    </Routes>
  );
};

export default MainPage;
