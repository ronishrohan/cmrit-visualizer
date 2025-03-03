import { Route, Routes } from "react-router-dom";
import CountingSort from "./pages/counting-sort/CountingSort";
import CountingSortDescription from "./pages/counting-sort/CountingSortDescription";
const MainPage = () => {
  return (
    <Routes>
      <Route path="lab">
        <Route path="counting-sort">
          <Route index element={<CountingSortDescription />} />
          <Route path="simulate" element={<CountingSort />}></Route>
        </Route>
      </Route>
      {/* <Route path="/counting-sort"></Route> */}
    </Routes>
  );
};

export default MainPage;
